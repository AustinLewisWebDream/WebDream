var request = require('request');
var parseString = require('xml2js').parseString;
var http = require('http');

module.exports.get = function (req, res) {
    req.domain.price = "9.95"
    res.render('domain', {
        domain: req.domain
    })
};

module.exports.checkAvailable = function (req, res, next) {
    // Define the object so there are no errors if error in response
    req.domain = { name: "ERROR", status: "ERROR" }
    console.log('Domain Name: '+req.params.id);
    request("https://api.sandbox.namecheap.com/xml.response?ApiUser=GrapeDrinkMan&ApiKey=d7406032ea5240feb4e3a90acfadc2b2&UserName=GrapeDrinkMan&Command=namecheap.domains.check&DomainList=" + req.params.id + "&ClientIp=38.67.231.33", function (err, res, body) {
        parseString(body, function (err, body) {
            if (body.ApiResponse.$.Status === "ERROR") {
                console.log("There was an error");
                console.log(body.ApiResponse)
                next();
            } else {
                // Domain Availability
                var availableBool = body.ApiResponse.CommandResponse[0].DomainCheckResult[0].$.Available;
                var domain = body.ApiResponse.CommandResponse[0].DomainCheckResult[0].$.Domain;
                var available;
                if (availableBool === 'false') {
                    available = "Not Available"
                } else {
                    available = "Available"
                }
                req.domain = {
                    name: domain,
                    status: available
                }
                next();
            }
        });
    });
};

module.exports.getDomain = function(req, res) {
    console.log(req.domain);
    // Set header to JSON in order to send as a JSON
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({domain: req.domain}));
}


// Get pricing for all of the TLD's? Only use on admin side
//module.exports.getPricing = function(req, res, next){
//     const url = "https://api.sandbox.namecheap.com/xml.response?ApiUser=GrapeDrinkMan&ApiKey=d7406032ea5240feb4e3a90acfadc2b2&UserName=GrapeDrinkMan&Command=namecheap.users.getPricing&ProductType=DOMAIN&ClientIp=66.225.122.26"
//     request(url, function(err, res, body){
//         parseString(body, function(err, body){
//             console.log(body.ApiResponse.Errors[0]);
//             if(body.ApiResponse.$.Status === "ERROR"){
//                 console.log("There was an error");
//                 next();
//             }
//             else {
//                 console.log(body.ApiResponse)
//                 next();
//             }
//         });
//     });
// };