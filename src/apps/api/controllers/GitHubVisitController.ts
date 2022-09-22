import { GitHubVisitService } from "../../../services/GitHubVisitService";

export class GitHubVisitController {
  #service;

  constructor() {
    this.#service = new GitHubVisitService();
  }

  getGitHubVisits = async (req: any, res: any, next: any) => {
    const { tipo } = req.body;
    const result = await this.#service.getGitHubVisits(tipo);

    return res.status(result.status).json({
      result: result.msg,
    });
  };
}
