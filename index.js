/**
 * Created by eli.l on 25/07/2016.
 */

var EdgeGrid = require('edgegrid');

var Purger = function(config){
    var clientToken = config.clientToken,
        clientSecret = config.clientSecret,
        accessToken = config.accessToken,
        baseUri = config.baseUri;

    this.eg = new EdgeGrid(clientToken, clientSecret, accessToken, baseUri);
};

Purger.prototype.invalidate = function(purgeObj, cb){
    if(!purgeObj){
        console.log("Purge object cannot be undefined");
    }

    this.eg.auth({
        path: "/ccu/v3/invalidate/url",
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: purgeObj
    });

    this.eg.send(function(data, response) {
        data = JSON.parse(data);
        console.log("Response: ", data);
        if(typeof cb === "function"){
            cb(data);
        }
    });
};

Purger.prototype.checkPurgeStatus = function(progressUri, cb){
    this.eg.auth({
        path: progressUri,
        method: "GET"
    });

    this.eg.send(function(data, response) {
        data = JSON.parse(data);
        if(typeof cb === "function"){
            cb(data);
        }
    });
};

module.exports = Purger;