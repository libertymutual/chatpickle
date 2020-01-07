const { Before, Given, When, Then, setDefaultTimeout } = require('cucumber');
const { assert } = require('chai');
const { Bot } = require('../../lib/bot');
  
const CUCUMBER_STEPS_TIMEOUT_MILLISECONDS = 30000;

setDefaultTimeout(CUCUMBER_STEPS_TIMEOUT_MILLISECONDS);
  
// /**
//  * Make a copy of JSON-ifiable data
//  *
//  * @param {object} obj - A javascript object of key/value pairs
//  * @returns {object} copy of obj
//  */
// const copy = obj => {
//     return JSON.parse(JSON.stringify(obj));
// };
  
Before(function () {
    this.userName = 'Anonymous';
    // this.initialSessionAttributes = {};
    // this.sessionAttributes = null;
    this.bot = null;
});
  
Given('the user profile is {string}', function (profileName) {
    this.userName = profileName;
    // switch (profileName) {
    //     case 'Homer':
    //         this.initialSessionAttributes = {
    //             fullName: 'Homer Simpson'
    //         };
    //         break;
    //     default:
    //         assert.fail(`Unexpected profile name ${profileName}`);
    // }
});
  
Given('the user begins a new chat with {string}', function (botNickName) {
    const sessionId = `${this.userName}-${Date.now()}`;
    switch (botNickName) {
        case 'OrderFlowers_bot':
            this.bot = new Bot('OrderFlowers', 'prod', 'us-east-1', sessionId);
            break;
        default:
            assert.fail(`Unexpected bot name ${botNickName}`);
    }
    // this.sessionAttributes = copy(this.initialSessionAttributes);
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
  