'use client';

import React, { useRef } from 'react';
import { AppTopbarRef } from '@/core/types/admin-layout';
import TopbarContent from '../components/top/TopbarContent';

/**
 * NavigationTopbar - Standard navigation topbar
 * Used in default layout
 */
export const NavigationTopbar: React.FC = () => {
    const topbarRef = useRef<AppTopbarRef>(null);

    return <TopbarContent ref={topbarRef} />;
};
