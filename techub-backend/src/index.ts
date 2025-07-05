import express, { Request, Response } from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = 5000;

app.use(cors());

interface Product {
  id: number;
  title: string;
  brand: string;
  price: number;
  category: string;
  rating: number;
  images: string[];
}

interface DummyJsonResponse {
  products: Product[];
}

const transformProduct = (product: Product) => ({
  id: product.id,
  name: product.title,
  brand: product.brand,
  price: product.price,
  category: product.category,
  rating: product.rating,
  image: product.images[0],
  specs: {
    ram: "8GB", // dummy values for display
    storage: "256GB",
    battery: "5000mAh"
  }
});


// Utility to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  return array
    .map(item => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

// 📦 GET laptops and smartphones only
app.get("/api/products", async (req: Request, res: Response) => {
  try {
    const response = await axios.get<DummyJsonResponse>("https://dummyjson.com/products?limit=1000");
    const allProducts = response.data.products;

    const filtered = allProducts.filter((product) =>
      product.category === "smartphones" || product.category === "laptops"
    );

    res.json(filtered);
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.get("/api/search", async (req: Request, res: Response): Promise<void> => {
  const query = (req.query.q as string || '').toLowerCase();

  if (!query) {
    res.json([]);
    return;
  }

  try {
    const response = await axios.get<DummyJsonResponse>("https://dummyjson.com/products?limit=100");
    const allProducts = response.data.products;

    // Only include smartphones and laptops
    const relevantProducts = allProducts.filter(product =>
      product.category === "smartphones" || product.category === "laptops" || product.category === "tablets"
    );

    // Now apply the search filter
    const filtered = relevantProducts.filter(product =>
      product.title?.toLowerCase().includes(query) ||
      product.brand?.toLowerCase().includes(query) ||
      product.category?.toLowerCase().includes(query)
    );

    res.json(filtered);
  } catch (error) {
    console.error("Search failed:", error);
    res.status(500).json({ error: "Search failed" });
  }
});




app.get("/api/products/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await axios.get<Product>(`https://dummyjson.com/products/${id}`);
    const product = response.data;
    //const transformed = transformProduct(product);
    res.json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(404).json({ error: "Product not found" });
  }
});


// 📱 Get all smartphones
app.get("/api/phones", async (_req: Request, res: Response) => {
  try {
    const response = await axios.get<DummyJsonResponse>(
      "https://dummyjson.com/products/category/smartphones?limit=50"
    );
    const phones = response.data.products.map(transformProduct);
    res.json(phones);
  } catch (error) {
    console.error("Error fetching phones:", error);
    res.status(500).json({ error: "Failed to fetch phones" });
  }
});

// 💻 Get all laptops
app.get("/api/laptops", async (_req: Request, res: Response) => {
  try {
    const response = await axios.get<DummyJsonResponse>(
      "https://dummyjson.com/products/category/laptops?limit=50"
    );
    const laptops = response.data.products.map(transformProduct);
    console.log("Laptops fetched:", laptops.length);
    res.json(laptops);
  } catch (error) {
    console.error("Error fetching laptops:", error);
    res.status(500).json({ error: "Failed to fetch laptops" });
  }
});

//get all tablets
app.get("/api/tablets", async (_req: Request, res: Response) => {
    try {
      const response = await axios.get<DummyJsonResponse>(
        "https://dummyjson.com/products/category/tablets"
      );
      const tablets = response.data.products.map(transformProduct);
      console.log("Tablets fetched:", tablets.length);
      res.json(tablets);
    } catch (error) {
      console.error("Error fetching tablets:", error);
      res.status(500).json({ error: "Failed to fetch tablets" });
    }
  });

// 🧾 Get top rated (phones + laptops)
app.get("/api/top-rated", async (_req: Request, res: Response) => {
  try {
    const [phonesRes, laptopsRes] = await Promise.all([
      axios.get<DummyJsonResponse>("https://dummyjson.com/products/category/smartphones?limit=5"),
      axios.get<DummyJsonResponse>("https://dummyjson.com/products/category/laptops?limit=5")
    ]);

    const allProducts = [
      ...phonesRes.data.products.map(transformProduct),
      ...laptopsRes.data.products.map(transformProduct)
    ];

    // Shuffle and select only 5
    const mixedProducts = shuffleArray(allProducts).slice(0, 5);

    res.json(mixedProducts);
  } catch (error) {
    console.error("Error fetching all products:", error);
    res.status(500).json({ error: "Failed to fetch all products" });
  }
});

// 🧾 Get top rated (phones + laptops)
app.get("/api/top-picks", async (_req: Request, res: Response) => {
  try {
    const [phonesRes, laptopsRes] = await Promise.all([
      axios.get<DummyJsonResponse>("https://dummyjson.com/products/category/smartphones?limit=5"),
      axios.get<DummyJsonResponse>("https://dummyjson.com/products/category/laptops?limit=5")
    ]);

    const allProducts = [
      ...phonesRes.data.products.map(transformProduct),
      ...laptopsRes.data.products.map(transformProduct)
    ];

    // Shuffle and select only 5
    const mixedProducts = shuffleArray(allProducts).slice(0, 15);

    res.json(mixedProducts);
  } catch (error) {
    console.error("Error fetching all products:", error);
    res.status(500).json({ error: "Failed to fetch all products" });
  }
});

app.get("/api/all-products", async (_req: Request, res: Response) => {
  try {
    const [phonesRes, laptopsRes] = await Promise.all([
      axios.get<DummyJsonResponse>("https://dummyjson.com/products/category/smartphones?limit=3"),
      axios.get<DummyJsonResponse>("https://dummyjson.com/products/category/laptops?limit=5")
    ]);

    const allProducts = [
      ...phonesRes.data.products.map(transformProduct),
      ...laptopsRes.data.products.map(transformProduct)
    ];

    res.json(allProducts);
  } catch (error) {
    console.error("Error fetching all products:", error);
    res.status(500).json({ error: "Failed to fetch all products" });
  }
});



// const phoneHandler = async (req: Request, res: Response): Promise<void> => {
//     try {
//       const { id } = req.params;
//       const response = await axios.get<Product>(`https://dummyjson.com/products/${id}`);
//       const product = response.data;
  
//       if (product.category !== "smartphones") {
//         return res.status(404).json({ error: "Phone not found" });
//       }
  
//       res.json(transformProduct(product));
//     } catch (error) {
//       console.error("Error fetching phone by ID:", error);
//       res.status(500).json({ error: "Failed to fetch phone" });
//     }
//   };
  
//   app.get("/api/phones/:id", phoneHandler);
  
  


app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
