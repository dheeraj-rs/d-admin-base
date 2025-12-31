'use client';

import React from 'react';

export interface PropertyField {
    id: string;
    label: string;
    type: 'color' | 'number' | 'select' | 'text';
    value?: any;
    options?: string[];
}

export interface PropertiesRightbarProps {
    properties?: PropertyField[];
    onPropertyChange?: (propertyId: string, value: any) => void;
}

const defaultProperties: PropertyField[] = [
    { id: 'bgColor', label: 'Background Color', type: 'color', value: '#ffffff' },
    { id: 'padding', label: 'Padding', type: 'number', value: 20 },
    { id: 'borderRadius', label: 'Border Radius', type: 'number', value: 0 },
    { id: 'width', label: 'Width', type: 'select', value: 'Auto', options: ['Auto', '100%', 'Custom'] },
];

/**
 * PropertiesRightbar - Website builder properties panel
 * Shows editable properties for selected element
 */
export const PropertiesRightbar: React.FC<PropertiesRightbarProps> = ({
    properties = defaultProperties,
    onPropertyChange,
}) => {
    const handleChange = (propertyId: string, value: any) => {
        onPropertyChange?.(propertyId, value);
    };

    const renderField = (property: PropertyField) => {
        switch (property.type) {
            case 'color':
                return (
                    <input
                        type="color"
                        className="property-input"
                        value={property.value}
                        onChange={(e) => handleChange(property.id, e.target.value)}
                    />
                );
            case 'number':
                return (
                    <input
                        type="number"
                        className="property-input"
                        value={property.value}
                        onChange={(e) => handleChange(property.id, e.target.value)}
                    />
                );
            case 'select':
                return (
                    <select
                        className="property-input"
                        value={property.value}
                        onChange={(e) => handleChange(property.id, e.target.value)}
                    >
                        {property.options?.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                );
            case 'text':
            default:
                return (
                    <input
                        type="text"
                        className="property-input"
                        value={property.value}
                        onChange={(e) => handleChange(property.id, e.target.value)}
                    />
                );
        }
    };

    return (
        <div className="builder-properties">
            <h3 className="properties-title">
                <i className="pi pi-sliders-h" />
                Properties
            </h3>
            {properties.map((property) => (
                <div key={property.id} className="property-section">
                    <label className="property-label">{property.label}</label>
                    {renderField(property)}
                </div>
            ))}
        </div>
    );
};
