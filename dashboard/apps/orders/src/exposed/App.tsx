import { I18n } from '../i18n/I18n';
import { OrdersWidget } from '../orders/OrdersWidget';
import { Query } from '../query/Query';

export default function App() {
  return (
    <Query>
      <I18n>
        <OrdersWidget />
      </I18n>
    </Query>
  );
}
