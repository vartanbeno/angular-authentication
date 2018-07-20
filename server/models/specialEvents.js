const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const specialEventSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true }
}, { collection: 'specialEvents' });

const SpecialEvent = mongoose.model('Special Event', specialEventSchema);

module.exports = SpecialEvent;