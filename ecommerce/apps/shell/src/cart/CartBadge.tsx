import { useState } from 'react';
import { useEvent } from '@mfeflow/event-bus/react';
import { countItems } from './lines';

/** The cart count in the header. It follows cart.lines.v1, so it moves when the catalog adds an item. */
export function CartBadge() {
  const [count, setCount] = useState(0);
  useEvent('cart.lines.v1', ({ lines }) => {
    setCount(countItems(lines));
  });
  return (
    <a href="/cart" aria-label={`Cart, ${count} item(s)`}>
      Cart ({count})
    </a>
  );
}
