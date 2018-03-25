const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const fs = require('fs');
const path = require('path');
const chaiAsPromised = require("chai-as-promised");

chai.use(require('sinon-chai'));
chai.use(chaiAsPromised);

const DynamoDBHelper = require('../../lib/DynamoDBHelper');

describe('DynamoDBHelperTests', function() {

	let dbHelper;

	beforeEach(function () {
		 dbHelper = new DynamoDBHelper('BFIFilms');
	});

	describe('getFilm', function() {
		it('successfully retrieves valid film', function(done) {
			return expect(dbHelper.getFilmById(123)).to.eventually.deep.equal({
				"Item": {
					"masterId": 123,
					"title": "test title"
				}
			}).notify(done);
		});

		it('successfully responds for missing film', function(done) {
			return expect(dbHelper.getFilmById(-123)).to.eventually.deep.equal({}).notify(done);
		})
	});

});