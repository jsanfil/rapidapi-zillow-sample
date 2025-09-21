import { useEffect, useState } from 'react'
const API = 'http://localhost:4000'
export default function App() {
  const [items, setItems] = useState([])
  const [q, setQ] = useState({ location: 'Carlsbad, CA', min: 2000000, max: 4000000 })
  const [loading, setLoading] = useState(false)

  async function load() {
    setLoading(true)
    try {
      const params = new URLSearchParams(q).toString()
      const r = await fetch(`${API}/api/search?${params}`)
      const data = await r.json()
      setItems(data.items || [])
    } finally { setLoading(false) }
  }

  useEffect(() => { load() }, []) // initial

  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif' }}>
      <h1>RapidAPI Zillow Sample</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input value={q.location} onChange={e => setQ({ ...q, location: e.target.value })} />
        <input type="number" value={q.min} onChange={e => setQ({ ...q, min: e.target.value })} />
        <input type="number" value={q.max} onChange={e => setQ({ ...q, max: e.target.value })} />
        <button onClick={load}>Search</button>
      </div>
      {loading && <div>Loading…</div>}
      <table cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead><tr style={{ borderBottom: '1px solid #ddd' }}>
          <th>Address</th><th>Price</th><th>Beds</th><th>Baths</th><th>SqFt</th><th>Link</th>
        </tr></thead>
        <tbody>
          {items.map(x => (
            <tr key={x.id} style={{ borderBottom: '1px solid #eee' }}>
              <td>{[x.address, x.city, x.state].filter(Boolean).join(', ')}</td>
              <td>{x.price ? `$${Number(x.price).toLocaleString()}` : '—'}</td>
              <td>{x.beds ?? '—'}</td>
              <td>{x.baths ?? '—'}</td>
              <td>{x.sqft ? Number(x.sqft).toLocaleString() : '—'}</td>
              <td>{x.permalink
                    ? <a href={x.permalink} target="_blank" rel="noreferrer">Open</a>
                    : <span>—</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
