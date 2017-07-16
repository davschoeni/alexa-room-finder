# alexa-room-finder
Little Alexa Skill to search for people and meeting rooms.

**Sample Utterance:**

* Alexa, open room finder
* *How can I help?*
* Where is Mathew Smith?
* *Mathew Smith is on floor 1 in room 102. How can I help?*
* Where is the meeting room 'Terra'?
* *The room Terra is on floor 4 and has the room number 444*

## Alexa Skill Setup

* **Skill Type:** Custom Interaction Model
* **Languages:**
  * English (U.S.)
  * German
* **Name:**
  * Room Finder (English U.S.)
  * Raumsuche (German)
* **Invocation Name:**
  * room finder (English U.S.)
  * raumsuche (German)

### Interaction Model

The interaction model was created using *Alexa Skill Builder*. The JSON description can be found in this git repository.

I added the custom slot types *FIRST_NAMES* and *LAST_NAMES* with values of all employees' names. This narrows down Alexa's possibilities and she is only able to detect names that are present in the company. This should make the search more accurate than using for example the predefined *AMAZON.US_FIRST_NAME* type. The same goes for the custom slot type *MEETING_ROOMS*.

## Node.js Backend

The service endpoint is hosted using *AWS Lambda*.

If you want to change the data (people and meeting rooms), adapt the file *people.js* an *meeting-rooms.js* to your needs. Don't forget to also adapt the values in the custom slot types in the InteractionSchemes!

Keep the following JSON structure:

```javascript
// people.js
module.exports = [
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
```

```javascript
// meeting-rooms.js
module.exports = [
    {name: 'Garden', floor: '1', number: '100', size: 8, videoConference: false},
    {name: 'Aqua', floor: '2', number: '200', size: 12, videoConference: true},
    {name: 'Fire', floor: '3', number: '300', size: 16, videoConference: true},
    {name: 'Air', floor: '4', number: '400', size: 24, videoConference: true},
    {name: 'Terra', floor: '4', number: '444', size: 4, videoConference: false}
];
```

<u>Alternative:</u> Adapt *people-service.js* or *meeting-room-service.js* to fetch the data dynamically from a database, REST endpoint,...