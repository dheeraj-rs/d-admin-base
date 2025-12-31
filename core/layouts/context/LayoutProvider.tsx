'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { LayoutContext } from './LayoutContext';
import {
    LayoutProviderProps,
    LayoutConfiguration,
    LayoutSlot,
    BarComponent,
} from '@/core/types/layout-types';
import { layoutRegistry as defaultRegistry } from '@/core/layouts/configs/layout-registry';

/**
 * LayoutProvider - Manages layout state and provides context
 * 
 * @example
 * ```tsx
 * <LayoutProvider initialLayout="default">
 *   <App />
 * </LayoutProvider>
 * ```
 */
export const LayoutProvider: React.FC<LayoutProviderProps> = ({
    children,
    initialLayout = 'default',
    registry = defaultRegistry,
}) => {
    const [currentLayoutId, setCurrentLayoutId] = useState<string>(initialLayout);

    /**
     * Switch to a different layout
     */
    const switchLayout = useCallback((layoutId: string) => {
        if (!registry[layoutId]) {
            console.error(`Layout "${layoutId}" not found in registry`);
            return;
        }
        setCurrentLayoutId(layoutId);
    }, [registry]);

    /**
     * Get current layout configuration
     */
    const getCurrentLayout = useCallback((): LayoutConfiguration | null => {
        return registry[currentLayoutId] || null;
    }, [currentLayoutId, registry]);

    /**
     * Get bars for a specific slot
     */
    const getBarsForSlot = useCallback((slot: LayoutSlot): BarComponent[] => {
        const layout = getCurrentLayout();
        if (!layout) return [];

        return layout.bars
            .filter((bar) => bar.slot === slot && bar.enabled !== false)
            .sort((a, b) => (b.priority || 0) - (a.priority || 0));
    }, [getCurrentLayout]);

    /**
     * Memoized context value
     */
    const contextValue = useMemo(
        () => ({
            currentLayoutId,
            registry,
            switchLayout,
            getCurrentLayout,
            getBarsForSlot,
        }),
        [currentLayoutId, registry, switchLayout, getCurrentLayout, getBarsForSlot]
    );

    return (
        <LayoutContext.Provider value={contextValue}>
            {children}
        </LayoutContext.Provider>
    );
};
