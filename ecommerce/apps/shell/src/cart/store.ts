import { publish, subscribe } from '@mfeflow/event-bus';
import type { CartLine } from '@ecommerce/contracts/events';
import { addItem } from './lines';

/**
 * The shell is always on the page, so it keeps the cart. It listens for what the catalog and the
 * checkout say and publishes the whole cart as cart.lines.v1, which is replayed to whoever mounts
 * later. Returns the function that stops it.
 */
export function startCartStore(): () => void {
  let lines: CartLine[] = [];
  const set = (next: CartLine[]) => {
    lines = next;
    publish('cart.lines.v1', { lines });
  };
  const stopAdded = subscribe('cart.item-added.v1', (item) => {
    set(addItem(lines, item));
  });
  const stopOrder = subscribe('order.placed.v1', () => {
    set([]);
  });
  set([]);
  return () => {
    stopAdded();
    stopOrder();
  };
}
