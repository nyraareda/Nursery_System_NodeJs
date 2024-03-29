const mongoose = require("mongoose");
const classSchema = new mongoose.Schema({
    _id: Number,
    name: {
        type: String,
        required: true,
    },
    supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher' // Reference to the Teacher model
    },
    children: [{
        type: Number,
        ref: 'child', // Reference to the Child model
        required: true
    }]
}, { timestamps: true });

// Export the class model
module.exports = mongoose.model("Class", classSchema);