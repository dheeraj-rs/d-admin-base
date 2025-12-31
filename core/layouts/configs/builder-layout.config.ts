import { LayoutConfiguration } from '@/core/types/layout-types';
import { BuilderTopbar } from '@/core/layouts/bars/BuilderTopbar';
import { ComponentsLeftbar } from '@/core/layouts/bars/ComponentsLeftbar';
import { PropertiesRightbar } from '@/core/layouts/bars/PropertiesRightbar';
import { DevicePreviewBottombar } from '@/core/layouts/bars/DevicePreviewBottombar';

/**
 * Builder Layout Configuration
 * Website builder layout with custom topbar, components panel, properties, and device preview
 */
export const builderLayoutConfig: LayoutConfiguration = {
  id: 'builder',
  name: 'Website Builder',
  metadata: {
    title: 'Website Builder Layout',
    description:
      'Specialized layout for building websites with drag-and-drop components',
    icon: 'pi-globe',
    tags: ['builder', 'website', 'editor'],
  },
  bars: [
    {
      id: 'builder-topbar',
      slot: 'topbar',
      component: BuilderTopbar,
      props: {
        showBackButton: true,
        backPath: '/',
        title: 'Website Builder',
        onPreview: () => console.log('Preview clicked'),
        onSave: () => console.log('Save clicked'),
        onPublish: () => console.log('Publish clicked'),
      },
      priority: 100,
      enabled: true,
    },
    {
      id: 'components-leftbar',
      slot: 'leftbar',
      component: ComponentsLeftbar,
      props: {
        onComponentDrag: (componentId: string) =>
          console.log('Dragging:', componentId),
        onPageSelect: (pageId: string) => console.log('Page selected:', pageId),
      },
      priority: 100,
      enabled: true,
    },
    {
      id: 'properties-rightbar',
      slot: 'rightbar',
      component: PropertiesRightbar,
      props: {
        onPropertyChange: (propertyId: string, value: any) =>
          console.log('Property changed:', propertyId, value),
      },
      priority: 100,
      enabled: true,
    },
    {
      id: 'device-preview-bottombar',
      slot: 'bottombar',
      component: DevicePreviewBottombar,
      props: {
        onDeviceChange: (device: string) =>
          console.log('Device changed:', device),
        onUndo: () => console.log('Undo clicked'),
        onRedo: () => console.log('Redo clicked'),
      },
      priority: 100,
      enabled: true,
    },
  ],
};
