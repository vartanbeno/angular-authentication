const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const eventSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true }
}, { collection: 'events' });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;