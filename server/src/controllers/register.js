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
            
            if (user) return res.status(400).json({userAlreadyExists: true});

            else await User.create({...req.body});
            res.status(200).json({created: true});
        }
        else res.status(400).json({missingData: true})

    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = register;