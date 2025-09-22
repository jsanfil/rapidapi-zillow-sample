export default function PropertyCard({ property }) {
    const formatPrice = (price) => {
        if (!price) return 'Price TBD'
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price)
    }

    const formatSqft = (sqft) => {
        if (!sqft) return ''
        return new Intl.NumberFormat('en-US').format(sqft)
    }

    return (
        <div style={{
            background: '#BFD3CE',
            border: '1px solid #91B7BE',
            borderRadius: '16px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            fontFamily: "'Poppins', system-ui, -apple-system, sans-serif"
        }}
            onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.06)'
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)'
            }}
            onClick={() => property.permalink && window.open(property.permalink, '_blank')}
        >
            {/* Image */}
            <div style={{
                width: '100%',
                height: '192px',
                position: 'relative',
                background: '#F5F5F5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}>
                {property.imgSrc ? (
                    <img
                        src={property.imgSrc}
                        alt={property.address}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                        onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextSibling.style.display = 'flex'
                        }}
                    />
                ) : null}
                <div style={{
                    display: property.imgSrc ? 'none' : 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#999',
                    fontSize: '14px',
                    textAlign: 'center',
                    padding: '20px'
                }}>
                    <div style={{ fontSize: '48px', marginBottom: '8px' }}>🏠</div>
                    <div>No Image Available</div>
                </div>
            </div>

            {/* Content */}
            <div style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
            }}>
                {/* Location */}
                <div style={{
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#6D98A5',
                    fontWeight: '500'
                }}>
                    {property.address?.split(',')[1]?.trim() || 'Location'}
                </div>

                {/* Title/Address */}
                <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#6D98A5',
                    margin: '0',
                    lineHeight: '1.3'
                }}>
                    {property.address?.split(',')[0] || property.address}
                </h3>

                {/* Price */}
                <p style={{
                    color: '#6D98A5',
                    fontSize: '16px',
                    fontWeight: '500',
                    margin: '0'
                }}>
                    {formatPrice(property.price)}
                </p>

                {/* Details */}
                <p style={{
                    fontSize: '14px',
                    color: '#64748B',
                    margin: '0'
                }}>
                    {property.beds && `${property.beds} bd`} • {property.baths && `${property.baths} ba`} • {property.sqft && `${formatSqft(property.sqft)} sqft`}
                </p>

                {/* Property Type */}
                {property.propertyType && (
                    <div style={{
                        display: 'inline-block',
                        background: '#F1F5F9',
                        color: '#6D98A5',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '500',
                        textTransform: 'capitalize'
                    }}>
                        {property.propertyType.toLowerCase().replace('_', ' ')}
                    </div>
                )}

                {/* Button */}
                <button
                    style={{
                        width: '100%',
                        padding: '8px 16px',
                        border: '1px solid #6D98A5',
                        background: 'transparent',
                        color: '#6D98A5',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        marginTop: '4px'
                    }}
                    onMouseOver={(e) => {
                        e.target.style.background = 'rgba(217, 163, 145, 0.3)'
                    }}
                    onMouseOut={(e) => {
                        e.target.style.background = 'transparent'
                    }}
                    onClick={(e) => {
                        e.stopPropagation()
                        property.permalink && window.open(property.permalink, '_blank')
                    }}
                >
                    View on Zillow
                </button>
            </div>
        </div>
    )
}
