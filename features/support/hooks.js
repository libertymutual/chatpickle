const {
  Before
} = require('cucumber');

Before(function () {
  this.userName = 'Anonymous';
  this.botName = null;
  this.sessionId = null;
  this.initialSessionAttributes = {

  };
  this.sessionAttributes = null;
  this.lexResponse = null;
});
