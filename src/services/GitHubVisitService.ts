import * as db from "../database/connection";

export class GitHubVisitService {
  getGitHubVisits = async (tipo: any) => {
    try {
      if (Number(tipo) !== 1)
        await db.default("visitscounter").update({auxgithub: 0});
      const allGitHubVisits = await db.default.select("*").from("visitscounter");
      return {
        status: 200,
        msg: allGitHubVisits,
      };
    } catch (_e) {
      console.log(_e);
      return {
        status: 500,
        msg: "ERRO: Falha no servidor ao consultar os GitHubVisits.",
      };
    }
  };
}
