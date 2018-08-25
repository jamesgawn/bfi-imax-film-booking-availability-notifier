const bunyan = require('bunyan');
const Helper = require('./lib/Helper');
const DynamoDBHelper = require('./lib/DynamoDBHelper');
const Twitter = require('twitter');
const axios = require('axios');

exports.handler = function (event, context, callback) {
	let log = bunyan.createLogger({name: 'lambda-example', requestId: context.awsRequestId});
	let dbHelper = new DynamoDBHelper(log, process.env['DynamoDB_Film_Table_Name']);
	let twitter = new Twitter({
		consumer_key: process.env.TWITTER_CONSUMER_KEY,
		consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
		access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
		access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
	});

	log.info({
		event: event,
		context: context
	});

	try {

		axios
			.get('http://www.odeon.co.uk/api/uk/v2/cinemas/cinema/211/filmswithdetails.json?format=json')
			.then(rawBFIImaxFilms => {

				let latestFilms = rawBFIImaxFilms.data;

				let filmsToProcess = [];

				for (let film of latestFilms) {

					let filmProcessor = new Promise(function(resolve, reject) {

						dbHelper.getFilmById(film.masterId).then((data) => {

							// Check if the film has not been seen before.
							if (Object.keys(data).length === 0) {
								log.info({message: 'Film ' + film.masterId + ' not found, ', film});

								dbHelper.insertFilm(film).then(() => {

									let tweet = film.title + ' is now available for booking! For more details go to https://www.odeon.co.uk/films/book/' + film.masterId + '/';

									twitter.post('statuses/update', {status: tweet}, (error) => {

										if (error) {
											log.error('Failed to tweet about ' + film.masterId, film);
											reject(error);
										}
										else
										{
											log.info('Tweeted about new film' + film.masterId, film);
											resolve('Posted new film available for booking: ' + film.title);
										}
									});

								}).catch(err => {

									reject(err);

								});
							}
							else
							{
								resolve('Film already live: ' + film.title);
							}

						}).catch(err => {
							reject(err);
						});

					}.bind({film: film}));

					filmsToProcess.push(filmProcessor);
				}

				Promise.all(filmsToProcess).then((response) => {
					callback(null, 'Complete');
				}).catch(errs => {
					Helper.logFatalError(log, callback, errs, 'Failed to process films.');
				})

			})
			.catch(error => {
				Helper.logFatalError(log, callback, error, 'Failed to retrieve film listings');
			});

	} catch (err) {
		Helper.logFatalError(log, callback, err, 'Fatal Error');
	}
};