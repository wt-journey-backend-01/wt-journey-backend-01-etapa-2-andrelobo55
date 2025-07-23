const {v4: uuidv4} = require('uuid');

const casos = []; // {id, titulo, descricao, status, agente_id}

// Função que cria um novo caso e adiciona ao array de casos
const createCaso = (titulo, descricao, status, agente_id) => {
    const novoCaso = {
        id: uuidv4(),
        titulo: titulo,
        descricao: descricao,
        status: status,
        agente_id: agente_id
    }

    casos.push(novoCaso);

    return novoCaso;
}

// Função que retorna todos os casos
const findAll = () => {
    return casos;
}

// Função que retorna um caso específico de acordo com seu id
const findById = (id) => {
    return casos.find(c => c.id === id);
}

// Função que busca o caso com id específico e muda todos os dados, exceto id's
const completeUpdateCaso = (id, titulo, descricao, status) => {
    const caso = findById(id);
    
    caso.titulo = titulo;
    caso.descricao = descricao;
    caso.status = status;

    return caso;
}

// Função que busca o caso com id específico e muda apenas o título
const updateTituloCaso = (id, titulo) => {
    const caso = findById(id);

    caso.titulo = titulo;

    return caso;
}

// Função que busca o caso com id específico e deleta-o
const deleteCaso = (id) => {
    const casoIndex = casos.findIndex(id);

    return casos.splice(casoIndex, 1)[0];
}