import { z } from 'zod';

// The shape of public/config/runtime-config.<env>.json. The browser only imports this file's type
// (see ./runtime), so the validator stays out of the bundle; `pnpm check:runtime-config` validates the files.
// Add a key: pnpm mfeflow add env-key GTM_ID --scope runtime --schema "z.string().min(1)"
export const runtimeConfigSchema = z.object({
  environment: z.enum(['dev', 'staging', 'prod']),
  gtmId: z.string().regex(/^(GTM-[A-Z0-9]{4,12})?$/),
  apiUrl: z.string().min(1),
});
