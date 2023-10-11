const { Country, Activity } = require('../db');

async function getCountryByID(req, res) {
    try {
        const { id } = req.params;
        const country = await Country.findOne({
            where: { id },
            include: [
                {
                    model: Activity,
                    through: 'CountryXActivity',
                    attributes: ['id', 'name', 'difficulty', 'duration', 'season'],
                    as: 'activities'
                }
            ]
        })
        
        if (!country) throw new Error("No existe el pais especificado");

        res.status(200).json(country);
        
    } catch (error) {
        res.status(404).send(error.message);
    }
}

module.exports = getCountryByID;