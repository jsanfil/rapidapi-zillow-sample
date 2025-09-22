import { useState } from 'react'

const PROPERTY_TYPES = [
    { value: '', label: 'Any Type' },
    { value: 'SINGLE_FAMILY', label: 'Single Family' },
    { value: 'CONDO', label: 'Condo' },
    { value: 'TOWNHOUSE', label: 'Townhouse' },
    { value: 'MULTI_FAMILY', label: 'Multi Family' },
    { value: 'LAND', label: 'Land' }
]

const BEDROOM_OPTIONS = [
    { value: '', label: 'Any' },
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
    { value: '5', label: '5+' }
]

const BATHROOM_OPTIONS = [
    { value: '', label: 'Any' },
    { value: '1', label: '1+' },
    { value: '1.5', label: '1.5+' },
    { value: '2', label: '2+' },
    { value: '2.5', label: '2.5+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' }
]

const SORT_OPTIONS = [
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'sqft_desc', label: 'SqFt: High to Low' },
    { value: 'sqft_asc', label: 'SqFt: Low to High' },
    { value: 'date_desc', label: 'Newest First' }
]

export default function FilterPanel({ filters, onFiltersChange, onSearch, loading }) {
    const updateFilter = (key, value) => {
        onFiltersChange({ ...filters, [key]: value })
    }

    return (
        <div style={{
            background: '#BFD3CE',
            border: '1px solid #91B7BE',
            borderRadius: '16px',
            padding: '16px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            marginBottom: '24px',
            fontFamily: "'Poppins', system-ui, -apple-system, sans-serif"
        }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                marginBottom: '16px'
            }}>
                <div>
                    <label style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: '500',
                        marginBottom: '4px',
                        color: '#6D98A5'
                    }}>
                        Location
                    </label>
                    <input
                        type="text"
                        value={filters.location || ''}
                        onChange={(e) => updateFilter('location', e.target.value)}
                        placeholder="City, State or ZIP"
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #91B7BE',
                            borderRadius: '8px',
                            fontSize: '14px',
                            backgroundColor: 'white',
                            color: '#333'
                        }}
                    />
                </div>

                <div>
                    <label style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: '500',
                        marginBottom: '4px',
                        color: '#6D98A5'
                    }}>
                        Min Price
                    </label>
                    <input
                        type="number"
                        value={filters.minPrice || ''}
                        onChange={(e) => updateFilter('minPrice', e.target.value)}
                        placeholder="No min"
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #91B7BE',
                            borderRadius: '8px',
                            fontSize: '14px',
                            backgroundColor: 'white',
                            color: '#333'
                        }}
                    />
                </div>

                <div>
                    <label style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: '500',
                        marginBottom: '4px',
                        color: '#6D98A5'
                    }}>
                        Max Price
                    </label>
                    <input
                        type="number"
                        value={filters.maxPrice || ''}
                        onChange={(e) => updateFilter('maxPrice', e.target.value)}
                        placeholder="No max"
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #91B7BE',
                            borderRadius: '8px',
                            fontSize: '14px',
                            backgroundColor: 'white',
                            color: '#333'
                        }}
                    />
                </div>

                <div>
                    <label style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: '500',
                        marginBottom: '4px',
                        color: '#6D98A5'
                    }}>
                        Property Type
                    </label>
                    <select
                        value={filters.propertyType || ''}
                        onChange={(e) => updateFilter('propertyType', e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #91B7BE',
                            borderRadius: '8px',
                            fontSize: '14px',
                            backgroundColor: 'white',
                            color: '#333'
                        }}
                    >
                        {PROPERTY_TYPES.map(type => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: '500',
                        marginBottom: '4px',
                        color: '#6D98A5'
                    }}>
                        Bedrooms
                    </label>
                    <select
                        value={filters.bedrooms || ''}
                        onChange={(e) => updateFilter('bedrooms', e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #91B7BE',
                            borderRadius: '8px',
                            fontSize: '14px',
                            backgroundColor: 'white',
                            color: '#333'
                        }}
                    >
                        {BEDROOM_OPTIONS.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: '500',
                        marginBottom: '4px',
                        color: '#6D98A5'
                    }}>
                        Bathrooms
                    </label>
                    <select
                        value={filters.bathrooms || ''}
                        onChange={(e) => updateFilter('bathrooms', e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #91B7BE',
                            borderRadius: '8px',
                            fontSize: '14px',
                            backgroundColor: 'white',
                            color: '#333'
                        }}
                    >
                        {BATHROOM_OPTIONS.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: '500',
                        marginBottom: '4px',
                        color: '#6D98A5'
                    }}>
                        Min SqFt
                    </label>
                    <input
                        type="number"
                        value={filters.minSqft || ''}
                        onChange={(e) => updateFilter('minSqft', e.target.value)}
                        placeholder="No min"
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #91B7BE',
                            borderRadius: '8px',
                            fontSize: '14px',
                            backgroundColor: 'white',
                            color: '#333'
                        }}
                    />
                </div>

                <div>
                    <label style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: '500',
                        marginBottom: '4px',
                        color: '#6D98A5'
                    }}>
                        Max SqFt
                    </label>
                    <input
                        type="number"
                        value={filters.maxSqft || ''}
                        onChange={(e) => updateFilter('maxSqft', e.target.value)}
                        placeholder="No max"
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #91B7BE',
                            borderRadius: '8px',
                            fontSize: '14px',
                            backgroundColor: 'white',
                            color: '#333'
                        }}
                    />
                </div>

                <div>
                    <label style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: '500',
                        marginBottom: '4px',
                        color: '#6D98A5'
                    }}>
                        Sort By
                    </label>
                    <select
                        value={filters.sortBy || 'price_desc'}
                        onChange={(e) => updateFilter('sortBy', e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #91B7BE',
                            borderRadius: '8px',
                            fontSize: '14px',
                            backgroundColor: 'white',
                            color: '#333'
                        }}
                    >
                        {SORT_OPTIONS.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div style={{ textAlign: 'right' }}>
                <button
                    onClick={onSearch}
                    disabled={loading}
                    style={{
                        background: '#6D98A5',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => {
                        if (!loading) e.target.style.background = '#91B7BE'
                    }}
                    onMouseOut={(e) => {
                        if (!loading) e.target.style.background = '#6D98A5'
                    }}
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>
        </div>
    )
}
