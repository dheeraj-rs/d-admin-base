import React, { RefObject, useRef } from 'react';
import { MENU_ITEMS as menuItems } from '../../constants/menu-data';
import AppMenuitem from './AppMenuitem';
import AppMenuSearch from './AppMenuSearch';
import { useLayoutStore } from '../../../store';
import { AppMenuItem } from '@/core/types/admin-layout';

// Mock hooks to preserve logic structure
const useMenuItems = () => [];
const useTranslatedMenuItems = (items: any[]) => items;

const AppMenubar = ({ menubarRef }: { menubarRef: React.RefObject<HTMLDivElement | null> }) => {
    const searchRef = useRef<HTMLDivElement>(null);
    const layoutState = useLayoutStore((state) => state.layoutState);
    const filteredMenuItems = useMenuItems();
    const originalItems: AppMenuItem[] = layoutState?.searchSidebarItems?.length
        ? layoutState.searchSidebarItems
        : filteredMenuItems.length > 0
            ? filteredMenuItems
            : (menuItems as unknown as AppMenuItem[]);
    const items = useTranslatedMenuItems(originalItems);

    return (
        <ul className="layout-menu">
            {items.map((item, i) => {
                return !item?.separator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
            })}
            <AppMenuSearch searchRef={searchRef as unknown as RefObject<HTMLDivElement>} menubarRef={menubarRef as unknown as RefObject<HTMLDivElement>} />
        </ul>
    );
};

export default AppMenubar;