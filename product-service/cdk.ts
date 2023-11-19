import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
// import { HttpLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
// import { HttpApi, HttpMethod, CorsHttpMethod } from "@aws-cdk/aws-apigatewayv2-alpha";
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
// import * as lambda from 'aws-cdk-lib/aws-lambda';


const app = new cdk.App();

const stack = new cdk.Stack(app, 'CdkRsAwsShopBE', {
    env: { region: 'eu-west-1' },
});

// const getProductsListLambdaFunction = new cdk.aws_lambda_nodejs.NodejsFunction(stack, 'get-products-list-lambda', {
//     runtime: cdk.aws_lambda.Runtime.NODEJS_20_X,
//     functionName: 'getProductsList',
//     entry: './handlers/getProductsList/index.ts',
//     handler: 'getProductsList',
//     // environment: { PRODUCT_AWS_REGION: 'eu-west-1' },
//     bundling: {
//       sourceMap: true,
//       minify: true,
//     },
//     description: 'Get products list Lambda',
//     environment: {
//       NODE_OPTIONS: '--enable-source-maps',
//       PRODUCT_AWS_REGION: 'eu-west-1',
//     },
//     logRetention: cdk.aws_logs.RetentionDays.ONE_DAY,
//     // Default value
//     memorySize: 128,
//     // Default value
//     timeout: cdk.Duration.seconds(3),
// });
const getProductsListLambdaFunction = new lambda.Function(stack, 'getProductsList', {
    runtime: lambda.Runtime.NODEJS_20_X,
    handler: 'index.getProductsList',
    code: lambda.Code.fromAsset('handlers/getProductsList'),
});

const apiGW = new apigateway.LambdaRestApi(stack, 'product-service', {
    handler: getProductsListLambdaFunction,
    proxy: false,
});

const products = apiGW.root.addResource('products');
products.addMethod('GET');

// const product = apiGW.root.addResource('{product}');
// products.addMethod('GET');

app.synth();
// new deployment.BucketDeployment(stack, 'DeployWebApp', {
//     destinationBucket: bucket,
//     sources: [deployment.Source.asset('./dist')],
//     distribution: cloudfront,
//     distributionPaths: ['/*'],
// });

// new cdk.CfnOutput(stack, 'Domain URL', {
//     value: cloudfront.distributionDomainName,
// });