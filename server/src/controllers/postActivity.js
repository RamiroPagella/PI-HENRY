const { Activity, Country } = require('../db');
const { Op } = require('sequelize');

async function postActivity (req, res) {

    try {
        const activityData = req.body;
        const countryNames = activityData.countries;
        delete activityData.countries;

        const activity = await Activity.create(activityData);
        
        if (Array.isArray(countryNames)) {

            for (let c of countryNames) {
                //se asume que ninguno sera undefined porque se verifica antes de enviarse el formulario
                let [ country ] = await Country.findAll({
                    where: {
                        name: {
                            [Op.eq]: c
                        }
                    }
                });

                country.addActivity(activity);

            }

        } else {

            let [ country ] = await Country.findAll({
                where: {
                    name: {
                        [Op.eq]: countryNames
                    }
                }
            });

            country.addActivity(activity);
        }

        res.status(200).send("Operacion completada con exito");
    
    } catch (error) {
        res.status(500).send("Error al crear la actividad: " + error.message);
    }

}

module.exports = postActivity