Lambda Error Formatter
======================

Helper function for formatting errors in AWS Lambda functions for easy integration with AWS API Gateway.

Usage
-----

    npm install --save @aptoma/lambda-error-formmtter

```js

const errorFormatter = require('@aptoma/lambda-error-formatter');

exports.handler = (event, context, callback) => {
	try {
		throw new Error('Oops');
	} catch (e) {
		callback(errorFormatter.format(500, e, context.awsRequestId));
	}
};

```

API Gateway Response Integration
--------------------------------

In your API Gateway, you should register Method Responses for all the error codes you intend to use.

For each error code, you must create an Integration Response:

Provide a Lambda Error Regex like `(.*)httpStatusCode\":400(.*)`, and set up a body mapping template for `application/json`:

    $util.parseJson($input.json('$.errorMessage'))
