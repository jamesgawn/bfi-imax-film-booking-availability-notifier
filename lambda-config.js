module.exports = {
	accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
	secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'],
	region: process.env['AWS_REGION'],
	handler: 'lambda.handler',
	role: process.env['AWS_LAMBDA_ROLE'],
	accountId: process.env['AWS_ACCOUNT_ID'],
	functionName: process.env['AWS_LAMBDA_NAME'],
	timeout: 10,
	memorySize: 128,
	publish: true,
	runtime: 'nodejs6.10'
};