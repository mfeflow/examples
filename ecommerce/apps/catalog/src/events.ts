import { publish, subscribe } from '@mfeflow/event-bus';
import type { Events } from '@ecommerce/contracts/events';

// The platform's event map is the contracts package's. This one declaration merges it in.
declare module '@mfeflow/event-bus' {
  // oxlint-disable-next-line typescript/no-empty-interface -- merges the contracts into the platform map
  interface EventMap extends Events {}
}

/** Tells the other remotes that catalog is on the page. */
export function announceReady(): void {
  publish('mfe.ready.v1', { mfe: 'catalog' });
}

/** Calls `handler` with the name of each other remote that announces itself. Returns the function that stops it. */
export function onOtherRemoteReady(handler: (mfe: string) => void): () => void {
  return subscribe('mfe.ready.v1', ({ mfe }) => {
    if (mfe !== 'catalog') handler(mfe);
  });
}

/** Tells the platform one more of this product went into the cart. */
export function addToCart(product: { sku: string; name: string; priceCents: number }): void {
  publish('cart.item-added.v1', {
    sku: product.sku,
    name: product.name,
    priceCents: product.priceCents,
  });
}
