import { createRemoteConfig } from '@mfeflow/rsbuild';
import './env';

export default createRemoteConfig({
  name: 'catalog',
  port: 4311,
  exposes: { './App': './src/exposed/App.tsx' },
});
