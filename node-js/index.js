'use strict';
var Alexa = require("alexa-sdk");

// Replace with your app ID (OPTIONAL).
// You can find this value at the top of your skill's page on http://developer.amazon.com.
var APP_ID = 'amzn1.ask.skill.090d8e67-291a-4a37-999c-d38970ab54f5';

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

// Alexa IntentHandlers
var handlers = {
    'LaunchRequest': function () {
        this.emit(':tell', "TODO");
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':tell', "TODO");
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', "TODO");
    },
    'AMAZON.Cancel': function () {
        this.emit(':tell', "TODO");
    }
};