import { useState } from 'react';
import { withBase } from '@ecommerce/contracts/base';
import { useEvent } from '@mfeflow/event-bus/react';
import { countItems } from './lines';

/** The cart count in the header. It follows cart.lines.v1, so it moves when the catalog adds an item. */
export function CartBadge() {
  const [count, setCount] = useState(0);
  useEvent('cart.lines.v1', ({ lines }) => {
    setCount(countItems(lines));
  });
  return (
    <a
      href={withBase('/cart')}
      aria-label={`Cart, ${count} item(s)`}
      onClick={(event) => {
        // A page load would empty the cart, which lives in memory; move without one, as the nav links do.
        event.preventDefault();
        history.pushState(null, '', event.currentTarget.href);
        dispatchEvent(new PopStateEvent('popstate'));
      }}
    >
      Cart ({count})
    </a>
  );
}
