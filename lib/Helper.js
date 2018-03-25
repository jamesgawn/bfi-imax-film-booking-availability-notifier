class Helper {
	static logFatalError(logger, callback, err, message) {
		logger.error(err, message);
		callback(err, message)
	}
}

module.exports = Helper;