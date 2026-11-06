import { useState } from 'react';
import { useTrackOnMount } from '@mfeflow/analytics/react';
import { useMfeTranslation } from '@mfeflow/i18n/react';
import { formatPrice } from './format';
import { loadMessages } from '../i18n/load';
import { tracker } from '../analytics';
import { useOrders } from '../query/useOrders';
import { tokens } from '../theme/tokens';

const statuses = ['all', 'paid', 'pending', 'refunded'] as const;
type Filter = (typeof statuses)[number];

export function OrdersWidget() {
  const { t } = useMfeTranslation('orders', loadMessages);
  const { data, isPending, isError } = useOrders();
  const [filter, setFilter] = useState<Filter>('all');
  useTrackOnMount(tracker, 'orders_viewed');

  if (isPending) return <p>{t('loading')}</p>;
  if (isError) return <p role="alert">{t('error')}</p>;
  const rows = filter === 'all' ? data : data.filter((order) => order.status === filter);

  return (
    <section
      data-testid="orders"
      style={{ background: tokens.surface, padding: '1rem', borderRadius: '0.5rem' }}
    >
      <h2>{t('title')}</h2>
      <label>
        {t('filter')}{' '}
        <select
          value={filter}
          onChange={(event) => {
            const next = statuses.find((status) => status === event.target.value) ?? 'all';
            setFilter(next);
            tracker.track('orders_filtered', { status: next });
          }}
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {t(status)}
            </option>
          ))}
        </select>
      </label>
      {rows.length === 0 ? (
        <p>{t('empty')}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>{t('customer')}</th>
              <th>{t('total')}</th>
              <th>{t('status')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{formatPrice(order.totalCents)}</td>
                <td>{t(order.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
