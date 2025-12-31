'use client';
import { AppTopbarRef, ChildContainerProps, LayoutContentProps } from '@/core/types/admin-layout';
import React, { useRef } from 'react';
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

interface LayoutProps extends ChildContainerProps, LayoutContentProps { }

const IsolatedLayout = ({
    children,
    topbarContent,
    leftbarContent,
    rightbarContent,
    bottombarContent
}: LayoutProps) => {
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
                {topbarContent !== undefined ? React.cloneElement(topbarContent as any, { ref: topbarRef }) : <TopbarContent ref={topbarRef} />}
            </TopBar>

            <LeftBar ref={menubarRef}>
                {leftbarContent !== undefined ? leftbarContent : <LeftbarContent menubarRef={menubarRef} />}
            </LeftBar>

            <RightBar ref={configbarRef}>
                {rightbarContent !== undefined ? rightbarContent : <RightbarContent />}
            </RightBar>

            <ContentArea>
                {children}
            </ContentArea>

            <BottomBar ref={bottombarRef}>
                {bottombarContent !== undefined ? bottombarContent : <BottombarContent />}
            </BottomBar>
            <LayoutMask />
        </div>
    );
};

export default IsolatedLayout;
