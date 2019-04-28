module.exports = {
	profile: process.env["AWS_PROFILE"],
	region: process.env['AWS_REGION'],
	handler: 'lambda.handler',
	role: process.env['AWS_LAMBDA_ROLE'],
	accountId: process.env['AWS_ACCOUNT_ID'],
	functionName: process.env['AWS_LAMBDA_NAME'],
	timeout: 10,
	memorySize: 128,
	publish: true,
	runtime: 'nodejs8.10'
};