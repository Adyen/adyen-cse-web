# Adyen Hosted Form Based Integration

A variant to the HTML / Form based integration is to have the library hosted by Adyen, after which you no longer need to take care of keeping your codebase and encryption key in sync with Adyen systems, as it will be injected by Adyen.

The syntax is similar to the HTML integration, but instead of downloading and hosting `adyen.encrypt.min.js` on your own servers, you use a CSE url that is unique for the webservice user you use to post to Adyen. The CSE url can be retrieved from the webservice user page, where you also retrieve your CSE public key. 

*The script URL of the CSE library differs per webservice user. You can retrieve yours from the Edit Webservice User in the Adyen Customer Area. Please note that the url is only visible in the Edit Webservice user page when there is a CSE key generated.*

The HTML template is the same as the HTML based integration shown earlier. However instead of hosting `adyen.encrypt.min.js` on your own server, you include a reference to the Adyen hosted Client-Side Encryption library. 



```` html
<script type="text/javascript" src="https://test.adyen.com/hpp/cse/js/{your Test Webservice user's CSEToken}.shtml"></script>
<!-- For live: 
   <script type="text/javascript" src="https://live.adyen.com/hpp/cse/js/{your Live Webservice user's CSEToken}.shtml"></script>
   
   Note that the token is not your CSE key, but a newly introduced numeric token.
-->
````

Initialze the clientside encryption form as in the normal HTML Form based integration. *Note that the AMD style is not yet available for the hosted CSE library.*

```` javascript
// The form element to encrypt
var form    = document.getElementById('adyen-encrypted-form');

// See adyen.encrypt.simple.html for details on the options to use
var options = {}; 

// Create the form.
// Note that the method is on the Adyen object, not the adyen.encrypt object.
adyen.createEncryptedForm( form, options); 
</script>
````

# Known limitations
- Currently the hosted CSE does not offer an AMD style. We will update this page when it does.
