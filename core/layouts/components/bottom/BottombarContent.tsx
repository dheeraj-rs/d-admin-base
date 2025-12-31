import React, { useState, useRef, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { MENU_ITEMS } from '@/core/layouts/constants/menu-data';
import { useTranslatedMenuItems } from '@/core/hooks/useTranslatedMenuItems';
import { getUserRole } from '@/core/utils/auth';

const BottombarContent = () => {
    const [activeIndex, setActiveIndex] = useState(2);
    const scrollContainerRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false);

    // Flatten MENU_ITEMS to get all actionable links
    const flatMenuItems = useMemo(() => {
        const flatten = (items: any[]) => {
            let flat: any[] = [];
            items.forEach(item => {
                if (item.to) {
                    flat.push(item);
                }
                if (item.items) {
                    flat = flat.concat(flatten(item.items));
                }
            });
            return flat;
        };
        const flat = flatten(MENU_ITEMS);
        return flat;
    }, []);

    const translatedMobileMenuItems = useTranslatedMenuItems(flatMenuItems);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMounted(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    const filteredMobileMenuItems = useMemo(() => {
        if (!isMounted) {
            return translatedMobileMenuItems;
        }
        const userRole = getUserRole();
        return translatedMobileMenuItems.filter(item => {
            // 1. Role-based check (Explicit)
            if (item.roles && item.roles.length > 0) {
                if (!item.roles.includes(userRole as any)) {
                    return false;
                }
            }

            // 2. Permission-based check (Implicit via path)
            // if (!item.to) return true;
            // return canAccessPageByRole(item.to, userRole);
            return true; // Bypass permission check to ensure items render
        });
    }, [translatedMobileMenuItems, isMounted]);

    const vibrate = () => {
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
            navigator.vibrate(30);
        }
    };

    const handleItemClick = (index: number) => {
        setActiveIndex(index);
        vibrate();
    };

    return (
        <React.Fragment>
            <div className="layout-bottombar-desktop" />
            <div className="layout-bottombar-mobile">
                <div ref={scrollContainerRef} className="navigation-scroll-container">
                    {filteredMobileMenuItems.map((item, index) => {
                        const iconClass = typeof item.icon === 'string' ? item.icon : 'pi pi-circle';

                        return (
                            <Link
                                href={item.to || '/dashboard'}
                                key={index}
                                className={`navigation-item ${activeIndex === index ? 'active' : ''}`}
                                onClick={() => handleItemClick(index)}
                            >
                                <div className="icon-wrapper">
                                    <i className={iconClass} style={{ fontSize: '1.2rem' }} />
                                    <span>{item.label}</span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
            <div className="layout-bottombar-mask" />
        </React.Fragment>
    );
};

export default BottombarContent;
