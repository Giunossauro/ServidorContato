import express from "express";
import { ContatoController } from "../controllers/ContatoController";

const router = express.Router();
const _controller = new ContatoController();

router.get("/contatos", _controller.getContatos);
router.get("/contatos/:id", _controller.getContatoById);
router.get("/busca/contatos/nome", _controller.getContatosByName);
router.get("/busca/contatos/email", _controller.getContatoByEmail);
router.post("/contatos", _controller.addContatos);
router.put("/contatos/:id", _controller.updateContato);
router.delete("/contatos/:id", _controller.removeContato);

export default router;
