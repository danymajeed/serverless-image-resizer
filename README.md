# Serverless Image Resizer

## Requirements

- Node.js v14.x
- AWS CLI
- Serverless Framework

## Getting Started

##### 1. Clone the repository:

`git clone https://github.com/your-username/image-resizer.git`
`cd image-resizer`

##### 2. Install dependencies:

`npm install`

##### 3. Copy the example environment file and update the values:

`cp .env.example .env`

Update the S3_BUCKET_NAME value in the .env file to your desired S3 bucket name.

##### 4. Deploy the application:

`serverless deploy`

This command will package and deploy your serverless application on AWS. You should see the output of CloudFormation stack creation along with your serverless endpoints once the deployment is successful.

## Usage

After deploying the application, you can access the image resizer using the CloudFront distribution endpoint. The CloudFront distribution URL will be available in the CloudFormation stack output after the deployment.

To get an image with the specified key, send a GET request to the CloudFront distribution URL with the key as the path parameter. You can also pass w and h query parameters to resize the image to the desired width and height.

For example:
`https://your-cloudfront-distribution-url.cloudfront.net/{key}?w=100&h=100`
This will return the resized image with a width and height of 100 pixels.
