
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLayoutStore } from '@/core/store';
import { AppTopbarRef, AppTopbarMenuRef } from '@/core/types/admin-layout';
import AppTopbarNotifications from './AppTopbarNotifications';
import AppTopbarMenu from './AppTopbarMenu';

const TopbarContent = forwardRef<AppTopbarRef>((props, ref) => {
    const layoutConfig = useLayoutStore((state) => state.layoutConfig);
    const layoutState = useLayoutStore((state) => state.layoutState);
    const onMenuToggle = useLayoutStore((state) => state.onMenuToggle);
    const onConfigToggle = useLayoutStore((state) => state.onConfigToggle);
    const onBottombarToggle = useLayoutStore((state) => state.onBottombarToggle);
    const onTopbarToggle = useLayoutStore((state) => state.onTopbarToggle);

    const topbarRef = useRef<HTMLDivElement>(null);
    const configMenuButtonRef = useRef<HTMLButtonElement>(null);
    const sidebarMenuButtonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<AppTopbarMenuRef>(null);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    useImperativeHandle(ref, () => ({
        topbarElement: topbarRef.current,
        menubutton: menuRef.current?.menubutton || null,
        topbarmenu: menuRef.current?.container || null,
        topbarmenubutton: configMenuButtonRef.current,
        toolbarbutton: sidebarMenuButtonRef.current,
    }));

    return (
        <section ref={topbarRef} className="layout-topbar">
            <div className="topbar-start">
                <Link href="/" className="logo-row">
                    <Image
                        src={`/icons/logo-${layoutConfig.colorScheme?.includes('dark') || layoutConfig.theme?.includes('dark') ? 'dark' : 'white'}.svg`}
                        width={40}
                        height={40}
                        alt="logo"
                        className="logo-img"
                        priority
                    />
                    <span className="logo-text">
                        {'D-Admin'.split('').map((letter: string, index: number) => (
                            <span key={index}>{letter}</span>
                        ))}
                    </span>
                </Link>
            </div>

            <div className="topbar-center">
                <AppTopbarNotifications />
            </div>

            <div className="topbar-end">
                <AppTopbarMenu
                    ref={menuRef}
                    layoutState={layoutState}
                    layoutConfig={layoutConfig}
                    onMenuToggle={onMenuToggle}
                    onConfigToggle={onConfigToggle}
                    onBottombarToggle={onBottombarToggle}
                    onTopbarToggle={onTopbarToggle}
                    isMounted={isMounted}
                />
            </div>
            <button ref={configMenuButtonRef} type="button" className="p-link layout-topbar-button layout-topbar-menu-button" onClick={(e) => { e.stopPropagation(); onConfigToggle(); }}>
                <i className="pi pi-palette" />
            </button>
            <button ref={sidebarMenuButtonRef} type="button" className="p-link layout-topbar-button layout-topbar-menu-button" onClick={(e) => { e.stopPropagation(); onMenuToggle(); }}>
                <i className="pi pi-bars" />
            </button>
        </section>
    );
});

TopbarContent.displayName = 'TopbarContent';

export default TopbarContent;
