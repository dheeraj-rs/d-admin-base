import React from 'react'
import LayoutWrapper from './owner-bar/LayoutWrapper'
import Sidebar from './owner-bar/Sidebar'
import ContentAreaWrapper from './owner-bar/ContentAreaWrapper'
import Topbar from './owner-bar/Topbar'
import ContentArea from './owner-bar/ContentArea'
import SideBarContent from './owner-bar/SideBarContent'
import TopBarContent from './owner-bar/TopBarConntent'

function OwnerLayout({ children }: { children: React.ReactNode }) {
    return (
        <LayoutWrapper>
            <Sidebar >
                <SideBarContent />
            </Sidebar>
            <ContentAreaWrapper>
                <Topbar >
                    <TopBarContent />
                </Topbar>
                <ContentArea >
                    {children}
                </ContentArea>
            </ContentAreaWrapper>
        </LayoutWrapper>
    )
}

export default OwnerLayout