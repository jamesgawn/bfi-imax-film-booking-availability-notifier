const bunyan = require('bunyan');

exports.handler = function (event, context, callback) {
	let log = bunyan.createLogger({name: 'lambda-example', requestId: context.awsRequestId});

	log.info({
		event: event,
		context: context
	});

	try {

		log.info('Hello World');
		callback(null, 'Hello World');

	} catch (err) {

		log.error(err, 'Fatal Error');

	}
};