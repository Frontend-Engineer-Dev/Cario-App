import express from "express";
import cors from "cors";
import { config } from "dotenv";
import chatRouter from "./src/routes/chat.js";

// App config
const app = express();
config();

//App middleware
app.use(cors());
app.use(express.json());

// App Routes
app.use("/api", chatRouter);

// Server listen
const PORT = process.env.PORT || 3001;
const BASE_URL = process.env.BASE_URL;

app.listen(PORT, (err) => {
  if (err) {
    return process.exit(1);
  }

  console.log(`App running on ${BASE_URL}`);
});
