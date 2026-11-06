import { Announce } from '../Announce';
import { ProductList } from '../products/ProductList';
import { MfeLink } from '../routes';

export default function App() {
  return (
    <Announce>
      <section data-testid="catalog">
        <h2>catalog</h2>
        <ProductList />
        <p>
          <MfeLink to="cart.home">Go to the cart</MfeLink>
        </p>
      </section>
    </Announce>
  );
}
