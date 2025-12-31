import IsolatedContainer from '@/core/layouts/default-bar/IsolatedContainer';
import Layout from '@/core/layouts/layout';
import React from 'react';

function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <Layout>
            <IsolatedContainer>
                {children}
            </IsolatedContainer>
        </Layout>
    );
}

export default MainLayout;
