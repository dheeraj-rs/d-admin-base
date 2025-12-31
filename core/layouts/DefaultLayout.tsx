'use client';
import Layout from './IsolatedLayout';
import TopbarContent from './default-bar/topbar-content/TopbarContent';
import LeftbarContent from './default-bar/leftbar-content/LeftbarContent';
import RightbarContent from './default-bar/rightbar-content/RightbarContent';
import BottombarContent from './default-bar/bottombar-content/BottombarContent';
import { ChildContainerProps } from '@/core/types/admin-layout';

const DefaultLayout = ({ children }: ChildContainerProps) => {
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

export default DefaultLayout;
