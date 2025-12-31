'use client';

import { ThemeManager } from '@/core/utils/theme/ThemeManager';
import { useEffect, useState } from 'react';
import { LayoutConfig } from '../../../store';
import { useLayoutStore } from '../../../store';
import { useLanguage } from '@/core/providers/LanguageProvider';
import ScaleControl from './ScaleControl';
import MenuTypeSelector from './MenuTypeSelector';
import TabConfig from './TabConfig';
import { ThemeCategory } from '@/core/utils/theme/ThemeCategory';

const AppConfigbar = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const { t } = useLanguage();
    const [scales] = useState([11, 12, 13, 14, 15]);

    const layoutConfig = useLayoutStore((state) => state.layoutConfig);
    const setLayoutConfig = useLayoutStore((state) => state.setLayoutConfig);
    const layoutState = useLayoutStore((state) => state.layoutState);
    const onSidebarAutoOverlayToggle = useLayoutStore((state) => state.onSidebarAutoOverlayToggle);
    const onMenuToggle = useLayoutStore((state) => state.onMenuToggle);
    const onConfigToggle = useLayoutStore((state) => state.onConfigToggle);
    const onBottombarToggle = useLayoutStore((state) => state.onBottombarToggle);
    const onTopbarToggle = useLayoutStore((state) => state.onTopbarToggle);

    const changeRipple = (e: { value: boolean }) => {
        ThemeManager.ripple = e.value;
        setLayoutConfig((prevState: LayoutConfig) => ({
            ...prevState,
            ripple: e.value,
        }));
    };

    const changeMenuMode = (e: { value: string }) => {
        setLayoutConfig((prevState: LayoutConfig) => ({
            ...prevState,
            menuMode: e.value as 'static' | 'overlay',
        }));
    };



    useEffect(() => {
        document.documentElement.style.fontSize = layoutConfig.scale + 'px';
    }, [layoutConfig.scale]);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);

            document.body.style.overflow = 'hidden';
            document.documentElement.style.background = 'var(--bg-color)';
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);

            document.body.style.overflow = '';
            document.documentElement.style.background = '';
        }
    };

    return (
        <div className="layout-config-container">
            <ScaleControl layoutConfig={layoutConfig} setLayoutConfig={setLayoutConfig} scales={scales} t={t} />

            <MenuTypeSelector
                layoutConfig={layoutConfig}
                layoutState={layoutState}
                changeMenuMode={changeMenuMode}
                onSidebarAutoOverlayToggle={onSidebarAutoOverlayToggle}
                t={t}
            />

            <TabConfig
                layoutConfig={layoutConfig}
                layoutState={layoutState}
                isFullscreen={isFullscreen}
                onMenuToggle={onMenuToggle}
                onTopbarToggle={onTopbarToggle}
                onBottombarToggle={onBottombarToggle}
                onConfigToggle={onConfigToggle}
                toggleFullscreen={toggleFullscreen}
                t={t}
            />

            <h5 className="config-title">{t('config.rippleEffect')}</h5>
            <div className="ripple-toggle">
                <button
                    className={`toggle-button ${layoutConfig.ripple ? 'active' : ''}`}
                    onClick={() => changeRipple({ value: !layoutConfig.ripple })}
                    title={`Toggle ${t('config.rippleEffect')}`}
                >
                    <i className="pi pi-circle-fill ripple-icon" />
                    <span>{t('config.ripple')}</span>
                </button>
            </div>

            <div className="theme-container">
                <h5 className="config-title">{t('config.themes')}</h5>
                <ThemeCategory
                    title={t('config.bootstrap')}
                    themes={[
                        {
                            theme: 'bootstrap4-light-blue',
                            colorScheme: 'light',
                            name: t('config.blue'),
                            primary: '#0d6efd',
                            secondary: '#f8f9fa',
                            gradient: 'bg-gradient-to-r from-blue-500 to-blue-600',
                        },
                        {
                            theme: 'bootstrap4-light-purple',
                            colorScheme: 'light',
                            name: t('config.purple'),
                            primary: '#6f42c1',
                            secondary: '#e9ecef',
                            gradient: 'bg-gradient-to-r from-purple-500 to-purple-600',
                        },
                        {
                            theme: 'bootstrap4-dark-blue',
                            colorScheme: 'dark',
                            name: t('config.blue'),
                            primary: '#0d6efd',
                            secondary: '#212529',
                            gradient: 'bg-gradient-to-r from-blue-600 to-blue-700',
                        },
                        {
                            theme: 'bootstrap4-dark-purple',
                            colorScheme: 'dark',
                            name: t('config.purple'),
                            primary: '#6f42c1',
                            secondary: '#212529',
                            gradient: 'bg-gradient-to-r from-purple-600 to-purple-700',
                        },
                    ]}
                />
                <ThemeCategory
                    title={t('config.materialDesign')}
                    themes={[
                        {
                            theme: 'md-light-indigo',
                            colorScheme: 'light',
                            name: t('config.indigo'),
                            primary: '#3f51b5',
                            secondary: '#ffffff',
                            gradient: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
                        },
                        {
                            theme: 'md-light-deeppurple',
                            colorScheme: 'light',
                            name: t('config.deepPurple'),
                            primary: '#673ab7',
                            secondary: '#ffffff',
                            gradient: 'bg-gradient-to-r from-purple-500 to-purple-600',
                        },
                        {
                            theme: 'md-dark-indigo',
                            colorScheme: 'dark',
                            name: t('config.indigo'),
                            primary: '#3f51b5',
                            secondary: '#212529',
                            gradient: 'bg-gradient-to-r from-indigo-600 to-indigo-700',
                        },
                        {
                            theme: 'md-dark-deeppurple',
                            colorScheme: 'dark',
                            name: t('config.deepPurple'),
                            primary: '#673ab7',
                            secondary: '#212529',
                            gradient: 'bg-gradient-to-r from-purple-600 to-purple-700',
                        },
                    ]}
                />

                <ThemeCategory
                    title={t('config.customDesign')}
                    themes={[
                        {
                            theme: 'lara-light-indigo',
                            colorScheme: 'light',
                            name: t('config.indigo'),
                            primary: '#6366f1',
                            secondary: '#ffffff',
                            gradient: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
                        },
                        {
                            theme: 'lara-light-blue',
                            colorScheme: 'light',
                            name: t('config.blue'),
                            primary: '#3b82f6',
                            secondary: '#ffffff',
                            gradient: 'bg-gradient-to-r from-blue-500 to-blue-600',
                        },
                        {
                            theme: 'lara-light-purple',
                            colorScheme: 'light',
                            name: t('config.purple'),
                            primary: '#8b5cf6',
                            secondary: '#ffffff',
                            gradient: 'bg-gradient-to-r from-purple-500 to-purple-600',
                        },
                        {
                            theme: 'lara-light-teal',
                            colorScheme: 'light',
                            name: t('config.teal'),
                            primary: '#14b8a6',
                            secondary: '#ffffff',
                            gradient: 'bg-gradient-to-r from-teal-500 to-teal-600',
                        },
                        {
                            theme: 'lara-dark-indigo',
                            colorScheme: 'dark',
                            name: t('config.indigo'),
                            primary: '#6366f1',
                            secondary: '#1e1e1e',
                            gradient: 'bg-gradient-to-r from-indigo-600 to-indigo-700',
                        },
                        {
                            theme: 'lara-dark-blue',
                            colorScheme: 'dark',
                            name: t('config.blue'),
                            primary: '#3b82f6',
                            secondary: '#1e1e1e',
                            gradient: 'bg-gradient-to-r from-blue-600 to-blue-700',
                        },
                        {
                            theme: 'lara-dark-purple',
                            colorScheme: 'dark',
                            name: t('config.purple'),
                            primary: '#8b5cf6',
                            secondary: '#1e1e1e',
                            gradient: 'bg-gradient-to-r from-purple-600 to-purple-700',
                        },
                        {
                            theme: 'lara-dark-teal',
                            colorScheme: 'dark',
                            name: t('config.teal'),
                            primary: '#14b8a6',
                            secondary: '#1e1e1e',
                            gradient: 'bg-gradient-to-r from-teal-600 to-teal-700',
                        },
                    ]}
                />
                <ThemeCategory
                    title={t('config.customDesign')}
                    themes={[
                        {
                            theme: 'd-admin-light',
                            colorScheme: 'light',
                            name: t('config.dAdminLight'),
                            primary: '#6366f1',
                            secondary: '#ffffff',
                            gradient: 'bg-gradient-to-r from-indigo-400 to-cyan-400',
                        },
                        {
                            theme: 'd-admin-dark',
                            colorScheme: 'dark',
                            name: t('config.dAdminDark'),
                            primary: '#6366f1',
                            secondary: '#0f172a',
                            gradient: 'bg-gradient-to-r from-indigo-600 to-cyan-600',
                        },
                    ]}
                />
            </div>
        </div>
    );
};

export default AppConfigbar;