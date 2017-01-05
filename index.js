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
        return;
    }

    this.eg.auth({
        path: "/ccu/v3/invalidate/url",
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: purgeObj
    });

    this.eg.send(function(error, response, body) {
        body = JSON.parse(body);
        if(typeof cb === "function"){
            cb(body);
        }
    });
};

Purger.prototype.checkPurgeStatus = function(progressUri, cb){
    if(!progressUri){
        console.log("Progress uri cannot be empty");
        return;
    }

    this.eg.auth({
        path: progressUri,
        method: "GET"
    });

    this.eg.send(function(error, response, body) {
        body = JSON.parse(body);
        if(typeof cb === "function"){
            cb(body);
        }
    });
};

module.exports = Purger;