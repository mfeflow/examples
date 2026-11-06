import { useTrackOnMount } from '@mfeflow/analytics/react';
import { useMfeTranslation } from '@mfeflow/i18n/react';
import { tracker } from '../analytics';
import { loadMessages } from '../i18n/load';
import { useOrders } from '../query/useOrders';
import { tokens } from '../theme/tokens';
import { formatPrice } from './format';
import { summarize } from './summarize';

export function RevenueWidget() {
  const { t } = useMfeTranslation('revenue', loadMessages);
  const { data, isPending, isError } = useOrders();
  useTrackOnMount(tracker, 'revenue_viewed');

  if (isPending) return <p>{t('loading')}</p>;
  if (isError) return <p role="alert">{t('error')}</p>;
  const summary = summarize(data);

  return (
    <section
      data-testid="revenue"
      style={{ background: tokens.surface, padding: '1rem', borderRadius: '0.5rem' }}
    >
      <h2>{t('title')}</h2>
      <dl>
        <dt>{t('collected')}</dt>
        <dd>{formatPrice(summary.collectedCents)}</dd>
        <dt>{t('average')}</dt>
        <dd>{formatPrice(summary.averageCents)}</dd>
        <dt>{t('refunded')}</dt>
        <dd>{formatPrice(summary.refundedCents)}</dd>
      </dl>
    </section>
  );
}
