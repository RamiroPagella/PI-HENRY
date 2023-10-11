const { Activity, Country } = require('../db');

async function getActivities (req, res) {
    try {
    
        const activities = await Activity.findAll({
            include: [
                {
                    model: Country,
                    through: 'CountryXactivity',
                    attributes: ['name'],
                    as: 'countries'
                }
            ]
        });

        if (!activities.length) res.status(200).json([]);
        else {


            const activitiesToSend = activities.map(activity => ({
                id: activity.id,
                name: activity.name,
                difficulty: activity.difficulty,
                duration: activity.duration,
                season: activity.season,
                countries: activity.countries.map(country => country.name)
            }));

            res.status(200).json(activitiesToSend);
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message);
    }
}

module.exports = getActivities;