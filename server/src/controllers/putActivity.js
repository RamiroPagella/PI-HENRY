const { CountryXactivity, Country, Activity} = require('../db');

async function putActivity (req, res) {
    try {
        const {activityID, countryName} = req.body;

        const country = await Country.findOne({where: {name: countryName}});
        const relation = await CountryXactivity.findOne({
            where: {
                CountryId: country.id,
                ActivityId: activityID
            }
        })
        if (relation) {
            await relation.destroy();
            res.status(200).json({put: true});
        }
        else res.status(400);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


module.exports = putActivity;