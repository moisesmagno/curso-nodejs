const kue = require('kue');
const redisConfig = require('../../config/redis');
const jobs = require('../jobs');

//Configura a conexeão com o Redis
const queue = kue.createQueue({ redisConfig });

queue.process(jobs.PurchaseMail.key, jobs.PurchaseMail.handle);

module.exports = queue;
