/* eslint-disable @typescript-eslint/no-var-requires */
const { Before, Given, When, Then, setDefaultTimeout } = require('cucumber');
const { assert } = require('chai');
const regexParser = require("regex-parser");
const CHATPICKLE_CONFIG = require(`${process.env.CHATPICKLE_CONSUMER_PATH_ABSOLUTE}/chatpickle.config`);

const CUCUMBER_STEPS_TIMEOUT_MILLISECONDS = 30000;
setDefaultTimeout(CUCUMBER_STEPS_TIMEOUT_MILLISECONDS);

Before(function() {
    this.userContext = { userId: 'Anonymous' };
    this.botClient = null;
    this.botReply = null;
});

Given('the user is {string}', function(userName) {
    assert.ok(CHATPICKLE_CONFIG.users, `Missing chatpickle.config.json attribute users`);
    const userConfig = CHATPICKLE_CONFIG.users[userName];

    // TODO - implement config validations that are elegant
    assert.ok(userConfig, `Missing config for users.${userName}`);
    assert.ok(userConfig.context, `Missing config for users.${userName}.context`);
    assert.ok(userConfig.context.userId, `Missing config for users.${userName}.context.userId`);
    assert.ok(userConfig.context.userAttributes, `Missing config for users.${userName}.context.userAttributes`);

    this.userContext = userConfig.context;
});

Given('the user begins a new chat with {string}', function(botName) {
    assert.ok(CHATPICKLE_CONFIG.bots, `Missing chatpickle.config.json attribute bots`);
    const botConfig = CHATPICKLE_CONFIG.bots[botName];

    // TODO - implement config validations that are elegant
    assert.ok(botConfig, `Missing config for bots.${botName}`);
    assert.ok(botConfig.type, `Missing config for bots.${botName}.type`);
    assert.ok(botConfig.context, `Missing config for bots.${botName}.context`);

    const BotSubclass = require(`../lib/botClients/${botConfig.type}Client.js`).default;
    this.botClient = new BotSubclass(botConfig.context, this.userContext);
});

When(/User:\s*([^\n\r]*)/i, async function(inputText) {
    this.botReply = await this.botClient.speak(inputText);
});

Then(/Bot:\s*([^\n\r]*)/i, function(botMessage) {
    if (botMessage[0] === '/') {
        // It's a regular expression, use match.
        assert.match(this.botReply, regexParser(botMessage));
    } else {
        // It's a string, use strict equality.
        assert.equal(this.botReply, botMessage);
    }
});

Then('{string} is {string}', async function(attributePath, requiredValue) {
    const value = await this.botClient.fetch(attributePath);
    assert.equal(value, requiredValue);
});
