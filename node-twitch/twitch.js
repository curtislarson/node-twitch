var oauth = require("oauth");
var OAuth2 = oauth.OAuth2;

var TWITCH_URL = "https://api.twitch.tv/kraken";

var Twitch = function(config) {
	this.d_key = config.key;
	this.d_secret = config.secret;
}

Twitch.onAuthTokenReceived = function(e, access_token, refresh_token, results) {
	
}

Twitch.authenticate = function(redirectUrl) {
	var clientId = this.d_key;

	var oauth2 = new OAuth2(this.d_key,
						    this.d_secret,
						    "https://api.twitch.tv/kraken",
						    null,
						    "oauth2/token",
						    null);
	oauth2.getOAuthAccessToken('',
       						   {'grant_type':'client_credentials'},
       						   this.onAuthTokenReceived);
}

module.exports = Twitch