const { Country } = require('../db')

async function getCountries(req, res) {
    try {
        const countries = await Country.findAll();
        if (!countries.length) throw new Error("Error al intentar extraer los paises de la base de datos");
        res.status(200).json(countries);
    } catch (error) {
        res.status(404).send(error.message);
    }
}

module.exports = getCountries;