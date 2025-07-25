const isValidDate = (dateString) => {
    // Regex para YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;

    const date = new Date(dateString);
    const now = new Date();

    if (isNaN(date.getTime())) return false; // data inválida
    if (date > now) return false; // data no futuro

    return true;
}

module.exports = isValidDate;