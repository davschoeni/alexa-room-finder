'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = "amzn1.ask.skill.090d8e67-291a-4a37-999c-d38970ab54f5";

const languageStrings = {
    'en': {
        translation: {
            GREETING: 'Hi!',
            HELP: 'Try saying: "Where is David Schöninger?" or "Where is the meeting room Terra?"',
            STOP: 'Goodbye!',
            ROOM_NOT_FOUND: "Sorry, I couldn't find the room you are looking for!",
            MEETING_ROOM_RESPONSE: "The room %NAME% is on floor number %FLOOR% and has the room number %NUMBER%",
            PERSON_NOT_FOUND: "Sorry, I couldn't find that person!",
            PERSON_RESPONSE: "%FIRSTNAME% %LASTNAME% is on floor number %FLOOR% in room %NUMBER%"
        }
    },
    'de': {
        translation: {
            GREETING: 'Hallo!',
            HELP: 'Versuche es mit: "Wo ist David Schöninger?" oder "Wo ist der Besprechungsraum Terra?"',
            STOP: 'Auf Wiedersehen!',
            ROOM_NOT_FOUND: "Entschuldige, ich konnte den Raum nicht finden.",
            MEETING_ROOM_RESPONSE: "Der Raum %NAME% ist im Stockwerk %FLOOR% und hat die Raumnummer %NUMBER%",
            PERSON_NOT_FOUND: "Entschuldige, ich konnte die gesuchte Person nicht finden!",
            PERSON_RESPONSE: "%FIRSTNAME% %LASTNAME% ist im Stockwerk %FLOOR% im Raum %NUMBER%"
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
        this.emit(':tell', this.t('GREETING'));
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
        var room = findMeetingRoom(roomName);
        if(room === null) {
            this.emit(':tell', this.t('ROOM_NOT_FOUND'));
        } else {
            var response = this.t('MEETING_ROOM_RESPONSE');
            response = response.replace('%NAME%', room.name);
            response = response.replace('%FLOOR%', room.floor);
            response = response.replace('%NUMBER%', room.number);
            this.emit(':tell', response);
        }
    },
    'FindPersonIntent': function() {
        var firstName = this.event.request.intent.slots.FirstName.value;
        var lastName = this.event.request.intent.slots.LastName.value;
        var person = findPerson(firstName, lastName);
        if(person === null) {
            this.emit(':tell', this.t('PERSON_NOT_FOUND'));
        } else {
            var response = this.t('PERSON_RESPONSE');
            response = response.replace('%FIRSTNAME%', person.firstName);
            response = response.replace('%LASTNAME%', person.lastName);
            response = response.replace('%FLOOR%', person.floor);
            response = response.replace('%NUMBER%', person.number);
            this.emit(':tell', response);
        }
    },
    'Unhandled': function() {
        this.emit('AMAZON.HelpIntent');
    }
};

var meetingRooms = [
    {name: 'Garden', floor: '1', number: '100', size: 8, videoConference: false},
    {name: 'Aqua', floor: '2', number: '200', size: 12, videoConference: true},
    {name: 'Fire', floor: '3', number: '300', size: 16, videoConference: true},
    {name: 'Air', floor: '4', number: '400', size: 24, videoConference: true},
    {name: 'Terra', floor: '4', number: '444', size: 4, videoConference: false}
];


var findMeetingRoom = function (name) {
    if (name === null | name === undefined)
        return null;

    name = name.toLowerCase().trim();
    for(var i=0; i < meetingRooms.length; i++) {
        if(meetingRooms[i].name.toLowerCase().trim() === name) {
            return meetingRooms[i];
        }
    }
    return null;
};


var people = [
    {firstName: 'David', lastName: 'Schöninger', floor: '4', number: '404'},
    {firstName: 'Douglas', lastName: 'Costa', floor: '3', number: '310'},
    {firstName: 'Maria', lastName: 'López', floor: '4', number: '403'},
    {firstName: 'Alexander', lastName: 'Johansson', floor: '3', number: '313'},
    {firstName: 'Fritz', lastName: 'Jones', floor: '3', number: '330'},
    {firstName: 'Jörg', lastName: 'Schäfer', floor: '2', number: '245'},
    {firstName: 'Lucía', lastName: 'Ferreira', floor: '2', number: '221'},
    {firstName: 'Frank', lastName: 'Williams', floor: '1', number: '140'},
    {firstName: 'Mathew', lastName: 'Smith', floor: '1', number: '102'},
    {firstName: 'Andreas', lastName: 'Bauer', floor: '1', number: '100'}
];

var findPerson = function (firstName, lastName) {
    if (firstName !== null)
        firstName = firstName.toLowerCase().trim();
    if (lastName !== null)
        lastName = lastName.toLowerCase().trim();

    var foundPerson = null;
    for(var i=0; i < people.length; i++) {
        var person = people[i];
        // Perfect match
        if(person.firstName.toLowerCase().trim() === firstName && person.lastName.toLowerCase().trim() === lastName)
            foundPerson = person;
        // No perfect match, but at least the lastName matches
        // Take it only, if we haven't found anyone so far
        if(person.lastName.toLowerCase().trim() === lastName && foundPerson === null)
            foundPerson = person;
    }
    return foundPerson;
};