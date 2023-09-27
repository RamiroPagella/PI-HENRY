const { Country } = require('../db');

async function getCountryByID(req, res) {
    try {
        const { id } = req.params;
        const country = await Country.findByPk(id);
        if (!country) throw new Error("No existe el pais especificado");
        
        res.status(200).json(country);
        
        //falta incluir las actividades turisticas (todavia no se de donde salen)

    } catch (error) {
        res.status(404).send(error.message);
    }
}

module.exports = getCountryByID;