# Client-Side Encryption (CSE)

This repository contains sample code for adding Adyen Payments using Client-side encryption (CSE).

The library currently offers two integration methods:

- [HTML based integration]() in which a HTML form is enriched, encrypting data on submit
- [JavaScript only integration]() in which data can be encrypted using a JavaScript only API.

The library currently has three inclusion / loading styling:
- Download `adyen.encrypt.min.js`  and host it yourself. Both HTML based as JavaScript only integration is supported.
- Download `adyen.encrypt.nodom.min.js` and host it yourself. Only supports JavaScript only integration.
- Adyen Hosted version in which the public key is embedded in the JavaScript. This integration makes sure you always have the latest security patches, and don't have to keep your public key in sync with the Adyen servers manually. See [Adyen Hosted Form Based Integration](HostedCSE.md) for more details. 


## HTML based integration

This integration binds to existing HTML in the page, adding a hidden input containing the encrypted card data to the form on the moment the form is submitted.

The complete integration requires HTML markup to be present in the page, as well as accompanying JavaScript to enable the behavior.

### HTML Template

Create your payment form, and make sure to add a way to reference to your form from JavaScript. For example by adding `id="adyen-encrypted-form"`.

Note that card input fields should not have a `name=` attribute, but are annotated by the `data-encrypted-name=` attribute, to mark them for encryption. This makes sure that the input values are never send to the server.
````html
<form method="POST" action="#handler" id="adyen-encrypted-form">
    <input type="text" size="20" autocomplete="off" data-encrypted-name="number" />
    <input type="text" size="20" autocomplete="off" data-encrypted-name="holderName" />
    <input type="text" size="2" maxlength="2" autocomplete="off" data-encrypted-name="expiryMonth" />
    <input type="text" size="4" maxlength="4" autocomplete="off" data-encrypted-name="expiryYear" />
    <input type="text" size="4" maxlength="4" autocomplete="off" data-encrypted-name="cvc" />
    <input type="hidden" value="generate-this-server-side" data-encrypted-name="generationtime" />
    <input type="submit" value="Pay" />
</form>
````

### JavaScript
Accompanying the above the HTML template, there are two variants to including the CSE library. The original plain JavaScript variant relies on a global `adyen.encrypt` object, while on popular demand a AMD style module has been added.

#### Plain JavaScript
Include the Adyen Clientside Encryption Library to your page
````html
<script type="text/javascript" src="js/adyen.encrypt.min.js"></script>
````
Enricht a form in your page with the CSE onSubmit and (optionally) validation behaviors
````javascript
// The form element to encrypt
var form    = document.getElementById('adyen-encrypted-form');
// The public key
var key     =   "your key as retrieved from the Adyen Customer Area Web Service User page"; 
// Form and encryption options. See adyen.encrypt.simple.html for details
var options = {};
// Bind encryption to the form
adyen.encrypt.createEncryptedForm( form, key, options);
````

#### RequireJS
Make sure you include requirejs or a alternative AMD module loader in your page
````html
<script src="path/to/libs/require.js/2.1.17/require.min.js"></script>
````
You can either rename the `adyen.encrypt.min.js` into `adyen/encrypt.js`, or add a paths configuration:
````javascript
// Your paths config, or rename the adyen.encrypt.min.js to adyen/encrypt.js
require.config({
    paths: {
        'adyen/encrypt' : '../simple/js/adyen.encrypt.min'
    }
});
````

In the `main.js` or similar file, enrich the form using a `require` call.

````javascript
require(['adyen/encrypt'], function(adyenEncrypt) {
    // The form element to encrypt
    var form    = document.getElementById('adyen-encrypted-form');
    // The public key
    var key     =   "your key as retrieved from the Adyen Customer Area Web Service User page"; 
    // Form and encryption options. See adyen.encrypt.simple.html for details
    var options = {};
    // Bind encryption to the form
    adyenEncrypt.createEncryptedForm( form, key, options );
});
</script>
````

## JavaScript only integration

In case the HTML integration is troublesome in your setup, the library has been split up into two parts since release V0_1_11. The newly introduced part is a HTML independant encryption.

*As with all CSE integrations, make sure that no card data is send to your server unencrypted*

````html
<script type="text/javascript" src="js/adyen.encrypt.nodom.min.js"></script>
<script type="text/javascript">
(function() {
    var key     =   "your key as retrieved from the Adyen Customer Area Web Service User page"; 
    var options = {}; // See adyen.encrypt.nodom.html for details

    var cseInstance = adyen.encrypt.createEncryption(key, options);

    function encryptMyData() {
    
        var postData = {};
        
        var cardData = {
            number : cardNumber,
            cvc : cvc,
            holderName : holderName,
            expiryMonth : expiryMonth,
            expiryYear : expiryYear,
            generationtime : generationtime
        };
        
        postData['adyen-encrypted-data'] = cseInstance.encrypt(cardData);
        
        // Ajax Call or different handling of the post data
    }
    
})();
</script>
````


# Version History

JavaScript version 0_1_11
-------

* Introduce `adyen.encrypt.createEncryption(key, options)` to split out the DOM handling from the encryption. Allowing easier integration for UI frameworks like Angular or Backbone.

* Add a first structure of behavior tracking to the client side encryption which will be embedded as meta data to the encrypted object and use for fraud detection.

* Add `options.cvcIgnoreBins` to allow CVC validation to be skipped for certain bins.

* Add reference to `adyen.createEncryption(form, options)` which can be used with the [Adyen Hosted Form Based Integration](HostedCSE.md).

JavaScript version 0_1_10
---

* For integrating CSE better within other platforms (like magento) an option is added to change the attribute name that define the encryption fields from 'data-encrypted-name' to another data-* field.

JavaScript version 0_1_9
---

* Fix variable leaking to window object and remove unused variable

* Fix unneeded change to XMLHttpRequest object

* Add Cart Type Detection addon

JavaScript version 0_1_8
---

The 0_1_8 version of the JavaScript client-side encryption library upgrades the underlying SJCL crypto library and fixes a base64 encoding issue.

JavaScript version 0_1_7
---

The 0_1_7 version of the JavaScript client-side encryption library fixes entropy collection issues by adding polyfills for UInt32Array and Date.toISOString in Internet Explorer 8.

JavaScript version 0_1_6
---

The 0_1_6 version of the JavaScript client-side encryption library fixes an issue where the library crashes if the native browsers random number initialization fails.

The issue typically occurs in Firefox version lower than 20 where crypto.random is present but throws a NS_ERROR_NOT_IMPLEMENTED when being called.

JavaScript version 0_1_5
---

The 0_1_5 version of the JavaScript client-side encryption library upgrades the random number generator and the JSBN implementation.
 

JavaScript version 0_1_4
---
 The 0_1_4 version of the JavaScript client-side encryption offers a LuhnCheck and default validations on other fields.

 All properties are configurable through the options object:

 * ```options.enableValidations // default: true```
 
   Enable basic field validation (default is true)

   The submit button will be disabled when fields proof to be invalid. The form submission will be prevented as well.

    ```javascript
    options.enableValidations = true;
    ```
 * ```options.submitButtonAlwaysEnabled // default: false```
 
   Always have the submit button enabled, even in case of validation errors.
 
   ```javascript
   options.submitButtonAlwaysEnabled = false;
   ```
 * ```options.numberIgnoreNonNumeric // default: true```
 
 The payment handling ignores non-numeric characters for the card field.
 
 By default non-numeric characters will also be ignored while validating
 the card number field. This can be disabled for UX reasons.

 ```javascript
  options.numberIgnoreNonNumeric = true;
 ```

 Patches
 
 * 0_1_4p1
 
     Remove unnecessary ```document.title``` assignment.
