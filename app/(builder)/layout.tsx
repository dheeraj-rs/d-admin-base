import React from 'react'
import WebsiteBuilderTopbar from './website-builder/components/WebsiteBuilderTopbar'
import WebsiteBuilderLeftbar from './website-builder/components/WebsiteBuilderLeftbar'
import WebsiteBuilderRightbar from './website-builder/components/WebsiteBuilderRightbar'
import WebsiteBuilderBottombar from './website-builder/components/WebsiteBuilderBottombar'
import IsolatedLayout from '@/core/layouts/IsolatedLayout'

function layout({ children }: { children: React.ReactNode }) {
    return (
        <IsolatedLayout
            topbarContent={<WebsiteBuilderTopbar />}
            leftbarContent={<WebsiteBuilderLeftbar />}
            rightbarContent={<WebsiteBuilderRightbar />}
            bottombarContent={<WebsiteBuilderBottombar />}
        >
            {children}
        </IsolatedLayout>
    )
}

export default layout