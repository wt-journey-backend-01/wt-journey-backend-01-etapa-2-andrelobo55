const express = require('express');
const casosController = require("../controllers/casosController");
const router = express.Router();

/** 
 * @swagger
 * tags:
 *   - name: Casos
 *     description: Gerenciamento de casos de Polícia
*/

/** 
 * @swagger
 * /casos:
 *   get:
 *     summary: Listar todos casos
 *     tags: [Casos]
 *     responses:
 *       200:
 *         description: Listar todos os casos
*/
router.get("/", casosController.getAllCasos);

/**
 * @swagger
 * /casos/{id}:
 *   get:
 *     summary: Listar um caso específico pelo id
 *     tags: [Casos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Caso retornado com sucesso
 *       404:
 *         description: Caso não encontrado
 */
router.get("/:id", casosController.getCasoById);

/** 
 * @swagger
 * /casos:
 *   post:
 *     summary: Criar um caso
 *     tags: [Casos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [titulo, descricao, status, agente_id]
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               status:
 *                 type: string
 *               agente_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Caso criado com sucesso
 *       400:
 *         description: Campo não preenchido ou vazio.
 */
router.post("/", casosController.createCaso);

/**
 * @swagger
 * /casos/{id}:
 *   put:
 *     summary: Atualizar um caso específico pelo id
 *     tags: [Casos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [titulo, descricao, status, agente_id]
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               status:
 *                 type: string
 *               agente_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Caso atualizado com sucesso
 *       404:
 *         description: Caso não encontrado
 */
router.put("/:id", casosController.completeUpdateCaso);

/**
 * @swagger
 * /casos/{id}:
 *   patch:
 *     summary: Atualizar o titulo de um caso específico pelo id
 *     tags: [Casos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [titulo]
 *             properties:
 *               titulo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Titulo de caso atualizado com sucesso
 *       404:
 *         description: Caso não encontrado ou campo não preenchido
 */
router.patch("/:id", casosController.updatePartial);

/**
 * @swagger
 * /casos/{id}:
 *   delete:
 *     summary: Deletar um caso específico pelo id
 *     tags: [Casos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Caso deletado com sucesso
 *       404:
 *         description: Caso não encontrado
 */
router.delete("/:id", casosController.deleteCaso);

module.exports = router;