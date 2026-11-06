/**
 * Every query key of this remote starts with its name, so it never meets another remote's key in the shared cache,
 * and `queryClient.invalidateQueries({ queryKey: queryKeys.all })` refreshes just this remote.
 */
// The shell owns this key. Orders and revenue both read it, so the page asks for the orders once.
// Keep the string the same in both remotes.
export const sharedKeys = {
  orders: ['shell', 'orders'] as const,
};

export const queryKeys = {
  all: ['orders'] as const,
  health: () => [...queryKeys.all, 'health'] as const,
};
