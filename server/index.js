import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const { RAPIDAPI_KEY, RAPIDAPI_HOST, ZILLOW_SEARCH_PATH = "/search", PORT = 4000 } = process.env;

const app = express();
app.use(cors());

app.get("/api/search", async (req, res) => {
  const {
    location = "Carlsbad, CA",
    minPrice,
    maxPrice,
    propertyType,
    bedrooms,
    bathrooms,
    minSqft,
    maxSqft,
    sortBy = "price_desc"
  } = req.query;

  try {
    const base = `https://${RAPIDAPI_HOST}${ZILLOW_SEARCH_PATH}`;
    const url = new URL(base);
    url.searchParams.set("location", location);

    // Price filters
    if (minPrice) url.searchParams.set("price_min", String(minPrice));
    if (maxPrice) url.searchParams.set("price_max", String(maxPrice));

    // Property type filter
    if (propertyType) url.searchParams.set("property_type", propertyType);

    // Bedroom filter (minimum bedrooms)
    if (bedrooms) url.searchParams.set("beds_min", String(bedrooms));

    // Bathroom filter (minimum bathrooms)
    if (bathrooms) url.searchParams.set("baths_min", String(bathrooms));

    // Square footage filters
    if (minSqft) url.searchParams.set("sqft_min", String(minSqft));
    if (maxSqft) url.searchParams.set("sqft_max", String(maxSqft));

    // Sort options
    if (sortBy) {
      switch (sortBy) {
        case 'price_desc':
          url.searchParams.set("sort", "price_desc");
          break;
        case 'price_asc':
          url.searchParams.set("sort", "price_asc");
          break;
        case 'sqft_desc':
          url.searchParams.set("sort", "sqft_desc");
          break;
        case 'sqft_asc':
          url.searchParams.set("sort", "sqft_asc");
          break;
        case 'date_desc':
          url.searchParams.set("sort", "date_desc");
          break;
        default:
          url.searchParams.set("sort", "price_desc");
      }
    }

    console.log('Request URL:', url.toString());

    const r = await fetch(url, {
      headers: { "X-RapidAPI-Key": RAPIDAPI_KEY, "X-RapidAPI-Host": RAPIDAPI_HOST }
    });
    console.log('Response status:', r.status);
    const data = await r.json();
    console.log('Raw response data:', data);

    const list = Array.isArray(data?.results) ? data.results
      : Array.isArray(data?.data) ? data.data
        : Array.isArray(data?.props) ? data.props
          : [];

    const items = list.map(item => {
      const id = item.zpid || item.id || String(Math.random());
      const price = item.price || item.listPrice || item.list_price;
      const beds = item.bedrooms || item.beds;
      const baths = item.bathrooms || item.baths;
      const sqft = item.livingArea || item.sqft || item.area;
      const address = item.address || item.streetAddress || item.street || "";
      const city = item.city || "";
      const state = item.state || "";
      const propertyType = item.propertyType;
      const imgSrc = item.imgSrc;
      const permalink = item.detailUrl ? (item.detailUrl.startsWith('http') ? item.detailUrl : `https://www.zillow.com${item.detailUrl}`) : item.url ? (item.url.startsWith('http') ? item.url : `https://www.zillow.com${item.url}`) : (id ? `https://www.zillow.com/homedetails/${id}_zpid/` : null);
      return { id, address, city, state, price, beds, baths, sqft, propertyType, imgSrc, permalink };
    });
    console.log('Processed items:', items);

    res.json({ items });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "server_error" });
  }
});

app.listen(PORT, () => console.log(`[server] http://localhost:${PORT}`));
