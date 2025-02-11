import type { SvgIconProps } from '@mui/material/SvgIcon';
import type { NavSectionProps } from 'src/components/nav-section';

import { SvgIcon } from '@mui/material';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

function HomeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
  country: icon('ic-parameter')
};

// ----------------------------------------------------------------------

export const navData: NavSectionProps['data'] = [
  /**
   * Overview
   */
  {
    items: [{ title: 'HOME', path: paths.home.root, icon: <HomeIcon /> }],
  },

  {
    items: [{ title: 'Fund Opportunities', path: paths.fund.root, icon: ICONS.banking }],
  },
  {
    items: [{ title: 'My Application', path: paths.applications.root, icon: ICONS.tour }],
  },
  {
    items: [{ title: 'My Tasks', path: paths.home.root, icon: ICONS.job }],
  },
  // {
  //   subheader: 'Fund Management',
  //   items: [
  //     {
  //       title: 'Pre Award ',
  //       path: paths.preaward.root,
  //       icon: ICONS.file,
  //       children: [
  //         { title: 'Fund Management', path: paths.preaward.funds.root },
  //         { title: 'Call For Proposals', path: paths.preaward.callForProposal.root },
  //         { title: 'Approvals', path: paths.preaward.callForProposal.approvals },
  //         { title: 'Co-creation', path: paths.preaward.callForProposal.coCreation },
  //       ],
  //     },
  //   ],
  // },

  /**
   * Management
   */
  // {
  //   subheader: 'Management',
  //   items: [
  //     {
  //       title: 'User Management',
  //       path: '/tem',
  //       icon: ICONS.user,
  //       children: [{ title: 'Four', path: '#' }],
  //     },
  //     {
  //       title: 'Sectors',
  //       path: paths.administrator.sectors.root,
  //       icon: ICONS.job,
  //     },
  //     {
  //       title: 'Currency',
  //       path: paths.administrator.currency.root,
  //       icon: ICONS.banking,
  //     },
  //     {
  //       title: 'Countries',
  //       path: paths.administrator.country.root,
  //       icon: ICONS.tour,
  //     },
  //   ],
  // },
];
