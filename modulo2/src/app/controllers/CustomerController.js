const moment = require('moment');
const { Op } = require('sequelize');
const { User, Appointment } = require('../models');

class CustomerController{

    async index(req, res){

        const date = moment(parseInt(req.query.date));

        const appointments = await Appointment.findAll({    
            include: [{ model: User, as: 'user' }],
            where: {
                provider_id : req.session.user.id,
                date: {
                    [Op.between] : [
                        date.startOf("day").format(),
                        date.endOf("day").format()
                    ]
                }
            }
        }); 

       
        // appointments.map(a => {
        //     let hora = moment(a.date).format('H:mm');
        // });

       res.render('customers/index', {appointments});

    }

}

module.exports = new CustomerController();