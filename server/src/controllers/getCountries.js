const { Country, Activity } = require('../db')

async function getCountries(req, res) {
    try {
        const countries = await Country.findAll({
            include: [
                {
                    model: Activity,
                    throught: 'CountryXactivity',
                    attributes: ['id', 'name', 'difficulty', 'duration', 'season'],
                    as: 'activities'
                }
            ]
        });
       
        if (!countries.length) throw new Error("Error al intentar extraer los paises de la base de datos");
        res.status(200).json(countries.sort((a, b) => a.name < b.name ? -1 : 1));
    } catch (error) {
        res.status(404).send(error.message);
    }
}

module.exports = getCountries;