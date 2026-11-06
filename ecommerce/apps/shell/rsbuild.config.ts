import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, mergeRsbuildConfig } from '@rsbuild/core';
import { createShellConfig } from '@mfeflow/rsbuild';
import './env';
import './src/theme/head-script';

interface DevEntry {
  manifestUrl: string;
  version: string;
}

function readEntry(file: string): DevEntry {
  const value: unknown = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (typeof value !== 'object' || value === null || !('manifestUrl' in value)) {
    throw new Error(`${file} has no manifestUrl`);
  }
  const { manifestUrl } = value;
  if (typeof manifestUrl !== 'string') throw new Error(`${file}: manifestUrl must be text`);
  const version = 'version' in value && typeof value.version === 'string' ? value.version : 'dev';
  return { manifestUrl, version };
}

function readNames(dir: string): string[] {
  try {
    return fs.readdirSync(dir);
  } catch (error) {
    // A project with no remotes yet has nothing to list.
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') return [];
    throw error;
  }
}

// The shell finds its remotes through the registry. In dev that is registry/envs/dev, which
// points at each remote's dev server, inlined so the shell needs no registry server.
// `mfeflow dev` writes the merged registry (apps from mfeflow.json, --remote overrides) to
// MFEFLOW_DEV_REGISTRY and rewrites it when the project changes; plain `pnpm dev` reads the folder.
const registryDir = path.resolve(process.cwd(), '../../registry/envs/dev');
const generated = process.env.MFEFLOW_DEV_REGISTRY;

function readGenerated(file: string): unknown {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function devRegistry(): string {
  const remotes = generated
    ? readGenerated(generated)
    : {
        remotes: readNames(registryDir)
          .filter((file) => file.endsWith('.json'))
          .toSorted()
          .map((file) => {
            const { manifestUrl, version } = readEntry(path.join(registryDir, file));
            return { name: file.slice(0, -'.json'.length), entry: manifestUrl, version };
          }),
      };
  return `window.__MFE_REGISTRY__=${JSON.stringify(remotes).replaceAll('<', '\\u003c')}`;
}

// A host that serves the shell under a path (GitHub Pages: /examples) builds with MFE_BASE_PATH. The
// assets then load from that path, and the runtime config is inlined: the shell would otherwise ask
// the host root for /config/runtime-config.json, and the registry runtime has no setting for that.
const basePath = (process.env.MFE_BASE_PATH ?? '').replace(/\/$/, '');

function inlineRuntimeConfig(): string {
  const prod: unknown = JSON.parse(
    fs.readFileSync(path.resolve(process.cwd(), 'public/config/runtime-config.prod.json'), 'utf8'),
  );
  const config = {
    ...(typeof prod === 'object' ? prod : {}),
    apiUrl: `${basePath}/api`,
    basePath,
    registryUrls: [`${basePath}/envs/prod/index.json`],
  };
  return `window.__MFE_RUNTIME_CONFIG__=${JSON.stringify(config).replaceAll('<', '\\u003c')}`;
}

export default defineConfig(({ command }) =>
  mergeRsbuildConfig(
    // snapshot: registry entries carry a manifest URL until deploys also publish remoteEntry.
    createShellConfig({ name: 'shell', port: 4300, snapshot: true }),
    defineConfig({
      // A new or changed remote restarts the dev server, which reads the registry again.
      dev: { watchFiles: { paths: generated ?? registryDir, type: 'restart' } },
      ...(basePath === '' ? {} : { output: { assetPrefix: `${basePath}/` } }),
      html: {
        title: 'shell',
        tags:
          command === 'dev'
            ? [{ tag: 'script', children: devRegistry(), head: true, append: false }]
            : basePath === ''
              ? []
              : [{ tag: 'script', children: inlineRuntimeConfig(), head: true, append: false }],
      },
    }),
  ),
);
