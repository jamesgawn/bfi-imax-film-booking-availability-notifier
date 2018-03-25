const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const fs = require('fs');
const path = require('path');
chai.use(require('sinon-chai'));

let lambda = require('../lambda');

describe('example lambda', function() {

	beforeEach(function () {
		callback = sinon.stub();
	});

	describe('handler', function() {
		it('successfully completes', function(done) {
			event = JSON.parse(fs.readFileSync(path.join(__dirname + '/data/example-event.json')), 'utf8');
			context = JSON.parse(fs.readFileSync(path.join(__dirname + '/data/example-context.json')), 'utf8');

			lambda.handler(event, context, function(foo, bar) {
				expect(foo).to.equal(null);
				expect(bar).to.equal('Hello World');
				done();
			});
		});

	});

});