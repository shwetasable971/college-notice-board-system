import express from "express";
import dotenv from "dotenv";
import noticeRoutes from "./routes/notice.routes.js";
import connectDB from "./config/db.js";
import cors from "cors";
import dns from "node:dns/promises";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// DNS fix (for MongoDB Atlas)
dns.setServers(["1.1.1.1", "8.8.8.8"]);

app.use(cors({
  // origin: "http://localhost:5173"
}));

app.use(express.json());

app.use("/notices", noticeRoutes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`http://localhost:${port}/notices`);
  });
});