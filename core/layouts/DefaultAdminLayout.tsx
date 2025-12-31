'use client';
import React from 'react';
import Layout from './IsolatedLayout';
import TopbarContent from './components/top/TopbarContent';
import LeftbarContent from './components/left/LeftbarContent';
import RightbarContent from './components/right/RightbarContent';
import BottombarContent from './components/bottom/BottombarContent';
import { ChildContainerProps } from '@/core/types/admin-layout';

/**
 * DefaultAdminLayout - Wrapper component that provides the standard admin layout content
 * Uses the flexible Layout component with default admin-specific content for all bars
 */
const DefaultAdminLayout = ({ children }: ChildContainerProps) => {
    return (
        <Layout
            topbarContent={<TopbarContent ref={null} />}
            leftbarContent={<LeftbarContent menubarRef={{ current: null }} />}
            rightbarContent={<RightbarContent />}
            bottombarContent={<BottombarContent />}
        >
            {children}
        </Layout>
    );
};

export default DefaultAdminLayout;
