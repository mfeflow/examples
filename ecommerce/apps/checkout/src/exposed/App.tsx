import { useState } from 'react';
import { publish } from '@mfeflow/event-bus';
import { formatPrice } from '@ecommerce/contracts/money';
import { Announce } from '../Announce';
import { MfeLink } from '../routes';
import { useCartLines } from '../useCartLines';

export default function App() {
  const lines = useCartLines();
  const [paid, setPaid] = useState<number | null>(null);
  const total = lines.reduce((sum, line) => sum + line.priceCents * line.qty, 0);

  function placeOrder() {
    publish('order.placed.v1', { totalCents: total });
    setPaid(total);
  }

  return (
    <Announce>
      <section data-testid="checkout">
        <h2>checkout</h2>
        {paid !== null ? (
          <output>Order placed. You paid {formatPrice(paid)}.</output>
        ) : lines.length === 0 ? (
          <p>
            Nothing to pay for. <MfeLink to="cart.home">Back to the cart</MfeLink>
          </p>
        ) : (
          <>
            <p>
              {lines.length} item(s), total {formatPrice(total)}
            </p>
            <button type="button" onClick={placeOrder}>
              Place order
            </button>
          </>
        )}
      </section>
    </Announce>
  );
}
