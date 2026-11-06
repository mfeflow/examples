import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';
import { queryKeys } from './keys';

export function useActivity() {
  return useQuery({
    queryKey: queryKeys.feed(),
    queryFn: ({ signal }) => api.get('activity', { signal }).then((body) => body.events),
  });
}
