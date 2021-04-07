module.exports.SimpleBot = class SimpleBot {

    /**
     * Constructor
     * @public
     * @param {Object} botContext  for initializing a bot
     */
    constructor (botContext) {
        this.botContext = botContext;
        this.userContext = null;
    }

    /**
     * Initialize a user session
     * @public
     * @param {Object} userContext for initializing a user
     */
    async startSession (userContext) {
        // Simulate an asynchronous process
        const sleep = (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        await sleep(1000);

        this.userContext = userContext;
    }

    /**
     * A user corresponds with the bot
     * @public
     * @param {String} inputText speech of the user
     * @returns {String} outputText speech of the bot
     */
    async postText (inputText) {
        // A basic response engine based on array order and regex matching.

        const user = this.userContext.userAttributes;

        const responses = [
            {
                label: 'Greeting',
                utterance: /hello|hi|good evening|how are you/i,
                response: `Good evening ${user.firstName} ${user.lastName}! Do you have a reservation with us?`
            },
            {
                label: 'No Reservation',
                utterance: /forgot to call it in|no reservation|did not have a reservation/i,
                response: 'No problem at all, how many are in your party?'
            },
            {
                label: 'Size of Party',
                utterance: /just me|one|two|three|four|five|six|seven|eight|\d+/i,
                response: `Thank you ${user.firstName}, please follow me to your table.`
            }
        ];

        const defaultResponse = 'Someone will be with you shortly.';

        const outputText = responses.reduce((previousValue, currentValue) => {

            if (inputText.match(currentValue.utterance)) {
                return currentValue.response;
            }

            return previousValue;

        }, defaultResponse);

        return outputText;
    }
  
};
