import { createTracker } from '@mfeflow/analytics';

// Every event this remote sends, with its parameters. The map is merged into the platform's, so
// tracker.track('revenue_viewed') is checked here and nowhere else.
declare module '@mfeflow/analytics' {
  interface AnalyticsEvents {
    revenue_viewed: undefined;
  }
}

export const events = ['revenue_viewed'] as const;

export const tracker = createTracker('revenue', { events });
