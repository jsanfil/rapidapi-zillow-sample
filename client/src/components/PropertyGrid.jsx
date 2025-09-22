import PropertyCard from './PropertyCard'

export default function PropertyGrid({ properties, loading }) {
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
