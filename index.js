'use strict';

/**
 * @param {Number} statusCode Status code to set for entire response
 * @param {Object|Object[]} errors
 * @param {String} requestId
 * @return {String} Stringified JSON API compatible error response
 */
exports.format = (statusCode, errors, requestId) => {
	errors = [].concat(errors);

	errors = errors.map((error) => {
		const errorObject = {
			title: error.message,
			id: String(requestId)
		};

		if (error.httpStatusCode) {
			errorObject.status = Number(error.httpStatusCode);
		}

		if (error.meta) {
			errorObject.meta = error.meta;
		}

		return errorObject;
	});

	return JSON.stringify({
		meta: {
			httpStatusCode: Number(statusCode)
		},
		errors: errors
	});
};
