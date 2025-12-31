'use client';

import React from 'react';

export interface ComponentItem {
    id: string;
    label: string;
    icon: string;
}

export interface PageItem {
    id: string;
    label: string;
    active?: boolean;
}

export interface ComponentsLeftbarProps {
    components?: ComponentItem[];
    pages?: PageItem[];
    onComponentDrag?: (componentId: string) => void;
    onPageSelect?: (pageId: string) => void;
}

const defaultComponents: ComponentItem[] = [
    { id: 'text', label: 'Text Block', icon: 'pi-align-left' },
    { id: 'image', label: 'Image', icon: 'pi-image' },
    { id: 'button', label: 'Button', icon: 'pi-link' },
    { id: 'grid', label: 'Grid', icon: 'pi-table' },
    { id: 'navigation', label: 'Navigation', icon: 'pi-bars' },
    { id: 'video', label: 'Video', icon: 'pi-play' },
];

const defaultPages: PageItem[] = [
    { id: 'home', label: 'Home', active: true },
    { id: 'about', label: 'About', active: false },
    { id: 'contact', label: 'Contact', active: false },
];

/**
 * ComponentsLeftbar - Website builder components panel
 * Shows draggable components and page list
 */
export const ComponentsLeftbar: React.FC<ComponentsLeftbarProps> = ({
    components = defaultComponents,
    pages = defaultPages,
    onComponentDrag,
    onPageSelect,
}) => {
    return (
        <div className="builder-sidebar">
            <div className="sidebar-section">
                <h3 className="sidebar-section-title">
                    <i className="pi pi-th-large" />
                    Components
                </h3>
                <div className="component-list">
                    {components.map((component) => (
                        <div
                            key={component.id}
                            className="component-item"
                            draggable
                            onDragStart={() => onComponentDrag?.(component.id)}
                        >
                            <i className={`pi ${component.icon}`} />
                            <span>{component.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="sidebar-section">
                <h3 className="sidebar-section-title">
                    <i className="pi pi-folder" />
                    Pages
                </h3>
                <div className="page-list">
                    {pages.map((page) => (
                        <div
                            key={page.id}
                            className={`page-item ${page.active ? 'active' : ''}`}
                            onClick={() => onPageSelect?.(page.id)}
                        >
                            <i className="pi pi-file" />
                            <span>{page.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
