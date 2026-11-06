import { RemoteBoundary } from '@mfeflow/runtime';

export function OrdersRoute() {
  return <RemoteBoundary id="orders/App" loading={<p>Loading orders…</p>} />;
}
