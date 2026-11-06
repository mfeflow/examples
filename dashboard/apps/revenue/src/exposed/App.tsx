import { I18n } from '../i18n/I18n';
import { Query } from '../query/Query';
import { RevenueWidget } from '../revenue/RevenueWidget';

export default function App() {
  return (
    <Query>
      <I18n>
        <RevenueWidget />
      </I18n>
    </Query>
  );
}
