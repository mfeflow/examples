import { createRoot } from 'react-dom/client';
import {
  applyDevOverrides,
  loadRegistryIndex,
  registerRemotesFromIndex,
  registrySources,
  reportRemoteError,
} from '@mfeflow/runtime';
import { App } from './App';
import { loadRuntimeConfig } from './config/runtime';
import { initAnalyticsFromConfig } from './analytics/init';
import { applyStoredTheme } from './theme/apply-stored';
import { initShellI18n } from './i18n/init';

const DEV = process.env.NODE_ENV !== 'production';

export async function main(): Promise<void> {
  try {
    // Dev only: ?mfe-override=cart@http://localhost:4312/mf-manifest.json points a remote at your build.
    // runtime-config.json can set registryUrls (primary, then fallback) and registryOrigins for a CDN-hosted registry;
    // it never holds up boot for more than 1.5 s, and is not fetched at all when the index is inlined.
    const { urls, allowedOrigins: cdnOrigins } = await registrySources();
    const index = applyDevOverrides(await loadRegistryIndex(urls, { allowedOrigins: cdnOrigins }), {
      enabled: DEV,
    });
    // In dev the registry points at the remotes' dev servers; elsewhere remotes share the shell's origin.
    const devOrigins = DEV ? index.remotes.map((remote) => new URL(remote.entry).origin) : [];
    registerRemotesFromIndex(index, {
      allowedOrigins: [location.origin, ...cdnOrigins, ...devOrigins],
    });
  } catch (error) {
    reportRemoteError('shell', 'registry', error);
  }
  const el = document.getElementById('root');
  await loadRuntimeConfig();
  initAnalyticsFromConfig();
  applyStoredTheme();
  await initShellI18n();
  if (el) createRoot(el).render(<App />);
  // Development only, so production builds carry nothing for it.
  if (DEV) void import('./assert');
}
