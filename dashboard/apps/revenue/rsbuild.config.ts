import { createRemoteConfig } from '@mfeflow/rsbuild';
import './env';

export default createRemoteConfig({
  name: 'revenue',
  port: 4312,
  exposes: { './App': './src/exposed/App.tsx' },
});
