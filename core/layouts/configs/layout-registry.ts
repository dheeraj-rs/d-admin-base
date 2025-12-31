import { LayoutRegistry } from '@/core/types/layout-types';
import { defaultLayoutConfig } from './default-layout.config';
import { builderLayoutConfig } from './builder-layout.config';

/**
 * Central Layout Registry
 * Maps layout IDs to their configurations
 *
 * To add a new layout:
 * 1. Create a new config file (e.g., dashboard-layout.config.ts)
 * 2. Import it here
 * 3. Add it to the registry
 *
 * @example
 * ```typescript
 * import { dashboardLayoutConfig } from './dashboard-layout.config';
 *
 * export const layoutRegistry: LayoutRegistry = {
 *   default: defaultLayoutConfig,
 *   builder: builderLayoutConfig,
 *   dashboard: dashboardLayoutConfig, // New layout
 * };
 * ```
 */
export const layoutRegistry: LayoutRegistry = {
  default: defaultLayoutConfig,
  builder: builderLayoutConfig,
};

/**
 * Get layout configuration by ID
 * @param layoutId - The layout identifier
 * @returns Layout configuration or null if not found
 */
export const getLayoutConfig = (layoutId: string) => {
  return layoutRegistry[layoutId] || null;
};

/**
 * Get all available layout IDs
 * @returns Array of layout IDs
 */
export const getAvailableLayouts = (): string[] => {
  return Object.keys(layoutRegistry);
};

/**
 * Check if a layout exists
 * @param layoutId - The layout identifier
 * @returns True if layout exists
 */
export const hasLayout = (layoutId: string): boolean => {
  return layoutId in layoutRegistry;
};
