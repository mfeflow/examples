import { ActivityWidget } from '../activity/ActivityWidget';
import { I18n } from '../i18n/I18n';
import { Query } from '../query/Query';

export default function App() {
  return (
    <Query>
      <I18n>
        <ActivityWidget />
      </I18n>
    </Query>
  );
}
