'use client';
import { AppTopbarRef, ChildContainerProps } from '@/core/types/admin-layout';
import { useRef } from 'react';
import TopBar from './default-bar/TopBar';
import LeftBar from './default-bar/LeftBar';
import RightBar from './default-bar/RightBar';
import BottomBar from './default-bar/BottomBar';
import { useLayoutStore } from '../store';
import { useMenuManagement } from '../hooks/useMenuManagement';
import { useLayoutClasses } from '../hooks/useLayoutClasses';
import ContentArea from './default-bar/ContentArea';
import LayoutMask from './default-bar/LayoutMask';
import TopbarContent from './components/top/TopbarContent';
import LeftbarContent from './components/left/LeftbarContent';
import RightbarContent from './components/right/RightbarContent';
import BottombarContent from './components/bottom/BottombarContent';

const Layout = ({ children }: ChildContainerProps) => {
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

    return (
        <div className={containerClass}>
            <TopBar>
                <TopbarContent ref={topbarRef} />
            </TopBar>

            <LeftBar ref={menubarRef}>
                <LeftbarContent menubarRef={menubarRef} />
            </LeftBar>

            <RightBar ref={configbarRef}>
                <RightbarContent />
            </RightBar>

            <ContentArea>
                {children}
            </ContentArea>

            <BottomBar ref={bottombarRef}>
                <BottombarContent />
            </BottomBar>
            <LayoutMask />
        </div>
    );
};

export default Layout;
