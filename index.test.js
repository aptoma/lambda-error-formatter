'use strict';

const subject = require('./index');
const assert = require('chai').assert;

describe('Lambda Error Formatter', () => {
	it('should format an error', () => {
		const error = new Error('Something went wrong');
		const actual = subject.format(500, error, 'foo');

		const expected = JSON.stringify({
			meta: {
				httpStatusCode: 500
			},
			errors: [{
				title: 'Something went wrong',
				id: 'foo'
			}]
		});
		assert.deepEqual(actual, expected);
	});

	it('should accept array of errors', () => {
		const actual = subject.format(500, [
			new Error('Something went wrong'),
			new Error('Something else went wrong')
		], 'foo');

		const expected = JSON.stringify({
			meta: {
				httpStatusCode: 500
			},
			errors: [{
				title: 'Something went wrong',
				id: 'foo'
			},
			{
				title: 'Something else went wrong',
				id: 'foo'
			}],
		});
		assert.deepEqual(actual, expected);
	});

	it('should read httpStatusCode and meta object from error if present', () => {
		const error = new Error('Something went wrong');
		error.httpStatusCode = 404;
		error.meta = {
			bar: true
		};

		const actual = subject.format(400, error, 123);

		const expected = JSON.stringify({
			meta: {
				httpStatusCode: 400
			},
			errors: [{
				title: 'Something went wrong',
				id: '123',
				status: 404,
				meta: {
					bar: true
				}
			}]
		});
		assert.deepEqual(actual, expected);
	});
});
