export const MENU_ITEMS = [
  {
    label: 'Home',
    items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }],
  },
  {
    label: 'Apps',
    items: [
      {
        label: 'Mail',
        icon: 'pi pi-fw pi-envelope',
        to: '/owner-dashboard/mail',
      },
      {
        label: 'Calendar',
        icon: 'pi pi-fw pi-calendar',
        to: '/owner-dashboard/calendar',
      },
      {
        label: 'Files',
        icon: 'pi pi-fw pi-file',
        to: '/owner-dashboard/files',
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
              { label: 'Buttons2', to: '/owner-dashboard/uikit/button' },
              { label: 'Forms2', to: '/owner-dashboard/uikit/form' },
            ],
          },
          { label: 'Forms', to: '/owner-dashboard/uikit/form' },
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
