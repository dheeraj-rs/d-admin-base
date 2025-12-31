'use client';

import IsolatedContainer from '@/core/layouts/default-bar/IsolatedContainer';
import Layout from '@/core/layouts/layout';
import { LayoutProvider } from '@/core/layouts/context/LayoutProvider';
import React from 'react';

function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <LayoutProvider initialLayout="default">
            <Layout>
                <IsolatedContainer>
                    {children}
                </IsolatedContainer>
            </Layout>
        </LayoutProvider>
    );
}

export default MainLayout;
