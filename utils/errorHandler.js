const getAllCasos = (req, res, next) => {
    let casos = casosRepository.findAllCasos();

    const { status } = req.query;
    if (status) {
        casos = casos.filter(c => c.status === status);
    }

    res.status(200).json(casos);
}