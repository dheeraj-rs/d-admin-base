'use client';

import { createContext, useContext } from 'react';
import { LayoutContextState, LayoutSlot } from '@/core/types/layout-types';

/**
 * Layout context for dependency injection
 */
export const LayoutContext = createContext<LayoutContextState | null>(null);

/**
 * Hook to access layout context
 * @throws Error if used outside LayoutProvider
 */
export const useLayoutContext = (): LayoutContextState => {
    const context = useContext(LayoutContext);

    if (!context) {
        throw new Error(
            'useLayoutContext must be used within a LayoutProvider. ' +
            'Wrap your component tree with <LayoutProvider>.'
        );
    }

    return context;
};

/**
 * Hook to get current layout configuration
 */
export const useCurrentLayout = () => {
    const { getCurrentLayout } = useLayoutContext();
    return getCurrentLayout();
};

/**
 * Hook to switch between layouts
 */
export const useLayoutSwitch = () => {
    const { switchLayout } = useLayoutContext();
    return switchLayout;
};

/**
 * Hook to get bars for a specific slot
 */
export const useLayoutSlot = (slot: string) => {
    const { getBarsForSlot } = useLayoutContext();
    return getBarsForSlot(slot as any);
};
