import * as db from "../database/connection";

export class PortfolioVisitService {
  getPortfolioVisits = async (tipo: any) => {
    try {
      if (Number(tipo) !== 1)
        await db.default("visitscounter").update({auxportfolio: 0});
      const allPortfolioVisits = await db.default.select("*").from("visitscounter");
      return {
        status: 200,
        msg: allPortfolioVisits,
      };
    } catch (_e) {
      console.log(_e);
      return {
        status: 500,
        msg: "ERRO: Falha no servidor ao consultar os PortfolioVisits.",
      };
    }
  };
}
