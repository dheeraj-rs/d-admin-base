import { LayoutConfiguration } from '@/core/types/layout-types';
import { NavigationTopbar } from '@/core/layouts/bars/NavigationTopbar';
import { MenuLeftbar } from '@/core/layouts/bars/MenuLeftbar';
import { ConfigRightbar } from '@/core/layouts/bars/ConfigRightbar';

/**
 * Default Layout Configuration
 * Standard admin layout with navigation, menu, and config panel
 */
export const defaultLayoutConfig: LayoutConfiguration = {
  id: 'default',
  name: 'Default Layout',
  metadata: {
    title: 'Default Admin Layout',
    description:
      'Standard layout with navigation, menu sidebar, and configuration panel',
    icon: 'pi-home',
    tags: ['admin', 'default'],
  },
  bars: [
    {
      id: 'navigation-topbar',
      slot: 'topbar',
      component: NavigationTopbar,
      priority: 100,
      enabled: true,
    },
    {
      id: 'menu-leftbar',
      slot: 'leftbar',
      component: MenuLeftbar,
      priority: 100,
      enabled: true,
    },
    {
      id: 'config-rightbar',
      slot: 'rightbar',
      component: ConfigRightbar,
      priority: 100,
      enabled: true,
    },
  ],
};
