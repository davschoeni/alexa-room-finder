'use strict';

const Alexa = require('alexa-sdk');
const MeetingRoomService = require('meeting-room-service');
const PeopleService = require('people-service');

const APP_ID = "amzn1.ask.skill.090d8e67-291a-4a37-999c-d38970ab54f5";

const placeholders = {
    NAME: "%NAME%",
    NUMBER: "%NUMBER%",
    FLOOR: "%FLOOR%",
    FIRSTNAME: "%FIRSTNAME%",
    LASTNAME: "%LASTNAME%"
};

const languageStrings = {
    'en': {
        translation: {
            GREETING: 'How can I help?',
            HELP: 'Try saying: "Where is Frank Williams?" or "Where is the meeting room Aqua?"!',
            REPEAT: 'Please repeat!',
            STOP: 'Goodbye!',
            ROOM_NOT_FOUND: "Sorry, I couldn't find the room you are looking for!",
            MEETING_ROOM_RESPONSE: "The room " + placeholders.NAME + " is on floor number " + placeholders.FLOOR + " and has the room number " + placeholders.NUMBER + "!",
            PERSON_NOT_FOUND: "Sorry, I couldn't find that person!",
            PERSON_RESPONSE: placeholders.FIRSTNAME + " " + placeholders.LASTNAME + " is on floor number " + placeholders.FLOOR + " in room " + placeholders.NUMBER + "!"
        }
    },
    'de': {
        translation: {
            GREETING: 'Wie kann ich helfen?',
            HELP: 'Versuche es mit: "Wo ist David Schöninger?" oder "Wo ist der Besprechungsraum Terra?"!',
            REPEAT: 'Bitte wiederhole!',
            STOP: 'Auf Wiedersehen!',
            ROOM_NOT_FOUND: "Entschuldige, ich konnte den Raum nicht finden.",
            MEETING_ROOM_RESPONSE: "Der Raum " + placeholders.NAME + " ist im " + placeholders.FLOOR + ". Stock und hat die Raumnummer " + placeholders.NUMBER + "!",
            PERSON_NOT_FOUND: "Entschuldige, ich konnte die gesuchte Person nicht finden!",
            PERSON_RESPONSE: placeholders.FIRSTNAME + " " + placeholders.LASTNAME + " ist im " + placeholders.FLOOR + ". Stock im Raum " + placeholders.NUMBER + "!"
        }
    }
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', this.t('GREETING'));
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP');
        const reprompt = this.t('HELP');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP'));
    },
    'FindMeetingRoomIntent': function () {
        var roomName = this.event.request.intent.slots.MeetingRoom.value;
        var room = MeetingRoomService.findMeetingRoom(roomName);
        if(room === null) {
            this.emit(':ask', this.t('ROOM_NOT_FOUND') + " " + this.t('REPEAT'));
        } else {
            var response = this.t('MEETING_ROOM_RESPONSE');
            response = response.replace(placeholders.NAME, room.name);
            response = response.replace(placeholders.FLOOR, room.floor);
            response = response.replace(placeholders.NUMBER, room.number);
            this.emit(':ask', response + " " + this.t('GREETING'));
        }
    },
    'FindPersonIntent': function() {
        var firstName = this.event.request.intent.slots.FirstName.value;
        var lastName = this.event.request.intent.slots.LastName.value;
        var person = PeopleService.findPerson(firstName, lastName);
        if(person === null) {
            this.emit(':ask', this.t('PERSON_NOT_FOUND') + " " + this.t('REPEAT'));
        } else {
            var response = this.t('PERSON_RESPONSE');
            response = response.replace(placeholders.FIRSTNAME, person.firstName);
            response = response.replace(placeholders.LASTNAME, person.lastName);
            response = response.replace(placeholders.FLOOR, person.floor);
            response = response.replace(placeholders.NUMBER, person.number);
            this.emit(':ask', response + " " + this.t('GREETING'));
        }
    },
    'Unhandled': function() {
        this.emit('AMAZON.HelpIntent');
    }
};