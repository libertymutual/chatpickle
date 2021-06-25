# AWS Lex Example

This sample project, [examples/lex](./) and [examples/lexVoice](./), is designed to be pointed at the OrderFlowers and ScheduleAppointment bots as provided by AWS as a blueprint.
[examples/lex](./) uses the lex postText to post user responses and [examples/lexVoice](./) uses the lex postContent.

Using the lexVoice, we can post audio content as the user response. Please take a look at [examples/lexVoice/chatpickle/schedule-appointment-bot.feature](./) where the audio file name is listed as the user response. Only pcm files are supported. We can also add mp3 and mpeg support in the future if needed.

### Create a config file

You need a [chatpickle.config.json](chatpickle.config.json) (or .js) in the root of your node.js project and it should be formatted like the example provided.

### Create a chatpickle/ folder
You also need a [chatpickle/](chatpickle) folder in the root of your project.  This is where you will put your gherkin feature files which can leverage the extended chatpickle syntax.

### Setup a Lex Chatbot
To setup your own OrderFlowers and ScheduleAppointment bots from a blueprint in your AWS account, follow this [AWS Lex Guide](https://docs.aws.amazon.com/lex/latest/dg/gs-bp-create-bot.html).

Or if you want to get started with chatpickling a custom lex bot,  alter your project's chatpickle config; see example at [chatpickle.config.json](chatpickle.config.json) 

### Setup IAM Credentials
You will need to create IAM credentials that can invoke your bot. You can use the Amazon managed policies as shown below. Load them in your `.aws` directory or follow this [AWS CLI Configure Guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html).

![Lex Execution IAM Credentials](https://miro.medium.com/max/750/0*m55m6A95OcpcFRDa.png)
