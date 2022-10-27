const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    Slno:{ type: Number, required: false},
    Company : { type: String, required: false},
    Building : { type: String, required: false},
    floor: { type: String, required: false},
    seatname: { type: String, required: false},
    sensorid: { type: String, required: false},
    Health: { type: String, required: false},
    DateTime:{ type: String, required: false},
    Date: { type: String, required: true},
})

module.exports = mongoose.model('Sensordata', postSchema);

