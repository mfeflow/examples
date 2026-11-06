import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, mergeRsbuildConfig } from '@rsbuild/core';
import { createShellConfig } from '@mfeflow/rsbuild';

interface DevRemote {
  name: string;
  entry: string;
  version: string;
}

function readDevRemotes(file: string): DevRemote[] {
  let value: unknown;
  try {
    value = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    // A shell with no dev config yet has no remotes to list.
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') return [];
    throw error;
  }
  const remotes =
    typeof value === 'object' && value !== null && 'devRemotes' in value ? value.devRemotes : {};
  if (typeof remotes !== 'object' || remotes === null) {
    throw new Error(`${file}: devRemotes must be an object of name: manifest URL`);
  }
  return Object.entries(remotes)
    .toSorted(([a], [b]) => (a < b ? -1 : 1))
    .map(([name, entry]) => {
      if (typeof entry !== 'string') throw new Error(`${file}: devRemotes.${name} must be a URL`);
      return { name, entry, version: 'dev' };
    });
}

// The shell finds its remotes through the registry. The remotes live in other repos, so in dev
// their manifest URLs come from "devRemotes" in public/config/runtime-config.dev.json, inlined so
// the shell needs no registry server. `mfeflow dev` writes the merged registry (that file, plus
// --remote overrides) to MFEFLOW_DEV_REGISTRY; plain `pnpm dev` reads the file.
const devConfig = path.resolve(process.cwd(), 'public/config/runtime-config.dev.json');
const generated = process.env.MFEFLOW_DEV_REGISTRY;

function readGenerated(file: string): unknown {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function devRegistry(): string {
  const remotes = generated
    ? readGenerated(generated)
    : {
        remotes: readDevRemotes(devConfig),
      };
  return `window.__MFE_REGISTRY__=${JSON.stringify(remotes).replaceAll('<', '\\u003c')}`;
}

export default defineConfig(({ command }) =>
  mergeRsbuildConfig(
    // snapshot: registry entries carry a manifest URL until deploys also publish remoteEntry.
    createShellConfig({ name: 'shell', port: 4300, snapshot: true }),
    defineConfig({
      // A new or changed remote restarts the dev server, which reads the registry again.
      dev: { watchFiles: { paths: generated ?? devConfig, type: 'restart' } },
      html: {
        title: 'shell',
        tags:
          command === 'dev'
            ? [{ tag: 'script', children: devRegistry(), head: true, append: false }]
            : [],
      },
    }),
  ),
);
