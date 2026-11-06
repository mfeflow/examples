import { useEffect, useState } from 'react';
import { api, type Product } from '../api/client';

export type ProductsState =
  { status: 'loading' } | { status: 'error' } | { status: 'ready'; products: Product[] };

export function useProducts(): ProductsState {
  const [state, setState] = useState<ProductsState>({ status: 'loading' });
  useEffect(() => {
    const controller = new AbortController();
    api
      .get('products', { signal: controller.signal })
      .then(({ products }) => {
        setState({ status: 'ready', products });
      })
      .catch(() => {
        if (!controller.signal.aborted) setState({ status: 'error' });
      });
    return () => {
      controller.abort();
    };
  }, []);
  return state;
}
