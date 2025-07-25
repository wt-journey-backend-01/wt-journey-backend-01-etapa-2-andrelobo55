const casosRepository = require("../repositories/casosRepository");
const agentesRepository = require("../repositories/agentesRepository");

class APIError extends Error {
    constructor(status, message) {
        super(message),
            this.status = status,
            this.name = "API Error"
    }
}

const getAllCasos = (req, res, next) => {
    const casos = casosRepository.findAllCasos();

    res.status(200).json(casos);
}

const getCasoById = (req, res, next) => {
    try {
        const { id } = req.params;
        const caso = casosRepository.findCasoById(id);

        if (!caso) {
            return next(new APIError(404, "Caso não encontrado"));
        }

        res.status(200).json(caso);
    } catch (error) {
        next(error);
    }
}

const createCaso = (req, res, next) => {
    try {
        const { titulo, descricao, status, agente_id } = req.body;

        if (!titulo) {
            return next(new APIError(400, "Campo 'titulo' deve ser preenchido"));
        }

        if (!descricao) {
            return next(new APIError(400, "Campo 'descricao' deve ser preenchido"));
        }

        if (!['aberto', 'solucionado'].includes(status)) {
            return next(new APIError(400, "Campo 'status' deve ser 'aberto' ou 'solucionado'"));
        }

        if (!agente_id) {
            return next(new APIError(400, "Campo 'agente_id' deve ser preenchido"));
        }

        const agenteId = agentesRepository.findAgenteById(agente_id);

        if (!agenteId) {
            return next(new APIError(404, "Agente não encontrado"));
        }

        const caso = casosRepository.createCaso(titulo, descricao, status, agente_id);

        res.status(201).json(caso);
    } catch (error) {
        next(error);
    }
}

const completeUpdateCaso = (req, res, next) => {
    try {
        const { id } = req.params;
        const caso = casosRepository.findCasoById(id);

        if (!caso) {
            return next(new APIError(404, "Caso não encontrado"));
        }

        const { titulo, descricao, status } = req.body;

        if (!titulo) {
            return next(new APIError(400, "Campo 'titulo' deve ser preenchido"));
        }

        if (!descricao) {
            return next(new APIError(400, "Campo 'descricao' deve ser preenchido"));
        }

        if (!['aberto', 'solucionado'].includes(status)) {
            return next(new APIError(400, "Campo 'status' deve ser 'aberto' ou 'solucionado'"));
        }

        const casoAtualizado = casosRepository.completeUpdateCaso(id, titulo, descricao, status);

        res.status(200).json(casoAtualizado);
    } catch (error) {
        next(error);
    }
}

const updateTituloCaso = (req, res, next) => {
    try {
        const { id } = req.params;
        const caso = casosRepository.findCasoById(id);

        if (!caso) {
            return next(new APIError(404, "Caso não encontrado"));
        }

        const { titulo } = req.body;

        if (!titulo) {
            return next(new APIError(400, "Campo 'titulo' deve ser preenchido"));
        }

        const casoAtualizado = casosRepository.updateTituloCaso(id, titulo);

        res.status(200).json(casoAtualizado);
    } catch (error) {
        next(error);
    }
}

const deleteCaso = (req, res, next) => {
    try {
        const { id } = req.params;
        const caso = casosRepository.findCasoById(id);

        if (!caso) {
            return next(new APIError(404, "Caso não encontrado"));
        }

        casosRepository.deleteCaso(id);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllCasos,
    getCasoById,
    createCaso,
    completeUpdateCaso,
    updateTituloCaso,
    deleteCaso
}