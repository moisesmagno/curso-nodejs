const kue = require('kue');
const redisConfig = require('../../config/redis');
const jobs = require('../jobs');
const Sentry = require('@sentry/node');

//Configura a conexeão com o Redis
const queue = kue.createQueue({ redisConfig });

queue.process(jobs.PurchaseMail.key, jobs.PurchaseMail.handle);
queue.on('error', Sentry.captureException);

module.exports = queue;
