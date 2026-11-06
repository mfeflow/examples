/**
 * Every query key of this remote starts with its name, so it never meets another remote's key in the shared cache,
 * and `queryClient.invalidateQueries({ queryKey: queryKeys.all })` refreshes just this remote.
 */
export const queryKeys = {
  all: ['activity'] as const,
  feed: () => [...queryKeys.all, 'feed'] as const,
  health: () => [...queryKeys.all, 'health'] as const,
};
