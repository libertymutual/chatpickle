# Chat Pickle

## A Cucumber Pattern for testing full Lex Conversation Flows

Describe conversation flows using Gherkin syntax

Run those tests against the AWS Lex service

### Getting Started

#### Setup a Lex Bot
This repo is designed to be pointed at the OrderFlowersBot as provided by AWS as a blueprint. To setup your OrderFlowersBot, follow the [AWS Docs Here](https://docs.aws.amazon.com/lex/latest/dg/gs-bp-create-bot.html).


#### Setup IAM Credentials
You will need to create IAM credentials that can invoke your bot. You can use the Amazon managed policies as shown below. You can either use these credentials with the Custom AWS Config steps beflow, or load them in your `.aws` directory. 
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

