import { RemoteBoundary } from '@mfeflow/runtime';

export function RevenueRoute() {
  return <RemoteBoundary id="revenue/App" loading={<p>Loading revenue…</p>} />;
}
