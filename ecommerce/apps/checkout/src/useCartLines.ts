import { useState } from 'react';
import { useEvent } from '@mfeflow/event-bus/react';
import type { CartLine } from '@ecommerce/contracts/events';

// The shell keeps the cart and replays its latest lines to a remote that mounts after the adds.
export function useCartLines(): CartLine[] {
  const [lines, setLines] = useState<CartLine[]>([]);
  useEvent('cart.lines.v1', (payload) => {
    setLines(payload.lines);
  });
  return lines;
}
