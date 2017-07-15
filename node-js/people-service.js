const People = require('people');

module.exports = {

    // Returns all people
    getAllPeople: function () {
        return People;
    },

    // Returns a person JSON object with ('firstName') and 'lastName'
    // Returns 'null', if it can't be found
    findPerson: function (firstName, lastName) {
        if (firstName !== null && firstName !== undefined)
            firstName = firstName.toLowerCase().trim();
        if (lastName !== null && firstName !== undefined)
            lastName = lastName.toLowerCase().trim();

        var foundPerson = null;
        for(var i=0; i < People.length; i++) {
            var person = People[i];
            // Perfect match
            if(person.firstName.toLowerCase().trim() === firstName && person.lastName.toLowerCase().trim() === lastName)
                foundPerson = person;
            // No perfect match, but at least the lastName matches
            // Take it only, if we haven't found anyone so far
            if(person.lastName.toLowerCase().trim() === lastName && foundPerson === null)
                foundPerson = person;
        }
        return foundPerson;
    }

};