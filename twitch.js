var oauth = require("oauth");
var OAuth2 = oauth.OAuth2;
var request = require("request");

var TWITCH_URL = "https://api.twitch.tv/kraken";

var Twitch = function(config) {
    this.d_key = config.key;
    this.d_secret = config.secret;
    this.d_authToken = config.access_token;
}

Twitch.prototype.makeRequest = function(url, callback, useOAuth) {
    if (undefined === url || !url) {
        return false;
    }
    if (undefined === callback || typeof callback != "function") {
        return false;
    }
    if (undefined === useOAuth) {
        useOAuth = true;
    }

    var _this = this;

    var headers = {
        'Accept': 'application/vnd.twitchtv.v3+json'
    };
    if (useOAuth) {
        headers["Authorization"] = "OAuth " + this.d_authToken;
    }

    request.get({url: url, headers: headers}, function(err, response, body) {
        if (err) {
            console.log("Error=", err);
        }
        else {
            body = JSON.parse(body);
            callback.call(_this, null, body);
        }
        
    });
}

Twitch.prototype.getSubscribers = function(channel, callback) {
    var url = TWITCH_URL + "/channels/" + channel + "/subscriptions";
    return this.makeRequest(url, callback, true);
}

Twitch.prototype.getFollows = function(channel, callback) {
    var url = TWITCH_URL + "/channels/" + channel + "/follows";
    return this.makeRequest(url, callback, true);
}

module.exports = Twitch