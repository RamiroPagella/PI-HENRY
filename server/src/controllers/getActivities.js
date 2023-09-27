const { Activity } = require('../db');

async function getActivities (req, res) {
    try {

        const activities = await Activity.findAll();
        if (!activities.length) res.status(400).send("No hay actividades creadas");
        else res.status(200).json(activities);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = getActivities;