import type { SettingsState } from 'src/components/settings';
import type { Theme, CSSObject } from '@mui/material/styles';

import { varAlpha } from 'minimal-shared/utils';

import { bulletColor } from 'src/components/nav-section';

// ----------------------------------------------------------------------

export function dashboardLayoutVars(theme: Theme) {
  return {
    '--layout-transition-easing': 'linear',
    '--layout-transition-duration': '120ms',
    '--layout-nav-mini-width': '88px',
    '--layout-nav-vertical-width': '300px',
    '--layout-nav-horizontal-height': '64px',
    '--layout-dashboard-content-pt': theme.spacing(1),
    '--layout-dashboard-content-pb': theme.spacing(8),
    '--layout-dashboard-content-px': theme.spacing(2),
  };
}

// ----------------------------------------------------------------------

export function dashboardNavColorVars(
  theme: Theme,
  navColor: SettingsState['navColor'] = 'integrate',
  navLayout: SettingsState['navLayout'] = 'vertical'
): Record<'layout' | 'section', CSSObject | undefined> {
  const {
    vars: { palette },
  } = theme;

  switch (navColor) {
    case 'integrate':
      return {
        layout: {
          '--layout-nav-bg': '#011E62', //Header Color
          '--layout-nav-horizontal-bg': '#fff',
          '--layout-nav-border-color': varAlpha(palette.grey['500Channel'], 0.12),
          '--layout-nav-text-primary-color': '#fff',
          '--layout-nav-text-secondary-color': palette.text.secondary,
          '--layout-nav-text-disabled-color': palette.text.disabled,
          ...theme.applyStyles('dark', {
            '--layout-nav-border-color': varAlpha(palette.grey['500Channel'], 0.08),
            '--layout-nav-horizontal-bg':'#fff',
          }),
        },
        section: undefined,
      };
    case 'apparent':
      return {
        layout: {
          '--layout-nav-bg': '#011E62',//Header Color
          '--layout-nav-horizontal-bg':'#011E62',
          '--layout-nav-border-color': 'transparent',
          '--layout-nav-text-primary-color': '#fff',
          '--layout-nav-text-secondary-color': palette.grey[500],
          '--layout-nav-text-disabled-color': palette.grey[600],
          ...theme.applyStyles('dark', {
            '--layout-nav-bg': palette.grey[800],
            '--layout-nav-horizontal-bg': '#011E62',
          }),
        },
        section: {
          // caption
          '--nav-item-caption-color': '#fff',
          // subheader
          '--nav-subheader-color': '#fff',
          '--nav-subheader-hover-color': palette.common.white,
          // item
          '--nav-item-color': '#fff',
          '--nav-item-root-active-color': palette.primary.light,
          '--nav-item-root-open-color': palette.common.white,
          // bullet
          '--nav-bullet-light-color': bulletColor.dark,
          // sub
          ...(navLayout === 'vertical' && {
            '--nav-item-sub-active-color': palette.common.white,
            '--nav-item-sub-open-color': palette.common.white,
          }),
        },
      };
    default:
      throw new Error(`Invalid color: ${navColor}`);
  }
}
