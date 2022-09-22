import express from "express";
import { PortfolioVisitController } from "../controllers/PortfolioVisitController";

const router = express.Router();
const _controller = new PortfolioVisitController();

router.get("/portfoliovisits", _controller.getPortfolioVisits);

export default router;
