import React from 'react'
import WebsiteBuilderTopbar from './website-builder/components/WebsiteBuilderTopbar'
import WebsiteBuilderLeftbar from './website-builder/components/WebsiteBuilderLeftbar'
import WebsiteBuilderRightbar from './website-builder/components/WebsiteBuilderRightbar'
import WebsiteBuilderBottombar from './website-builder/components/WebsiteBuilderBottombar'
import Layout from '@/core/layouts/Layout'

function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <Layout
            topbarContent={<WebsiteBuilderTopbar />}
            leftbarContent={<WebsiteBuilderLeftbar />}
            rightbarContent={<WebsiteBuilderRightbar />}
            bottombarContent={<WebsiteBuilderBottombar />}
        >
            {children}
        </Layout>
    )
}

export default MainLayout