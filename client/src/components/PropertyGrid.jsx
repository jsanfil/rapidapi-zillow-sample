import PropertyCard from './PropertyCard'

const formatFilterLabel = (key, value) => {
    const labels = {
        location: 'Location',
        minPrice: 'Min Price',
        maxPrice: 'Max Price',
        home_type: 'Property Type',
        bedsMin: 'Bedrooms',
        bathsMin: 'Bathrooms',
        sqftMin: 'Min SqFt',
        sqftMax: 'Max SqFt',
        sort: 'Sort By'
    }

    const label = labels[key] || key

    if (value === '' || value === null || value === undefined) return null

    // Format value
    if (key === 'minPrice' || key === 'maxPrice') {
        return `${label}: $${value.toLocaleString()}`
    }
    if (key === 'sqftMin' || key === 'sqftMax') {
        return `${label}: ${value} SqFt`
    }
    if (key === 'bedsMin' || key === 'bathsMin') {
        return `${label}: ${value}+`
    }
    if (key === 'home_type') {
        const typeLabels = {
            Houses: 'Houses',
            Townhomes: 'Townhomes',
            'Apartments_Condos_Co-ops': 'Apartments/Condos/Co-ops',
            'Multi-family': 'Multi-family',
            LotsLand: 'Lots/Land',
            Manufactured: 'Manufactured'
        }
        return `${label}: ${typeLabels[value] || value}`
    }
    if (key === 'sort') {
        const sortLabels = {
            Price_High_Low: 'Price: High to Low',
            Price_Low_High: 'Price: Low to High',
            Square_Feet: 'SqFt: High to Low',
            Newest: 'Newest First',
            Bedrooms: 'Bedrooms: High to Low',
            Bathrooms: 'Bathrooms: High to Low',
            Lot_Size: 'Lot Size: High to Low'
        }
        return `${label}: ${sortLabels[value] || value}`
    }
    return `${label}: ${value}`
}

export default function PropertyGrid({ properties, loading, filters }) {
    if (loading) {
        return (
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px',
                padding: '20px 0'
            }}>
                {/* Loading Skeletons */}
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} style={{
                        background: '#BFD3CE',
                        border: '1px solid #91B7BE',
                        borderRadius: '16px',
                        boxShadow: '0 12px 32px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)',
                        overflow: 'hidden',
                        animation: 'pulse 1.5s ease-in-out infinite'
                    }}>
                        <div style={{
                            width: '100%',
                            height: '192px',
                            background: '#F0F0F0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                background: '#E0E0E0',
                                borderRadius: '8px'
                            }}></div>
                        </div>
                        <div style={{
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px'
                        }}>
                            <div style={{
                                height: '11px',
                                background: '#F0F0F0',
                                borderRadius: '4px',
                                width: '40%'
                            }}></div>
                            <div style={{
                                height: '18px',
                                background: '#F0F0F0',
                                borderRadius: '4px',
                                width: '80%'
                            }}></div>
                            <div style={{
                                height: '16px',
                                background: '#F0F0F0',
                                borderRadius: '4px',
                                width: '60%'
                            }}></div>
                            <div style={{
                                height: '14px',
                                background: '#F0F0F0',
                                borderRadius: '4px',
                                width: '70%'
                            }}></div>
                            <div style={{
                                height: '32px',
                                background: '#F0F0F0',
                                borderRadius: '6px',
                                width: '100%'
                            }}></div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (!properties || properties.length === 0) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: '#6D98A5',
                fontSize: '18px',
                fontFamily: "'Poppins', system-ui, -apple-system, sans-serif"
            }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>🏠</div>
                <div>No properties found matching your criteria.</div>
                <div style={{ fontSize: '14px', marginTop: '8px', color: '#91B7BE' }}>
                    Try adjusting your search filters to see more results.
                </div>
            </div>
        )
    }

    return (
        <div>
            {/* Active Filters */}
            <div style={{ marginBottom: '20px' }}>
                <h3 style={{
                    color: '#6D98A5',
                    fontSize: '16px',
                    fontWeight: '500',
                    marginBottom: '8px',
                    fontFamily: "'Poppins', system-ui, -apple-system, sans-serif"
                }}>
                    Active Filters:
                </h3>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px'
                }}>
                    {Object.entries(filters).map(([key, value]) => {
                        const formatted = formatFilterLabel(key, value)
                        return formatted ? (
                            <span key={key} style={{
                                background: '#BFD3CE',
                                color: '#6D98A5',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                fontFamily: "'Poppins', system-ui, -apple-system, sans-serif"
                            }}>
                                {formatted}
                            </span>
                        ) : null
                    })}
                </div>
            </div>

            {/* Results Count */}
            <div style={{
                marginBottom: '20px',
                color: '#6D98A5',
                fontSize: '16px',
                fontWeight: '500',
                fontFamily: "'Poppins', system-ui, -apple-system, sans-serif"
            }}>
                Found {properties.length} propert{properties.length === 1 ? 'y' : 'ies'}
            </div>

            {/* Property Grid */}
            <div className="property-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px',
                padding: '20px 0'
            }}>
                {properties.map(property => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>
        </div>
    )
}

// Add CSS animation for loading skeletons
const style = document.createElement('style')
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }
`
document.head.appendChild(style)
