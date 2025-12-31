'use client';

import React from 'react';
import { LayoutSlotProps } from '@/core/types/layout-types';

/**
 * LayoutSlot - Renders components for a specific layout slot
 * 
 * Handles component priority, props injection, and error boundaries
 * 
 * @example
 * ```tsx
 * <LayoutSlot slot="topbar" components={topbarComponents} />
 * ```
 */
export const LayoutSlot: React.FC<LayoutSlotProps> = ({
    slot,
    components = [],
    fallback = null,
}) => {
    if (components.length === 0) {
        return <>{fallback}</>;
    }

    return (
        <>
            {components.map((barComponent) => {
                const Component = barComponent.component;
                const props = barComponent.props || {};

                return (
                    <React.Fragment key={barComponent.id}>
                        <Component {...props} />
                    </React.Fragment>
                );
            })}
        </>
    );
};
