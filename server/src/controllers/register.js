const { User } = require('../db');
const { Op } = require('sequelize')

async function register (req, res) {
    try {
        const { name, email, password } = req.body;

        if (name && email && password) {
            const user = await User.findOne({
                where: {
                    email: {[Op.eq]: email}
                }
            })
            
            if (user) res.status(400).send('Ya hay un usuario asociado con ese correo electronico');

            else await User.create({...req.body});
            res.status(200).send('El usuario fue creado correctamente');
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = register;