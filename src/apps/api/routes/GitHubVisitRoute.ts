import express from "express";
import { GitHubVisitController } from "../controllers/GitHubVisitController";

const router = express.Router();
const _controller = new GitHubVisitController();

router.get("/githubvisits", _controller.getGitHubVisits);

export default router;
