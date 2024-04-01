const mongoose = require("mongoose");
const classSchema = new mongoose.Schema({
    _id: Number,
    name: {
        type: String,
        required: true,
    },
    supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    children: [{
        type: Number,
        ref: 'child',
        required: true
    }]
}, { timestamps: true });

module.exports = mongoose.model("Class", classSchema);