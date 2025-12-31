import React from 'react';
import IsolatedContainer from '@/core/layouts/default-bar/IsolatedContainer';
import IsolatedLayout from '@/core/layouts/IsolatedLayout';

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
