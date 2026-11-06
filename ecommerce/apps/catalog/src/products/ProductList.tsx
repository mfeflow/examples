import { formatPrice } from '@ecommerce/contracts/money';
import { addToCart } from '../events';
import { tokens } from '../theme/tokens';
import { useProducts } from './useProducts';

export function ProductList() {
  const state = useProducts();
  if (state.status === 'loading') return <p>Loading products…</p>;
  if (state.status === 'error') return <p role="alert">Could not load products.</p>;
  return (
    <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.5rem' }}>
      {state.products.map((product) => (
        <li
          key={product.sku}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.5rem 0.75rem',
            borderRadius: '0.5rem',
            background: tokens.surface,
          }}
        >
          <span>
            {product.name} <small>{formatPrice(product.priceCents)}</small>
          </span>
          <button
            type="button"
            aria-label={`Add ${product.name} to cart`}
            onClick={() => {
              addToCart(product);
            }}
          >
            Add to cart
          </button>
        </li>
      ))}
    </ul>
  );
}
