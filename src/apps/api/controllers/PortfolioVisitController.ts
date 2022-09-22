import { PortfolioVisitService } from "../../../services/PortfolioVisitService";

export class PortfolioVisitController {
  #service;

  constructor() {
    this.#service = new PortfolioVisitService();
  }

  getPortfolioVisits = async (req: any, res: any, next: any) => {
    const { tipo } = req.body;
    const result = await this.#service.getPortfolioVisits(tipo);

    return res.status(result.status).json({
      result: result.msg,
    });
  };
}
