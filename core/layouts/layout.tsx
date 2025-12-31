'use client';

import React from 'react';
import { useLayoutStore } from '@/core/store';
import { useMenuManagement } from '@/core/hooks/useMenuManagement';
import { useLayoutClasses } from '@/core/hooks/useLayoutClasses';
import { useCurrentLayout, useLayoutSlot } from './context/LayoutContext';
import { LayoutProps } from '@/core/types/layout-types';
import TopBar from './default-bar/TopBar';
import LeftBar from './default-bar/LeftBar';
import RightBar from './default-bar/RightBar';
import BottomBar from './default-bar/BottomBar';
import ContentArea from './default-bar/ContentArea';
import LayoutMask from './default-bar/LayoutMask';
import { LayoutSlot } from './components/LayoutSlot';
import { useRef } from 'react';
import { AppTopbarRef } from '@/core/types/admin-layout';

/**
 * Smart Layout Component
 * Uses slot-based architecture to render components from layout configuration
 * 
 * @example
 * ```tsx
 * <LayoutProvider initialLayout="default">
 *   <Layout>
 *     <YourContent />
 *   </Layout>
 * </LayoutProvider>
 * ```
 */
const Layout: React.FC<LayoutProps> = ({ children, className }) => {
    const layoutConfig = useLayoutStore((state) => state.layoutConfig);
    const layoutState = useLayoutStore((state) => state.layoutState);
    const setLayoutState = useLayoutStore((state) => state.setLayoutState);

    const topbarRef = useRef<AppTopbarRef>(null);
    const menubarRef = useRef<HTMLDivElement>(null);
    const configbarRef = useRef<HTMLDivElement>(null);
    const bottombarRef = useRef<HTMLDivElement>(null);

    useMenuManagement({
        layoutState,
        setLayoutState,
        topbarRef,
        menubarRef,
        configbarRef,
    });

    const containerClass = useLayoutClasses({ layoutConfig, layoutState });
    const currentLayout = useCurrentLayout();

    // Get components for each slot
    const topbarComponents = useLayoutSlot('topbar');
    const leftbarComponents = useLayoutSlot('leftbar');
    const rightbarComponents = useLayoutSlot('rightbar');
    const bottombarComponents = useLayoutSlot('bottombar');

    return (
        <div className={`${containerClass} ${className || ''}`}>
            <TopBar>
                <LayoutSlot slot="topbar" components={topbarComponents} />
            </TopBar>

            <LeftBar ref={menubarRef}>
                <LayoutSlot slot="leftbar" components={leftbarComponents} />
            </LeftBar>

            <RightBar ref={configbarRef}>
                <LayoutSlot slot="rightbar" components={rightbarComponents} />
            </RightBar>

            <ContentArea>{children}</ContentArea>

            <BottomBar ref={bottombarRef}>
                <LayoutSlot slot="bottombar" components={bottombarComponents} />
            </BottomBar>

            <LayoutMask />
        </div>
    );
};

export default Layout;
