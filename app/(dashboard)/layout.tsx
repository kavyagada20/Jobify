import { PropsWithChildren } from 'react';

import LayoutShell from '@/components/LayoutShell';
import SiteFooter from '@/components/SiteFooter';

function DashboardLayout({ children }: PropsWithChildren) {
  return <LayoutShell footer={<SiteFooter />}>{children}</LayoutShell>;
}

export default DashboardLayout;
