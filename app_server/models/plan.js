var mongoose = require("mongoose");

var planSchema = new mongoose.Schema({    
    name: String,
    price: Number
});

module.exports = mongoose.model("Plan", planSchema);