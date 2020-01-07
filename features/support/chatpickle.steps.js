const { Before, Given, When, Then, setDefaultTimeout } = require('cucumber');
const { assert } = require('chai');
const { Bot } = require('../../lib/bot');
const CHATPICKLE_CONFIG = require('./chatpickle.config.json');
  
const CUCUMBER_STEPS_TIMEOUT_MILLISECONDS = 30000;

setDefaultTimeout(CUCUMBER_STEPS_TIMEOUT_MILLISECONDS);
  
Before(function () {
    this.userName = 'Anonymous';
    this.userAttributes = {};
    this.bot = null;
});
  
Given('the user is {string}', function (userName) {
    this.userName = userName;
    this.userAttributes = CHATPICKLE_CONFIG.users[userName];
    assert.ok(this.userAttributes, `Missing config for user name ${userName} - add them to chatpickle.config.users`);
});
  
Given('the user begins a new chat with {string}', function (botName) {
    const botConfig = CHATPICKLE_CONFIG.bots[botName];
    assert.ok(botConfig, `Missing config for bot name ${botName} - add it to chatpickle.config.bots`);
    this.bot = new Bot(botConfig.name, botConfig.alias, botConfig.region, this.userName, this.userAttributes);
});
  
When(/User:\s*([^\n\r]*)/i, async function (inputText) {
    await this.bot.send(inputText);
});
  
Then(/Bot:\s*([^\n\r]*)/i, function (botMessage) {
    assert.equal(this.bot.reply, botMessage);
});
  
Then(/BotRegEx:\s*([^\n\r]*)/i, function (botMessage) {
    assert.match(this.bot.reply, new RegExp(botMessage, 'i'));
});
  