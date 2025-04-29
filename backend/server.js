import express from "express";
import dotenv from "dotenv";
dotenv.config();
import path from "path";

import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";
import authRoutes from "./routes/auth.route.js";



const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); // allows us to accept JSON data in the req.body
console.log("MONGO_URI:", process.env.MONGO_URI);  // Check if the URI is loaded correctly


app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));  // Corrected to 'dist'
	app.get("*", (req, res) => {
	  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));  // Corrected to 'dist'
	});
  }
  
app.listen(PORT, () => {
	connectDB();
	console.log("Server started at http://localhost:" + PORT);
});
