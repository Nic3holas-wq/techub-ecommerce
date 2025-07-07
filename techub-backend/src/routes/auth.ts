import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db"; // Your PostgreSQL connection
import dotenv from "dotenv";

dotenv.config();

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

// Signup Route
router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { name, email, phonenumber, password } = req.body;

    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (name, email, phonenumber, password) VALUES ($1, $2, $3, $4) RETURNING id, name, email, phonenumber",
      [name, email, phonenumber, hashedPassword]
    );

    const token = jwt.sign({ id: result.rows[0].id }, JWT_SECRET, { expiresIn: "1d" });

    return res.status(201).json({ user: result.rows[0], token });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ error: "Signup failed" });
  }
});

// Signin Route
router.post("/signin", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      const user = result.rows[0];
  
      if (!user) return res.status(401).json({ error: "Invalid credentials" });
  
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(401).json({ error: "Invalid credentials" });
  
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1d" });
  
      return res.json({
        user: { id: user.id, name: user.name, email: user.email, phonenumber: user.phonenumber },
        token,
      });
    } catch (error) {
      console.error("Signin error:", error);
      return res.status(500).json({ error: "Signin failed" });
    }
  });
  

export default router;
