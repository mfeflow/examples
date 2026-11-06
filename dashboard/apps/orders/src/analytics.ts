import { createTracker } from '@mfeflow/analytics';

// Every event this remote sends, with its parameters. The map is merged into the platform's, so
// tracker.track('orders_viewed') is checked here and nowhere else.
declare module '@mfeflow/analytics' {
  interface AnalyticsEvents {
    orders_viewed: undefined;
    orders_filtered: { status: string };
  }
}

export const events = ['orders_viewed', 'orders_filtered'] as const;

export const tracker = createTracker('orders', { events });
