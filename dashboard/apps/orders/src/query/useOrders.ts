import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';
import { sharedKeys } from './keys';

export function useOrders() {
  return useQuery({
    queryKey: sharedKeys.orders,
    queryFn: ({ signal }) => api.get('orders', { signal }).then((body) => body.orders),
  });
}
