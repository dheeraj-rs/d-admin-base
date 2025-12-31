import IsolatedContainer from '@/core/layouts/default-bar/IsolatedContainer';
import IsolatedLayout from '@/core/layouts/IsolatedLayout';
import React from 'react';

function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <IsolatedLayout>
            <IsolatedContainer>
                {children}
            </IsolatedContainer>
        </IsolatedLayout>
    );
}

export default MainLayout;
