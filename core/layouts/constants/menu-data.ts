export const MENU_ITEMS = [
  {
    label: 'Home',
    items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }],
  },
  {
    label: 'Builder',
    items: [
      {
        label: 'Website Builder AI',
        icon: 'pi pi-fw pi-envelope',
        to: '/website-builder-ai',
      },
      {
        label: 'Website Builder Snippet',
        icon: 'pi pi-fw pi-calendar',
        to: '/website-builder-snippet',
      },
    ],
  },
  {
    label: 'UI Components',
    items: [
      {
        label: 'Elements',
        icon: 'pi pi-fw pi-chart-bar',
        items: [
          {
            label: 'Buttons',
            to: '/owner-dashboard/uikit/button',
            items: [
              {
                label: 'Buttons2',
                icon: 'pi pi-fw pi-chart-bar',
                to: '/owner-dashboard/uikit/button',
              },
              {
                label: 'Forms2',
                icon: 'pi pi-fw pi-chart-bar',
                to: '/owner-dashboard/uikit/form',
              },
            ],
          },
          {
            label: 'Forms',
            icon: 'pi pi-fw pi-chart-bar',
            to: '/owner-dashboard/uikit/form',
          },
        ],
      },
    ],
  },
  {
    label: 'System',
    items: [
      {
        label: 'Settings',
        icon: 'pi pi-fw pi-cog',
        to: '/owner-dashboard/settings',
      },
      {
        label: 'Profile',
        icon: 'pi pi-fw pi-user',
        to: '/owner-dashboard/profile',
      },
    ],
  },
];
