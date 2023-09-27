const { Country } = require('../db');
const { Op } = require('sequelize')

async function getCountryByName(req, res) {
    try {
        const { name } = req.query;
        const country = await Country.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        })
        if(!country || !country.length) res.status(404).send("No se encontraron paises");
        
        res.status(200).json(country);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = getCountryByName