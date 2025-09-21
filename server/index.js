import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const { RAPIDAPI_KEY, RAPIDAPI_HOST, ZILLOW_SEARCH_PATH = "/search", PORT = 4000 } = process.env;

const app = express();
app.use(cors());

app.get("/api/search", async (req, res) => {
  const { location = "Carlsbad, CA", min, max } = req.query;
  try {
    const base = `https://${RAPIDAPI_HOST}${ZILLOW_SEARCH_PATH}`;
    const url = new URL(base);
    url.searchParams.set("location", location);
    if (min) url.searchParams.set("price_min", String(min));
    if (max) url.searchParams.set("price_max", String(max));
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
      const permalink = item.detailUrl ? (item.detailUrl.startsWith('http') ? item.detailUrl : `https://www.zillow.com${item.detailUrl}`) : item.url ? (item.url.startsWith('http') ? item.url : `https://www.zillow.com${item.url}`) : (id ? `https://www.zillow.com/homedetails/${id}_zpid/` : null);
      return { id, address, city, state, price, beds, baths, sqft, permalink };
    });
    console.log('Processed items:', items);

    res.json({ items });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "server_error" });
  }
});

app.listen(PORT, () => console.log(`[server] http://localhost:${PORT}`));
