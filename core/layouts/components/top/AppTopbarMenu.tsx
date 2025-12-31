import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import Link from 'next/link';
import { PanelLeft, PanelTop, PanelBottom, PanelRight } from 'lucide-react';
import { classNames } from '@/core/utils';
import { useLanguage } from '@/core/providers/LanguageProvider';
import { AppTopbarMenuProps, AppTopbarMenuRef } from '@/core/types/admin-layout';

const AppTopbarMenu = forwardRef<AppTopbarMenuRef, AppTopbarMenuProps>((props, ref) => {
    const {
        layoutState,
        layoutConfig,
        onMenuToggle,
        onConfigToggle,
        onBottombarToggle,
        onTopbarToggle,
    } = props;

    const { t } = useLanguage();
    const menubuttonRef = useRef<HTMLButtonElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        container: containerRef.current
    }));

    return (
        <div
            ref={containerRef}
            className={classNames('layout-topbar-menu', {
                'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible,
            })}
        >
            <div className="layout-button-container">
                <button ref={menubuttonRef} type="button" className="p-link layout-topbar-button" onClick={onMenuToggle}>
                    <PanelLeft
                        size={24}
                        className={(layoutConfig.menuMode === 'static' && layoutState.staticMenuDesktopInactive === false) || (layoutConfig.menuMode === 'overlay' && layoutState.overlayMenuActive === true) ? 'text-primary' : 'text-color-secondary'}
                        strokeWidth={(layoutConfig.menuMode === 'static' && layoutState.staticMenuDesktopInactive === false) || (layoutConfig.menuMode === 'overlay' && layoutState.overlayMenuActive === true) ? 2.5 : 1.5}
                    />
                    <span>{t('sidebar.collapse')}</span>
                </button>
                <button type="button" className="p-link layout-topbar-button" onClick={onTopbarToggle}>
                    <PanelTop
                        size={24}
                        className={layoutState.topbarAutoHide === false ? 'text-primary' : 'text-color-secondary'}
                        strokeWidth={layoutState.topbarAutoHide === false ? 2.5 : 1.5}
                    />
                    <span>{t('layout.headerStyle')}</span>
                </button>
                <button type="button" className="p-link layout-topbar-button" onClick={onBottombarToggle}>
                    <PanelBottom
                        size={24}
                        className={(layoutConfig.menuMode === 'static' && layoutState.staticBottombarDesktopInactive === false) || (layoutConfig.menuMode === 'overlay' && layoutState.overlayBottombarActive === true) ? 'text-primary' : 'text-color-secondary'}
                        strokeWidth={(layoutConfig.menuMode === 'static' && layoutState.staticBottombarDesktopInactive === false) || (layoutConfig.menuMode === 'overlay' && layoutState.overlayBottombarActive === true) ? 2.5 : 1.5}
                    />
                    <span>{t('layout.footerStyle')}</span>
                </button>
                <button type="button" className="p-link layout-topbar-button" onClick={onConfigToggle}>
                    <PanelRight
                        size={24}
                        className={(layoutConfig.menuMode === 'static' && layoutState.staticConfigDesktopInactive === false) || (layoutConfig.menuMode === 'overlay' && layoutState.overlayConfigActive === true) ? 'text-primary' : 'text-color-secondary'}
                        strokeWidth={(layoutConfig.menuMode === 'static' && layoutState.staticConfigDesktopInactive === false) || (layoutConfig.menuMode === 'overlay' && layoutState.overlayConfigActive === true) ? 2.5 : 1.5}
                    />
                    <span>{t('nav.webconfig')}</span>
                </button>
            </div>
            <div className="topbar-actions">
                <Link href="/settings">
                    <button type="button" className="p-link layout-topbar-button" title={t('nav.settings')}>
                        <i className="pi pi-cog"></i>
                        <span>{t('nav.settings')}</span>
                    </button>
                </Link>
            </div>
        </div>
    );
});

AppTopbarMenu.displayName = 'AppTopbarMenu';

export default AppTopbarMenu;
