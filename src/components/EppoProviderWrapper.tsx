import { EppoRandomizationProvider } from './EppoRandomizationProvider';
import { getPrecomputedConfiguration } from '@/lib/getPrecomputedConfiguration';

export const EppoProviderWrapper = async ({ children }: React.PropsWithChildren) => {
  const config = await getPrecomputedConfiguration();
  console.log('config', config);

  return <EppoRandomizationProvider precomputedConfiguration={config}>{children}</EppoRandomizationProvider>;
}; 