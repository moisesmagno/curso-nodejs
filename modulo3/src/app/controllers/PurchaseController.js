const User = require("../models/user");
const Ad = require('../models/Ad');
const Mail = require('../services/Mail');
const PurchaseMail = require('../jobs/PurchaseMail');
const Queue = require('../services/Queue');

class PurchaseController{

    async store(req, res){

        const { ad, content } = req.body;

        const purchaseAd = await Ad.findById(ad).populate('author');
        const user = await User.findById(req.userId);

        Queue.create(PurchaseMail.key, {
            ad: purchaseAd,
            user,
            content
        }).save();

        return res.json({ sednMail: true});
    }

}

module.exports = new PurchaseController();
