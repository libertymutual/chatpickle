# 🥒 Chatpickle

## Conversation Tests for Chatbots

* Document conversational scenarios using Cucumber's Gherkin syntax.
* Run them as tests against your deployed chatbot.
* Be confident in all of your bot's behaviors.
  
## Supported Chatbot Integrations
  * [AWS Lex](examples/lex/README_LEX.md)
    * Great for out of the box Lex
  * [Custom](examples/custom/README_CUSTOM.md)
    * Because we can't predict your use-case
    * Define your own bot integration by using a few simple methods (initialize, speak, and fetch)

### Installing Chatpickle
`npm install chatpickle --save-dev`

### Configuring Chatpickle
* Create a config file
* Create a chatpickle folder for your feature files

More Info: [Chatpickle Examples](examples)

### Running Chatpickle
From your project root, or added as a script to your package.json:

`chatpickle`

### Extending Chatpickle
You can help extend chatpickle by contributing to our open source project [https://github.com/libertymutual/chatpickle](https://github.com/libertymutual/chatpickle)

Want to see a new type of bot supported?
 * Add a new bot client to [src/lib/botClients](src/lib/botClients)
 * Add documentation for it in our [examples](examples)

To help with known issues or needed improvements, check out our  [Issues](https://github.com/libertymutual/chatpickle/issues) on GitHub.