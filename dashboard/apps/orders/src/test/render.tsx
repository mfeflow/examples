import type { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderWithPlatform } from '@mfeflow/testing';

/** Renders under a fresh query client, the way the shell provides one. Returns it so a test can read or seed the cache. */
export function renderInShell(
  ui: ReactElement,
  client = new QueryClient({ defaultOptions: { queries: { retry: false } } }),
) {
  renderWithPlatform(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
  return client;
}
