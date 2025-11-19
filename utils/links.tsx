import { AreaChart, Layers, Search, Shield } from 'lucide-react';

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const links: NavLink[] = [
  {
    href: '/add-job',
    label: 'add job',
    icon: <Layers />,
  },
  {
    href: '/jobs',
    label: 'find jobs',
    icon: <Search />,
  },
  {
    href: '/stats',
    label: 'stats',
    icon: <AreaChart />,
  },
  {
    href: '/admin',
    label: 'admin',
    icon: <Shield />,
  },
];

export default links;
