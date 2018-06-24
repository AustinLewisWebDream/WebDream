var mongoose = require("mongoose");

var domainSchema = new mongoose.Schema({    
    name: String,
    price: Number
});

module.exports = mongoose.model("Domain", domainSchema);