import { Router } from "express";
import { chatController } from "../controllers/chatController.js";

// App Router config
const chatRouter = Router();

// Routes
chatRouter.post("/chat", chatController);

export default chatRouter;
