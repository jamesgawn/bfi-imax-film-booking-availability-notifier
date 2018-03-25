const AWS = require("aws-sdk");

class DynamoDBHelper {
	constructor(log, tablename) {
		this.log = log;
		this.tablename = tablename;
		this.client = new AWS.DynamoDB.DocumentClient({
			convertEmptyValues: true
		});
	}

	getFilmById(id) {
		return new Promise((resolve, reject) =>
		{
			let params = {
				TableName: this.tablename,
				Key: {
					"masterId": id,
				}
			};

			this.log.info('Retrieving film: ' + id);

			this.client.get(params, (err, data) => {
				if (err) {
					this.log.error(err, 'Failed to add film ' + id);
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	}

	insertFilm(film) {
		return new Promise((resolve, reject) => {
			let params = {
				TableName: this.tablename,
				Item: film
			};

			this.log.info({message: 'Adding film: ' + film.masterId, film});

			this.client.put(params, (err, data) => {
				if (err) {
					this.log.error(err, 'Failed to add film ' + film.title);
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	}
}

module.exports = DynamoDBHelper;