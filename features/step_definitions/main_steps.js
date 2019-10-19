/* eslint-disable no-invalid-this */
/* eslint-disable new-cap */
const {
    Given, Then, When, setDefaultTimeout
} = require('cucumber');
const {
    assert
} = require('chai');
const AWS = require('aws-sdk');

AWS.config.httpOptions.proxy = process.env.CHATPICKLE_PROXY;

const CUCUMBER_STEPS_TIMEOUT_MILLISECONDS = 30000;

setDefaultTimeout(CUCUMBER_STEPS_TIMEOUT_MILLISECONDS);

AWS.config.update({
    // eslint-disable-next-line capitalized-comments
    // accessKeyId: 'foo',
    // secretAccessKey: 'bar',
    region: 'us-east-1'
});

const lexruntime = new AWS.LexRuntime();

/**
 * Make a copy of JSON-ifiable data
 *
 * @param {object} obj - A javascript object of key/value pairs
 * @returns {object} copy of obj
 */
const copy = obj => {
    return JSON.parse(JSON.stringify(obj));
};

Given('the user profile is {string}', function (profileName) {
    this.userName = profileName;
    switch (profileName) {
        case 'Homer':
            this.initialSessionAttributes = {
                fullName: 'Homer Simpson'
            };
            break;
        default:
            assert.fail(`Unexpected profile name ${profileName}`);
    }
});

Given('the user begins a new chat with {string}', function (botNickName) {
    this.botNickName = botNickName;
    switch (botNickName) {
        case 'OrderFlowers_bot':
            this.botName = 'OrderFlowers';
            this.botAlias = 'prod';
            break;
        default:
            assert.fail(`Unexpected bot name ${botNickName}`);
    }
    this.sessionId = `${this.userName}-${Date.now()}`;
    this.sessionAttributes = copy(this.initialSessionAttributes);
});

When('they say:', function () {
    console.log(`\n[${this.sessionId}] New Conversation between ${this.userName} and ${this.botNickName}`);
});

When(/User:\s*([^\n\r]*)/i, async function (inputText) {
    const params = {
        botAlias: this.botAlias,
        botName: this.botName,
        inputText,
        sessionAttributes: this.sessionAttributes,
        userId: this.sessionId
    };

    console.log(`[${this.sessionId}] User: ${inputText}`);
    this.lexResponse = await lexruntime.postText(params).promise();
    this.sessionAttributes = copy(this.lexResponse.sessionAttributes);
});

Then(/Bot:\s*([^\n\r]*)/i, function (botMessage) {
    console.log(`[${this.sessionId}] Bot: ${this.lexResponse.message}`);
    assert.equal(this.lexResponse.message.trim(), botMessage);
});

Then(/BotRegEx:\s*([^\n\r]*)/i, function (botMessage) {
    console.log(`[${this.sessionId}] Bot: ${this.lexResponse.message}`);
    assert.match(this.lexResponse.message.trim(), new RegExp(botMessage, 'i'));
});
