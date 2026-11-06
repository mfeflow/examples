import { RemoteBoundary } from '@mfeflow/runtime';

export function CheckoutRoute() {
  return <RemoteBoundary id="checkout/App" loading={<p>Loading checkout…</p>} />;
}
