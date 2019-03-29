const express = require('express');
const OAuthClient = require('intuit-oauth');
var QuickBooks = require('node-quickbooks');
const cors = require('cors');
const treadmaxx = require('./treadmaxx');


var app = express();
app.use(cors());
app.use(express.static(__dirname + '/public'));

var oauthClient = new OAuthClient({
    clientId: 'Q08nHt4OEBey0935L3Oq8TK7np8Emf6oyT8SRF2QxBkS2pgTR0',
    clientSecret: 'KdV1FqSXtmChiriDmPuu3jg7upGbrb8fQlPKCFLx',
    environment: 'sandbox',
    redirectUri: 'http://localhost:4000/tokenRequest' 
})

app.get('/treadmaxx', (req, res) => {
    res.send(treadmaxx);
})

app.get('/oauth', (req, res) => {
    // AuthorizationUri
    var authUri = oauthClient.authorizeUri({scope:[OAuthClient.scopes.Accounting,OAuthClient.scopes.OpenId,OAuthClient.scopes.Profile],state:'testState'});  // can be an array of multiple scopes ex : {scope:[OAuthClient.scopes.Accounting,OAuthClient.scopes.OpenId]}
    // Redirect the authUri 
    res.redirect(authUri);
    });

    app.get('/tokenRequest', (req, res) => {
        // Parse the redirect URL for authCode and exchange them for tokens
    var parseRedirect = req.url;
    
    // Exchange the auth code retrieved from the **req.url** on the redirectUri
    oauthClient.createToken(parseRedirect)
        .then(function(authResponse) {
           const response = (authResponse.getJson());
           const token = response.access_token;
           const refresh = response.refresh_token;
            res.redirect('http://localhost:3000/invoices');
            userToken = token;
            refreshToken = refresh;
    
        })
        .catch(function(e) {
            console.error("The error message is :"+e.originalMessage);
            console.error(e.intuit_tid);
        });
    });


    app.get('/invoices', (req, res) => {
        var qbo = new QuickBooks(
            consumerKey,
            consumerSecret,
            userToken,
            false, //no token secret in oauth 2.0        
            '123146233799434',
            true,
            true,
            4,
            '2.0', /* oauth version */
            refreshToken /* refresh token */);
        
        qbo.findInvoices(function (e, invoices) {
            res.send(invoices);
               })
        
           });

     




app.listen(4000, () => {
    console.log('server is up on port 4000')
});