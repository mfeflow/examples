import { formatPrice } from '@ecommerce/contracts/money';
import { Announce } from '../Announce';
import { MfeLink } from '../routes';
import { useCartLines } from '../useCartLines';

export default function App() {
  const lines = useCartLines();
  const total = lines.reduce((sum, line) => sum + line.priceCents * line.qty, 0);
  return (
    <Announce>
      <section data-testid="cart">
        <h2>cart</h2>
        {lines.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul>
              {lines.map((line) => (
                <li key={line.sku}>
                  {line.qty} x {line.name} ({formatPrice(line.priceCents * line.qty)})
                </li>
              ))}
            </ul>
            <p>Total {formatPrice(total)}</p>
            <MfeLink to="checkout.home">Go to checkout</MfeLink>
          </>
        )}
      </section>
    </Announce>
  );
}
