# Chat Pickle
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/standard/semistandard)

## A Cucumber pattern for testing conversational flows against AWS Lex

Describe conversational flows using Gherkin syntax.

Run them as tests against the AWS Lex service to verify that those conversations work end to end.

### Getting Started

#### Setup a Lex Chatbot
This repo is designed to be pointed at the OrderFlowersBot as provided by AWS as a blueprint. To setup your OrderFlowersBot, follow the [AWS Docs Here](https://docs.aws.amazon.com/lex/latest/dg/gs-bp-create-bot.html).


#### Setup IAM Credentials
You will need to create IAM credentials that can invoke your bot. You can use the Amazon managed policies as shown below. You can either use these credentials with the Custom AWS Config steps below, or load them in your `.aws` directory.

![Lex Execution IAM Credentials](https://miro.medium.com/max/750/0*m55m6A95OcpcFRDa.png)


#### Custom AWS Config
The following code in `main_steps.js` will allow you to use custom AWS config settings. Currently region is set, but accessKey and secretKey are commented out.
```
AWS.config.update({
    accessKeyId: 'foo',
    secretAccessKey: 'bar',
    region: 'us-east-1'
});
```

#### Run
`npm test`

