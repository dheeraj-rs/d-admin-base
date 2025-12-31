import React from 'react';
import AppMenubar from './AppMenubar';

interface LeftbarContentProps {
    menubarRef: React.RefObject<HTMLDivElement | null>;
}

const LeftbarContent = ({ menubarRef }: LeftbarContentProps) => {
    return (
        <div className="layout-sidebar" ref={menubarRef}>
            <div className="sidebar-header">
                {/* Header content could be here, but AppMenubar usually handles the menu list */}
            </div>
            <div className="layout-menu-container">
                <AppMenubar menubarRef={menubarRef} />
            </div>
        </div>
    );
};

export default LeftbarContent;
