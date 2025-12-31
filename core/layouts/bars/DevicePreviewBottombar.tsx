'use client';

import React, { useState } from 'react';

export type DeviceType = 'desktop' | 'tablet' | 'mobile';

export interface DevicePreviewBottombarProps {
    activeDevice?: DeviceType;
    onDeviceChange?: (device: DeviceType) => void;
    onUndo?: () => void;
    onRedo?: () => void;
    canUndo?: boolean;
    canRedo?: boolean;
}

/**
 * DevicePreviewBottombar - Website builder bottom toolbar
 * Shows device preview options and undo/redo controls
 */
export const DevicePreviewBottombar: React.FC<DevicePreviewBottombarProps> = ({
    activeDevice: controlledDevice,
    onDeviceChange,
    onUndo,
    onRedo,
    canUndo = true,
    canRedo = true,
}) => {
    const [internalDevice, setInternalDevice] = useState<DeviceType>('desktop');
    const activeDevice = controlledDevice ?? internalDevice;

    const handleDeviceChange = (device: DeviceType) => {
        if (controlledDevice === undefined) {
            setInternalDevice(device);
        }
        onDeviceChange?.(device);
    };

    return (
        <div className="builder-bottombar">
            <div className="bottombar-section">
                <button
                    className={`bottombar-btn ${activeDevice === 'desktop' ? 'active' : ''}`}
                    onClick={() => handleDeviceChange('desktop')}
                >
                    <i className="pi pi-desktop" />
                    <span>Desktop</span>
                </button>
                <button
                    className={`bottombar-btn ${activeDevice === 'tablet' ? 'active' : ''}`}
                    onClick={() => handleDeviceChange('tablet')}
                >
                    <i className="pi pi-tablet" />
                    <span>Tablet</span>
                </button>
                <button
                    className={`bottombar-btn ${activeDevice === 'mobile' ? 'active' : ''}`}
                    onClick={() => handleDeviceChange('mobile')}
                >
                    <i className="pi pi-mobile" />
                    <span>Mobile</span>
                </button>
            </div>

            <div className="bottombar-section">
                <span className="bottombar-info">
                    <i className="pi pi-info-circle" />
                    Click elements to edit properties
                </span>
            </div>

            <div className="bottombar-section">
                <button
                    className="bottombar-btn"
                    onClick={onUndo}
                    disabled={!canUndo}
                    title="Undo"
                >
                    <i className="pi pi-undo" />
                </button>
                <button
                    className="bottombar-btn"
                    onClick={onRedo}
                    disabled={!canRedo}
                    title="Redo"
                >
                    <i className="pi pi-redo" />
                </button>
            </div>
        </div>
    );
};
