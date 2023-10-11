const { Activity, Country } = require('../db');
const { Op } = require('sequelize');

async function postActivity (req, res) {

    try {
        const activityData = req.body;

        const { name, difficulty, duration, season, countries} = activityData;
        
        if (!name || !difficulty || !duration || !season || !countries || !countries.length ||
            name.length > 20 || difficulty < 1 || difficulty > 5 ||
            !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(duration) ||
            season !== "Verano" && season !== "Otoño" && season !== "Invierno" && season !== "Primavera"
        ) return res.status(400);

        if (countries && Array.isArray(countries)) {
            const countryNames = countries;
            
            const activity = await Activity.create({name, difficulty, duration, season});

            for (let c of countryNames) {
                //se asume que ninguno sera undefined porque se verifica antes de enviarse el formulario
                let country = await Country.findOne({
                    where: {
                        name: {
                            [Op.eq]: c
                        }
                    }
                });
                country.addActivity(activity); // camiar. agregar pais a actividad
            }

        } 

        res.status(200).send("Operacion completada con exito");
    
    } catch (error) {
        console.log(error)
        res.status(500).send("Error al crear la actividad: " + error.message);
    }

}

module.exports = postActivity