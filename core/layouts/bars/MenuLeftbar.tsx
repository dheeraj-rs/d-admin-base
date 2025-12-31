'use client';

import React from 'react';
import LeftbarContent from '../components/left/LeftbarContent';

export interface MenuLeftbarProps {
    menubarRef?: React.RefObject<HTMLDivElement>;
}

/**
 * MenuLeftbar - Standard menu sidebar
 * Used in default layout
 */
export const MenuLeftbar: React.FC<MenuLeftbarProps> = ({ menubarRef }) => {
    const defaultRef = React.useRef<HTMLDivElement>(null);
    const ref = menubarRef || defaultRef;

    return <LeftbarContent menubarRef={ref} />;
};
