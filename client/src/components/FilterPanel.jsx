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

const PRICE_MIN_OPTIONS = [
    { value: '', label: 'Any' },
    { value: '100000', label: '$100,000' },
    { value: '200000', label: '$200,000' },
    { value: '300000', label: '$300,000' },
    { value: '400000', label: '$400,000' },
    { value: '500000', label: '$500,000' },
    { value: '600000', label: '$600,000' },
    { value: '700000', label: '$700,000' },
    { value: '800000', label: '$800,000' },
    { value: '900000', label: '$900,000' },
    { value: '1000000', label: '$1,000,000' },
    { value: '1250000', label: '$1,250,000' },
    { value: '1500000', label: '$1,500,000' },
    { value: '1750000', label: '$1,750,000' },
    { value: '2000000', label: '$2,000,000' },
    { value: '2500000', label: '$2,500,000' },
    { value: '3000000', label: '$3,000,000' },
    { value: '4000000', label: '$4,000,000' },
    { value: '5000000', label: '$5,000,000+' }
]

const PRICE_MAX_OPTIONS = [
    { value: '', label: 'Any' },
    { value: '200000', label: '$200,000' },
    { value: '250000', label: '$250,000' },
    { value: '300000', label: '$300,000' },
    { value: '400000', label: '$400,000' },
    { value: '500000', label: '$500,000' },
    { value: '600000', label: '$600,000' },
    { value: '700000', label: '$700,000' },
    { value: '800000', label: '$800,000' },
    { value: '900000', label: '$900,000' },
    { value: '1000000', label: '$1,000,000' },
    { value: '1250000', label: '$1,250,000' },
    { value: '1500000', label: '$1,500,000' },
    { value: '1750000', label: '$1,750,000' },
    { value: '2000000', label: '$2,000,000' },
    { value: '2500000', label: '$2,500,000' },
    { value: '3000000', label: '$3,000,000' },
    { value: '4000000', label: '$4,000,000' },
    { value: '5000000', label: '$5,000,000+' }
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
                    <select
                        value={filters.minPrice || ''}
                        onChange={(e) => updateFilter('minPrice', e.target.value)}
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
                        {PRICE_MIN_OPTIONS.map(option => (
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
                        Max Price
                    </label>
                    <select
                        value={filters.maxPrice || ''}
                        onChange={(e) => updateFilter('maxPrice', e.target.value)}
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
                        {PRICE_MAX_OPTIONS.map(option => (
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
