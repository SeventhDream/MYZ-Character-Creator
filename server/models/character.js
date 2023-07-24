// Import the mongoose library for MongoDB interactions
const mongoose = require('mongoose');

// Define the character schema that maps the character name and profession from the front-end client to the fields in the back-end database
const characterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // The character's name is a required field
    },
    profession: {
        type: String,
        required: true // The character's profession is a required field
    },
    mutation: {
        type: String,
        required: true // The character's mutation is a required field
    },
    avatar: {
        type: String,
        required: true // The character's mutation is a required field
    },
    user: {
        type: String,
        required: true
    }
});

// Add the `remove` method to the character schema
characterSchema.methods.deleteCharacter = function () {
    return this.model('Character').deleteOne({ _id: this._id }).exec();
};

// Export the mongoose model 'Character' based on the defined schema, which allows interaction with the 'characters' collection in the database
module.exports = mongoose.model('Character', characterSchema);
