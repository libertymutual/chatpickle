const { SimpleBot } = require('./SimpleBot');
const get = require('lodash.get');

module.exports.default = class CustomBotClient {

    /**
     * Creates an instance of CustomBotClient.
     * @public
     * @param {Object} botContext from chatpickle.config.json or .js
     * @param {Object} userContext from chatpickle.config.json or .js
     */
    constructor (botContext, userContext) {
        this.botContext = botContext;
        this.userContext = userContext;
        this.userId = `${userContext.userId}-${Date.now()}`;

        this.bot = new SimpleBot(botContext);

        console.log(`[${this.userId}] New Conversation with ${this.botContext.botName}`);
    }

    /**
     * Implementation of optional BotClient.initialize
     * @public
     */
    async initialize () {
        console.log(`[${this.userId}] Initializing: ${new Date().toISOString()}`);

        await this.bot.startSession(this.userContext);

        console.log(`[${this.userId}] Ready: ${new Date().toISOString()}`);
    }

    /**
     * Implementation of required BotClient.speak
     * @public
     * @param {String} inputText user speech
     * @returns {String} bot speech
     */
    async speak (inputText) {
        console.log(`[${this.userId}] User: ${inputText}`);

        const reply = await this.bot.postText(inputText);

        console.log(`[${this.userId}] Bot: ${reply}`);

        return reply;
    }

    /**
     * Implementation of required BotClient.fetch
     * @public
     * @param {String} attributePath as lodash get syntax
     * @returns {*} value
     */
    async fetch (attributePath) {
        return await get(this.bot.userContext, attributePath);
    }
  
};
