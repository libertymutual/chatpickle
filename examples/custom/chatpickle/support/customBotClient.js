const get = require('lodash.get');

module.exports.default = class CustomClient {

    /**
     * Creates an instance of CustomClient.
     * @public
     * @param {Object} botContext from chatpickle.config.*
     * @param {Object} userContext from chatpickle.config.*
     */
    constructor (botContext, userContext) {
        this.botContext = botContext;
        this.userContext = userContext;
        this.counter = 0;
        this.userId = `${userContext.userId}-${Date.now()}`;

        console.log(`[${this.userId}] New Conversation with ${this.botContext.botName}`);
    }

    /**
     * Initialize asynchronous components
     */
    async initialize () {
        console.log(`[${this.userId}] Initializing: ${new Date().toISOString()}`);

        // Simulate an asynchronous process
        const sleep = (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        await sleep(1000);

        console.log(`[${this.userId}] Ready: ${new Date().toISOString()}`);
    }

    /**
     * @public
     * @param {String} inputText user speech
     * @returns {String} bot speech
     */
    async speak (inputText) {
        console.log(`[${this.userId}] User: ${inputText}`);

        const user = this.userContext.userAttributes;
        const botMessages = [
            `Good evening ${user.firstName} ${user.lastName}! Do you have a reservation with us?`,
            'No problem at all, how many are in your party?',
            `Thank you ${user.firstName}, please follow me to your table.`
        ];
        const reply = botMessages[this.counter];
        this.counter++;

        console.log(`[${this.userId}] Bot: ${reply}`);

        return reply;
    }

    /**
     * @public
     * @param {String} attributePath as lodash get syntax
     * @returns {*} value
     */
    async fetch (attributePath) {
        return await get(this.userContext, attributePath);
    }
  
};
