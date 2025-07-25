const agentesRepository = require("../repositories/agentesRepository");
const isValidDate = require("../utils/validDate");

class APIError extends Error {
    constructor(status, message) {
        super(message),
            this.status = status,
            this.name = "API Error"
    }
}

const getAllAgentes = (req, res, next) => {
    const agentes = agentesRepository.findAllAgentes();

    res.status(200).json(agentes);
}

const getAgenteById = (req, res, next) => {
    try {
        const { id } = req.params;
        const agente = agentesRepository.findAgenteById(id);

        if (!agente) {
            return next(new APIError(404, "Agente não encontrado."));
        }

        res.status(200).json(agente);
    }
    catch (error) {
        next(error);
    }
}

const createAgente = (req, res, next) => {
    try {
        const { nome, dataDeIncorporacao, cargo } = req.body;

        if (!nome) {
            return next(new APIError(400, "Campo 'nome' deve ser preenchido"));
        }

        if (!dataDeIncorporacao) {
            return next(new APIError(400, "Campo 'dataDeIncorporacao' deve ser preenchido"));
        }

        if (!isValidDate(dataDeIncorporacao)) {
            return next(new APIError(400, "Campo 'dataDeIncorporacao' inválido ou no futuro"));
        }

        if (!cargo) {
            return next(new APIError(400, "Campo 'cargo' deve ser preenchido"));
        }

        const agente = agentesRepository.createAgente(nome, dataDeIncorporacao, cargo);

        res.status(201).json(agente);
    }
    catch (error) {
        next(error);
    }
}

const completeUpdateAgente = (req, res, next) => {
    try {
        const { id } = req.params;
        const agente = agentesRepository.findAgenteById(id);

        if (!agente) {
            return next(new APIError(404, "Agente não encontrado"));
        }

        const { id: idBody, nome, dataDeIncorporacao, cargo } = req.body;

        if (idBody && idBody !== id) {
            return next(new APIError(400, "Não é permitido alterar o campo 'id'"));
        }

        if (!nome) {
            return next(new APIError(400, "Campo 'nome' deve ser preenchido"));
        }

        if (!dataDeIncorporacao) {
            return next(new APIError(400, "Campo 'dataDeIncorporacao' deve ser preenchido"));
        }

        if (!cargo) {
            return next(new APIError(400, "Campo 'cargo' deve ser preenchido"));
        }

        const agenteAtualizado = agentesRepository.completeUpdateAgente(id, nome, dataDeIncorporacao, cargo);

        res.status(200).json(agenteAtualizado);
    }
    catch (error) {
        next(error);
    }
}

const updateCargoAgente = (req, res, next) => {
    try {
        const { id } = req.params;
        const agente = agentesRepository.findAgenteById(id);

        if (!agente) {
            return next(new APIError(404, "Agente não encontrado"));
        }

        const { cargo } = req.body;

        if (!cargo) {
            return next(new APIError(400, "Campo 'cargo' deve ser preenchido"));
        }

        const agenteAtualizado = agentesRepository.updateCargoAgente(id, cargo);

        res.status(200).json(agenteAtualizado);
    }
    catch (error) {
        next(error);
    }
}

const deleteAgente = (req, res, next) => {
    try {
        const { id } = req.params;
        const agenteId = agentesRepository.findAgenteById(id);

        if (!agenteId) {
            return next(new APIError(404, "Agente não encontrado"));
        }

        agentesRepository.deleteAgente(id);

        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
}

module.exports = {
    getAllAgentes,
    getAgenteById,
    createAgente,
    completeUpdateAgente,
    updateCargoAgente,
    deleteAgente
}