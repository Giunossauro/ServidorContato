import { Request, Response, NextFunction } from "express";
import { ContatoService } from "../../../services/ContatoService";

//tirar o id?
/*
interface ContatoRequest {
	id: number,
	nome: string,
	email: string,
	tel: string,
	msg: string
} */

export class ContatoController {
  #service;

  constructor() {
    this.#service = new ContatoService();
  }

  getContatos = async (req: any, res: any, next: any) => {
    const { senha } = req.body;
    
    if (senha === process.env.SENHA_GET) {
      const result = await this.#service.getContatos();

      return res.status(result.status).json({
        result: result.msg,
      });
    }

    return res.status(400).json({
      result: "ERRO: Senha incorreta."
    });
  };

  getContatoById = async (req: any, res: any, next: any) => {
    const { id } = req.params;
    const { senha } = req.body;

    if (!id || !Number(id)) {
      return res.status(400).json({ result: "ERRO: ID inválido." });
    }

    if (senha === process.env.SENHA_GET) {
      const result = await this.#service.getContatoById(
        Number(id)
      );

      return res.status(result.status).json({
        result: result.msg,
      });
    }

    return res.status(400).json({
      result: "ERRO: Senha incorreta."
    });
  };

  getContatosByName = async (req: any, res: any, next: any) => {
    const { query } = req.query;
    const { senha } = req.body;


    if (query && senha === process.env.SENHA_GET) {
      const result = await this.#service.getContatosByName(query.toString());

      return res.status(result.status).json({
        result: result.msg,
      });
    }

    return res.status(400).json({
      result: query? "ERRO: Nome do aluno não informado." : "ERRO: Senha incorreta."
    });
  };

  getContatoByEmail = async (req: any, res: any, next: any) => {
    const { query } = req.query;
    const { senha } = req.body;

    if (query && senha === process.env.SENHA_GET) {
      const emailPattern = query
        .toString()
        .match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g);

      if (!emailPattern) {
        return res
          .status(400)
          .json({ result: "ERRO: Padrão de email inválido." });
      }

      const result = await this.#service.getContatoByEmail(
        query.toString()
      );

      return res.status(result.status).json({
        result: result.msg,
      });
    }
    return res.status(400).json({
      result: query ? "ERRO: Nome do aluno não informado." : "ERRO: Senha incorreta."
    });
  };

  addContatos = async (req: any, res: any, next: any) => {
    const { nome, email, tel, msg } = req.body;

    if (nome == "" || email == "" || tel == "" || msg == "") {
      return res
        .status(400)
        .json({ result: "ERRO: Confira e preencha todos os campos." });
    }

    if (
      nome.length > 60 ||
      email.length > 60 ||
      tel.length > 14 ||
      msg.length > 1000
    ) {
      return res
        .status(400)
        .json({ result: "ERRO: Número máximo de caracteres excedido." });
    }

    const emailPattern = email.match(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g
    );

    if (!emailPattern) {
      return res
        .status(400)
        .json({ result: "ERRO: Padrão de email inválido." });
    }

    const result = await this.#service.addContato(
      String(nome),
      String(email),
      String(tel),
      String(msg)
    );

    return res.status(result.status).json({
      result: result.msg,
    });
  };

  updateContato = async (req: any, res: any, next: any) => {
    const { id } = req.params;
    const { nome = "", email = "", tel = "", msg = "", senha } = req.body;

    if (!id || !Number(id)) {
      return res.status(400).json({ result: "ERRO: ID inválido." });
    }

    if (
      nome.length > 60 ||
      email.length > 60 ||
      tel.length > 14 ||
      msg.length > 1000
    ) {
      return res
        .status(400)
        .json({ result: "ERRO: Número máximo de caracteres excedido." });
    }

    const emailPattern = email.match(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g
    );

    if (email != "" && !emailPattern) {
      return res.status(400).json({ result: "ERRO: Email inválido." });
    }

    if (senha === process.env.SENHA_GET) {

      const result = await this.#service.updateContato(
        Number(id),
        String(nome),
        String(email),
        String(tel),
        String(msg)
      );

      return res.status(result.status).json({
        result: result.msg,
      });
    }

    return res.status(400).json({
      result: "ERRO: Senha incorreta."
    });
  };

  removeContato = async (req: any, res: any, next: any) => {
    const { id } = req.params;
    const { senha } = req.body;

    if (!id || !Number(id)) {
      return res.status(400).json({ result: "ERRO: ID inválido." });
    }

    if (senha === process.env.SENHA_GET) {

      const result = await this.#service.removeContato(Number(id));

      return res.status(result.status).json({
        result: result.msg,
      });
    }

    return res.status(400).json({
      result: "ERRO: Senha incorreta."
    });
  };
}
