# Custom Example

Because we can't predict your use-case ¯\\\_(ツ)\_/¯

This sample project, [examples/custom](./), demonstrates the flexibility of defining a custom bot client for interfacing with any chatbot.

You can define your own bot integration by using a few simple methods:
* initialize
* speak
* fetch

### Create a config file

You need a [chatpickle.config.json](chatpickle.config.json) (or .js) in the root of your node.js project and it should be formatted like the example provided.

### Create a chatpickle/ folder
You also need a [chatpickle](chatpickle) folder in the root of your project.  This is where you will put your gherkin feature files which can leverage the extended chatpickle syntax.

### Create a CustomBotClient

Refer to [support](chatpickle/support) for how to create a [CustomBotClient.js](chatpickle/support/CustomBotClient.js) class and how it would likely interface with your chatbot.  This example integrates with [SimpleBot.js](chatpickle/support/SimpleBot.js).