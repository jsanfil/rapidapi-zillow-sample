import { useState } from 'react'
import FilterPanel from './components/FilterPanel'
import PropertyGrid from './components/PropertyGrid'

const API = 'http://localhost:4000'

export default function App() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    location: 'Carlsbad, CA',
    minPrice: '',
    maxPrice: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    minSqft: '',
    maxSqft: '',
    sortBy: 'price_desc'
  })

  async function search() {
    setLoading(true)
    try {
      // Build query parameters, filtering out empty values
      const queryParams = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          // Map client filter names to server parameter names
          const paramMap = {
            location: 'location',
            minPrice: 'minPrice',
            maxPrice: 'maxPrice',
            propertyType: 'propertyType',
            bedrooms: 'bedrooms',
            bathrooms: 'bathrooms',
            minSqft: 'minSqft',
            maxSqft: 'maxSqft',
            sortBy: 'sortBy'
          }
          const paramName = paramMap[key] || key
          queryParams.set(paramName, value)
        }
      })

      const response = await fetch(`${API}/api/search?${queryParams.toString()}`)
      const data = await response.json()
      setProperties(data.items || [])
    } catch (error) {
      console.error('Search failed:', error)
      setProperties([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#E4DDD7',
      fontFamily: "'Poppins', system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
      padding: '20px'
    }}>
      {/* Google Fonts Link */}
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '600',
          color: '#6D98A5',
          marginBottom: '20px',
          letterSpacing: '-0.025em'
        }}>
          New Home Search
        </h1>

        <FilterPanel
          filters={filters}
          onFiltersChange={setFilters}
          onSearch={search}
          loading={loading}
        />

        <PropertyGrid
          properties={properties}
          loading={loading}
          filters={filters}
        />
      </div>
    </div>
  )
}
