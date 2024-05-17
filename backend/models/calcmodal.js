const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    
    target: {
        type: Number,
        required: true
    },

    achievement:{
        type:String,
        required:true
    },

    percentage: {
        type: Number,
        required: true,
    },
    
});

module.exports = mongoose.model('meds', registerSchema);
