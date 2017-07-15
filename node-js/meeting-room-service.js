const MeetingRooms = require('meeting-rooms');

module.exports = {

    // Returns all meeting rooms
    getAllMeetingRooms: function () {
        return MeetingRooms;
    },

    // Returns a room JSON object with the given 'name'
    // Returns 'null', if it can't be found
    findMeetingRoom: function (name) {
        if (name === null)
            return null;

        name = name.toLowerCase().trim();
        for(var i=0; i < MeetingRooms.length; i++) {
            if(MeetingRooms[i].name.toLowerCase().trim() === name) {
                return MeetingRooms[i];
            }
        }
        return null;
    }

};