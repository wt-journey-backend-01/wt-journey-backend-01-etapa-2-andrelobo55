const {v4: uuidv4} = require('uuid');

const agentes = []; // {id, nome, dataDeIncorporacao, cargo}

const createAgente = (nome, dataDeIncorporacao, cargo) => {
    const novoAgente = {
        id: uuidv4(),
        nome: nome,
        dataDeIncorporacao: dataDeIncorporacao,
        cargo: cargo
    }

    agentes.push(novoAgente);

    return novoAgente;
}

const findAll = () => {
    return agentes;
}

const findById = (id) => {
    const agente = agentes.find(a => a.id === id);

    return agente;
}

const completeUpdateAgente = (id, dataDeIncorporacao, cargo) => {
    const agente = findById(id);

    agente.dataDeIncorporacao = dataDeIncorporacao;
    agente.cargo = cargo;

    return agente;
}

const updateCargoAgente = (id, cargo) => {
    const agente = findById(id);

    agente.cargo = cargo;

    return agente;
}

const deleteAgente = () => {
    const agenteIndex = agentes.findIndex(a => a.id === id);

    return agentes.splice(agenteIndex, 1)[0];
}