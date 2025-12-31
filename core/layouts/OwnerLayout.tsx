import React from 'react'
import LayoutWrapper from './owner-bar/LayoutWrapper'
import Sidebar from './owner-bar/Sidebar'
import ContentAreaWrapper from './owner-bar/ContentAreaWrapper'
import Topbar from './owner-bar/Topbar'
import ContentArea from './owner-bar/ContentArea'

function OwnerLayout({ children }: { children: React.ReactNode }) {
    return (
        <LayoutWrapper>
            <Sidebar >
                {''}
            </Sidebar>
            <ContentAreaWrapper>
                <Topbar >
                    {''}
                </Topbar>
                <ContentArea >
                    {children}
                </ContentArea>
            </ContentAreaWrapper>
        </LayoutWrapper>
    )
}

export default OwnerLayout