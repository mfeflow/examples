import { RemoteBoundary } from '@mfeflow/runtime';

export function CartRoute() {
  return <RemoteBoundary id="cart/App" loading={<p>Loading cart…</p>} />;
}
