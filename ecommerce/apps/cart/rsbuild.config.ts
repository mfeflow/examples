import { createRemoteConfig } from '@mfeflow/rsbuild';
import './env';

export default createRemoteConfig({
  name: 'cart',
  port: 4312,
  exposes: { './App': './src/exposed/App.tsx' },
});
