import { createRemoteConfig } from '@mfeflow/rsbuild';
import './env';

export default createRemoteConfig({
  name: 'checkout',
  port: 4313,
  exposes: { './App': './src/exposed/App.tsx' },
});
