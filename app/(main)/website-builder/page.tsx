'use client';

import { useEffect } from 'react';
import { useLayoutSwitch } from '@/core/layouts/context/LayoutContext';

/**
 * Website Builder Page
 * Automatically switches to builder layout when mounted
 */
export default function WebsiteBuilderPage() {
    const switchLayout = useLayoutSwitch();

    // Switch to builder layout on mount, restore default on unmount
    useEffect(() => {
        switchLayout('builder');

        return () => {
            switchLayout('default');
        };
    }, [switchLayout]);

    return (
        <div className="builder-canvas">
            <div className="canvas-placeholder">
                <i className="pi pi-plus-circle" />
                <h2>Start Building Your Website</h2>
                <p>Drag components from the left sidebar to get started</p>
            </div>
        </div>
    );
}