import { RemoteBoundary } from '@mfeflow/runtime';

export function CatalogRoute() {
  return <RemoteBoundary id="catalog/App" loading={<p>Loading catalog…</p>} />;
}
