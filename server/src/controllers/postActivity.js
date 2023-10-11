const { Activity, Country } = require('../db');
const { Op } = require('sequelize');

async function postActivity (req, res) {

    try {
        const activityData = req.body;

        const { name, difficulty, duration, season, countries} = activityData;
        
        if (!name.length || !difficulty || !duration || !season || !countries || !countries.length) return res.status(400).json({missingData: true});
       
        if (name.length > 25 || difficulty < 1 || difficulty > 5 || 
            !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(duration) || 
            season !== "Verano" && season !== "Otoño" && season !== "Invierno" && season !== "Primavera"
        ) return res.status(400).json({incorrectData: true})

        

        if (countries && Array.isArray(countries)) {
            const activityWithSameName = await Activity.findOne({where: {name: name}});
            if (activityWithSameName) return res.status(400).json({activityAlreadyExists: true})
            
            const activity = await Activity.create({name, difficulty, duration, season});
            for (let c of countries) {
                //se asume que ninguno sera undefined porque se verifica antes de enviarse el formulario
                let country = await Country.findOne({ where: {name: {
                    [Op.eq]: c
                }}});
                activity.addCountry(country); 
            }

        } 

        res.status(200).send("Operacion completada con exito");
    
    } catch (error) {
        console.log(error)
        res.status(500).send("Error al crear la actividad: " + error.message);
    }

}

module.exports = postActivity