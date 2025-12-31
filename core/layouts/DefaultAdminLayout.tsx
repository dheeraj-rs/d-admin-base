'use client';
import Layout from './IsolatedLayout';
import TopbarContent from './components/top/TopbarContent';
import LeftbarContent from './components/left/LeftbarContent';
import RightbarContent from './components/right/RightbarContent';
import BottombarContent from './components/bottom/BottombarContent';
import { ChildContainerProps } from '@/core/types/admin-layout';

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
