'use client';
import React from 'react';
import { useLayoutStore } from '@/core/store';


import { AppTopbarRef } from '@/core/types/admin-layout';

const WebsiteBuilderTopbar = React.forwardRef<AppTopbarRef>((props, ref) => {
    const onMenuToggle = useLayoutStore((state) => state.onMenuToggle);
    const onConfigToggle = useLayoutStore((state) => state.onConfigToggle);
    const onBottombarToggle = useLayoutStore((state) => state.onBottombarToggle);
    const onTopbarToggle = useLayoutStore((state) => state.onTopbarToggle);

    const menubuttonRef = React.useRef<HTMLButtonElement>(null);
    const topbarmenuRef = React.useRef<HTMLDivElement>(null);
    const topbarmenubuttonRef = React.useRef<HTMLButtonElement>(null);

    React.useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    return (
        <div className="layout-topbar builder-topbar">
            <button ref={menubuttonRef} className="p-link layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars"></i>
            </button>

            <div className="topbar-end">
                <div className="layout-topbar-menu" ref={topbarmenuRef}>

                    <button className="p-link layout-topbar-button" onClick={onTopbarToggle} title="Toggle Top Bar">
                        <i className="pi pi-chevron-up"></i>
                    </button>

                    <button className="p-link layout-topbar-button" onClick={onBottombarToggle} title="Toggle Bottom Bar">
                        <i className="pi pi-minus"></i>
                    </button>

                    <button className="p-link layout-topbar-button" onClick={onConfigToggle}>
                        <i className="pi pi-palette"></i>
                    </button>
                </div>
            </div>
        </div>
    );
});

WebsiteBuilderTopbar.displayName = 'WebsiteBuilderTopbar';

export default WebsiteBuilderTopbar;
