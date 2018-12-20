const User = require("../models/user");
const Ad = require('../models/Ad');
const Mail = require('../services/Mail');

class PurchaseController{

    async store(req, res){

        const { ad, content } = req.body;

        const purchaseAd = await Ad.findById(ad).populate('author');
        const user = await User.findById(req.userId);

        await Mail.sendMail({
            from: '"gonode3" <gonode3@gmail.com>',
            to: purchaseAd.author.email,
            subject: `Solicitação de compra - ${purchaseAd.title}`,
            html: `<h2>Olá ${purchaseAd.author.name}</h2><br><p>Você tem uma solicitação de compra do produto <strong> ${purchaseAd.title} </strong> por parte de <strong>${user.name}</strong>. <br><br>Segue a observação enviada pelo interessado: <br> ${content}<p>`
        });

        return res.json({ sednMail: true});
    }

}

module.exports = new PurchaseController();
