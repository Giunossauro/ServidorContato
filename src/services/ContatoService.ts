import * as db from "../database/connection";

export class ContatoService {
  getContatos = async () => {
    try {
      const allContatos = await db.default.select("*").from("contatos");
      return {
        status: 200,
        msg: allContatos,
      };
    } catch (_e) {
      console.log(_e);
      return {
        status: 500,
        msg: "ERRO: Falha no servidor ao consultar os Contatos.",
      };
    }
  };

  getContatoById = async (id: number) => {
    try {
      const ContatoById = await db.default
        .select("*")
        .from("contatos")
        .where({ id: id });

      if (!ContatoById.length) {
        return {
          status: 404,
          msg: "ERRO: Contato não encontrado.",
        };
      }

      return { status: 200, msg: ContatoById };
    } catch (_e) {
      return {
        status: 500,
        msg: "ERRO: Falha no servidor ao consultar o Contato.",
      };
    }
  };

  getContatosByName = async (query: any) => {
    try {
      const findContato = await db
        .default("contatos")
        .whereRaw(`UPPER(nome) LIKE '%${query.toUpperCase()}%'`);

      if (!findContato.length) {
        return {
          status: 404,
          msg: "ERRO: Nenhum Contato não encontrado.",
        };
      }

      return { status: 200, msg: findContato };
    } catch (_e) {
      return {
        status: 500,
        msg: "ERRO: Falha no servidor ao consultar os Contatos.",
      };
    }
  };

  getContatoByEmail = async (query: any) => {
    try {
      const findContato = await db
        .default("contatos")
        .whereRaw(`UPPER(email) = '${query.toUpperCase()}'`);

      if (!findContato.length) {
        return {
          status: 404,
          msg: "ERRO: Nenhum Contato não encontrado.",
        };
      }

      return { status: 200, msg: findContato };
    } catch (_e) {
      return {
        status: 500,
        msg: "ERRO: Falha no servidor ao consultar os Contatos.",
      };
    }
  };

  addContato = async (
    nome: string,
    email: string,
    tel: string,
    msg: string
  ) => {
    try {
      const findContato = await db.default
        .select("*")
        .from("contatos")
        .where({ email: email });

      if (findContato.length) {
        return {
          status: 409,
          msg: "ERRO: Falha ao cadastrar Contato. Verifique email e tel.",
        };
      }
    } catch (_e) {
      return {
        status: 500,
        msg: "ERRO: Falha no servidor ao consultar se o Contato ja existe.",
      };
    }

    const newUser = {
      nome: nome,
      email: email,
      tel: tel,
      msg: msg,
    };

    try {
      await db.default("contatos").insert(newUser);
      return {
        status: 201,
        msg: "Contato criado com sucesso!",
      };
    } catch (_e) {
      return {
        status: 500,
        msg: "ERRO: Algo errado aconteceu na hora de inserir o Contato.",
      };
    }
  };

  updateContato = async (
    id: number,
    nome: string,
    email: string,
    tel: string,
    msg: string
  ) => {
    let findContato;
    try {
      findContato = await db.default("contatos").select("*").where({ id: id });

      if (!findContato.length) {
        return { status: 404, msg: "ERRO: ID não encontrado." };
      }
    } catch (_e) {
      return {
        status: 500,
        msg: "ERRO: Falha no servidor ao consultar se o Contato ja existe.",
      };
    }

    const findContatoEmail = (await this.getContatoByEmail(email))
      .msg;

    if (findContato.length <= 0) {
      return { status: 404, msg: "ERRO: ID não encontrado." };
    }

    if (findContatoEmail.length) {
      return { status: 409, msg: "ERRO: Email já existe." };
    }

    const updatedUser = {
      nome: nome != "" ? nome : findContato[0].nome,
      email: email != "" ? email : findContato[0].email,
      tel: tel != "" ? tel : findContato[0].tel,
      msg: msg != "" ? msg : findContato[0].msg,
    };

    try {
      await db.default("contatos").where({ id: id }).update(updatedUser);
      return {
        status: 201,
        msg: "Contato alterado com sucesso!",
      };
    } catch (_e) {
      return {
        status: 500,
        msg: "ERRO: Algo errado aconteceu na hora de alterar o Contato.",
      };
    }
  };

  removeContato = async (id: number) => {
    let findContato;
    try {
      findContato = await db.default
        .select("*")
        .from("contatos")
        .where({ id: id });

      if (!findContato.length) {
        return { status: 404, msg: "ERRO: ID não encontrado." };
      }
    } catch (_e) {
      return {
        status: 500,
        msg: "ERRO: Falha no servidor ao consultar se o Contato ja existe.",
      };
    }

    try {
      await db.default("contatos").where({ id: id }).delete();

      return { status: 204, msg: "Contato excluído com sucesso!" };
    } catch (_e) {
      return {
        status: 500,
        msg: "ERRO: Algo errado aconteceu na hora de excluir o Contato.",
      };
    }
  };
}
