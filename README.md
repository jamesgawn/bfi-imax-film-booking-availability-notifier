# AWS Lambda Function Javascript Template
A sample project with a template structure to speed up creating, testing, and publishing a lambda function. 

You can build and deploy this function using the gulpfile, and with the following environment variables set:

| Name | Description | Example |
| --- | --- | --- | 
| AWS_ACCOUNT_ID | The ID of the AWS account to which you wish deploy the lambda function. You can find your account ID on the My Account page in the [AWS console](https://console.aws.amazon.com/billing/home?#/account). | 4315135 |
| AWS_ACCESS_KEY_ID | The API access key ID for your AWS account.  | AKIAII7EGA43AW6DQJGQ |
| AWS_SECRET_ACCESS_KEY | The AWS secret key for your AWS account. | dnsVBvK4F13rh0rMFUwiefIbKe/xGd2JPjDT |
| AWS_LAMBDA_ROLE | The IAM role to assign to the lambda function upon publication. | arn:aws:iam::4315135:role/SimpleLambdaFunctionRole |
| AWS_LAMBDA_NAME | The name to assign the lambda function upon publication. | SampleLambda |
| AWS_REGION | The region to publish the function in. See [region list for more options.](https://docs.aws.amazon.com/general/latest/gr/rande.html) | eu-west-2 |

You can find out [how to obtain your AWS API access credentials here](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html).
