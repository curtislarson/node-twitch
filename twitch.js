var oauth = require("oauth");
var OAuth2 = oauth.OAuth2;
var request = require("request");

var TWITCH_URL = "https://api.twitch.tv/kraken";

var Twitch = function(config) {
    this.d_key = config.key;
    this.d_secret = config.secret;
}

Twitch.onAuthTokenReceived = function(e, access_token, refresh_token, results) {
    if (e) {
        // Unable to retrieve token
    }
    else {

    }
}

Twitch.authenticate = function(redirectUrl) {
    var clientId = this.d_key;

    var oauth2 = new OAuth2(this.d_key,
                            this.d_secret,
                            "https://api.twitch.tv/kraken",
                            "oauth2/authorize",
                            "oauth2/token",
                            null);
    oauth2.getOAuthAccessToken('',
                               {'grant_type':'client_credentials',
                               'response_type': 'code',
                               'redirect_uri': redirectUrl,
                               'scope':'channel_subscriptions'},
                               this.onAuthTokenReceived);
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
    // https://github.com/justintv/Twitch-API/blob/master/v3_resources/subscriptions.md
    // So we can get total number
    // Can also get created at
    // Authenticated, required scope: channel_subscriptions
    //curl -H 'Accept: application/vnd.twitchtv.v3+json' -H 'Authorization: OAuth <access_token>' \
    // -X GET https://api.twitch.tv/kraken/channels/test_channel/subscriptions

    var url = TWITCH_URL + "/channels/" + channel + "/subscriptions";
    return this.makeRequest(url, callback);
}

module.exports = Twitch