'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export interface BuilderTopbarProps {
    showBackButton?: boolean;
    backPath?: string;
    title?: string;
    onPreview?: () => void;
    onSave?: () => void;
    onPublish?: () => void;
}

/**
 * BuilderTopbar - Website builder specific topbar
 * Includes back button, title, and action buttons
 */
export const BuilderTopbar: React.FC<BuilderTopbarProps> = ({
    showBackButton = true,
    backPath = '/',
    title = 'Website Builder',
    onPreview,
    onSave,
    onPublish,
}) => {
    const router = useRouter();

    const handleBack = () => {
        router.push(backPath);
    };

    return (
        <div className="layout-topbar">
            {showBackButton && (
                <button
                    className="topbar-back-button"
                    onClick={handleBack}
                    title="Back to Home"
                >
                    <i className="pi pi-arrow-left" />
                    <span>Back to Home</span>
                </button>
            )}

            <div className="topbar-title">
                <i className="pi pi-globe" />
                <span>{title}</span>
            </div>

            <div className="topbar-actions">
                <button
                    className="topbar-action-btn"
                    onClick={onPreview}
                    title="Preview"
                >
                    <i className="pi pi-eye" />
                </button>
                <button
                    className="topbar-action-btn"
                    onClick={onSave}
                    title="Save"
                >
                    <i className="pi pi-save" />
                </button>
                <button
                    className="topbar-action-btn primary"
                    onClick={onPublish}
                    title="Publish"
                >
                    <i className="pi pi-upload" />
                    <span>Publish</span>
                </button>
            </div>
        </div>
    );
};
