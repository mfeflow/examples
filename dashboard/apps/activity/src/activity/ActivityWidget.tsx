import { useTrackOnMount } from '@mfeflow/analytics/react';
import { useMfeTranslation } from '@mfeflow/i18n/react';
import { tracker } from '../analytics';
import { loadMessages } from '../i18n/load';
import { useActivity } from '../query/useActivity';
import { tokens } from '../theme/tokens';

export function ActivityWidget() {
  const { t } = useMfeTranslation('activity', loadMessages);
  const { data, isPending, isError } = useActivity();
  useTrackOnMount(tracker, 'activity_viewed');

  if (isPending) return <p>{t('loading')}</p>;
  if (isError) return <p role="alert">{t('error')}</p>;

  return (
    <section
      data-testid="activity"
      style={{ background: tokens.surface, padding: '1rem', borderRadius: '0.5rem' }}
    >
      <h2>{t('title')}</h2>
      {data.length === 0 ? (
        <p>{t('empty')}</p>
      ) : (
        <ul>
          {data.map((event) => (
            <li key={event.id}>
              <time dateTime={event.at}>{event.at.slice(11, 16)}</time> {event.text}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
