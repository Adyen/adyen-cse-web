# Adyen CSE for Web

This repository contains a code sample for adding Adyen payments using Client-Side Encryption (CSE). With CSE card data is encrypted on a client side before you submit it through your own server to the Adyen API. By using CSE you reduce your scope of [PCI compliance](https://en.wikipedia.org/wiki/Payment_Card_Industry_Data_Security_Standard), because no raw card data travels through your server. 

Looking for the Android or iOS equivalent? We have the CSE library also available in Java ([AdyenCSE-Android](https://github.com/Adyen/Adyen-cse-android)) and Objective-C ([AdyenCSE-iOS](https://github.com/Adyen/adyen-cse-ios)).

## Requirements

All our CSE libraries rely on you setting up your own server for communicating with the Adyen API. By using a server you ensure that API authentication credentials never get exposed. Note that you need to have [signed up for an account at Adyen](https://www.adyen.com/signup) before you can send requests to the Adyen API.

## Usage

The library currently offers two integration methods:

- [HTML-based integration](#html-based-integration), in which an HTML form is enriched, encrypting data on submit.
- [JavaScript-only integration](#javascript-only-integration), in which data can be encrypted using a JavaScript API only.

The library currently has three inclusion / loading styles:
- Download `adyen.encrypt.min.js`  and host it yourself. Both HTML-based and JavaScript-only integration types are supported.
- Download `adyen.encrypt.nodom.min.js` and host it yourself. Only supports JavaScript-only integration.
- Adyen-hosted version, in which the public key is embedded into the JavaScript. Using this integration you can be always sure that you  have the latest security patches and don't have to keep your public key in sync with the Adyen servers manually. See [Adyen Hosted Form Based Integration](HostedCSE.md) for more details. 


## HTML-based integration

This integration binds to existing HTML in the page, adding a hidden input containing the encrypted card data to the form on the moment the form is submitted.

The complete integration requires HTML markup to be present in the page, as well as accompanying JavaScript to enable the behavior.

### HTML Template

Create your payment form and add a way to reference to your form from JavaScript (for example, by adding `id="adyen-encrypted-form"`).

Note that card input fields should not have the `name=` attribute, but are annotated by the `data-encrypted-name=` attribute, to mark them for encryption. This makes sure that the input values are never sent to the server.
```html
<form method="POST" action="#handler" id="adyen-encrypted-form">
    <input type="text" size="20" autocomplete="off" data-encrypted-name="number" />
    <input type="text" size="20" autocomplete="off" data-encrypted-name="holderName" />
    <input type="text" size="2" maxlength="2" autocomplete="off" data-encrypted-name="expiryMonth" />
    <input type="text" size="4" maxlength="4" autocomplete="off" data-encrypted-name="expiryYear" />
    <input type="text" size="4" maxlength="4" autocomplete="off" data-encrypted-name="cvc" />
    <input type="hidden" value="generate-this-server-side" data-encrypted-name="generationtime" />
    <input type="submit" value="Pay" />
</form>
```

### JavaScript
Accompanying the above HTML template, there are two variants of including the CSE library. The original plain JavaScript variant relies on a global `adyen.encrypt` object, while on popular demand an AMD style module has been added.

#### Plain JavaScript
Include the Adyen Client-Side Encryption library into your page:
```html
<script type="text/javascript" src="js/adyen.encrypt.min.js"></script>
```
Enrich a form in your page with the CSE onSubmit and (optionally) validation behaviors:
```javascript
// The form element to encrypt
var form    = document.getElementById('adyen-encrypted-form');
// The public key
var key     =   "your key as retrieved from the Adyen Customer Area Web Service User page"; 
// Form and encryption options. See adyen.encrypt.simple.html for details
var options = {};
// Bind encryption to the form
adyen.encrypt.createEncryptedForm( form, key, options);
```

See [Options](Options.md) for a full list of options.

#### RequireJS
Make sure you include RequireJS or an alternative AMD module loader in your page:
```html
<script src="path/to/libs/require.js/2.1.17/require.min.js"></script>
```
You can either rename the `adyen.encrypt.min.js` into `adyen/encrypt.js`, or add a paths configuration:
```javascript
// Your paths config, or rename the adyen.encrypt.min.js to adyen/encrypt.js
require.config({
    paths: {
        'adyen/encrypt' : '../simple/js/adyen.encrypt.min'
    }
});
```

In the `main.js` or similar file, enrich the form using a `require` call.

```javascript
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
```

## JavaScript-only integration

In case the HTML integration is troublesome in your setup, the library has been split up into two parts since release V0_1_11. The newly introduced part is an HTML-independent encryption.

Note that this kind of integration may not be suitable for you, if you want to perform the **Fraudulent behaviour on payment page** risk check. For more information, refer to [Adyen documentation](https://docs.adyen.com/developers/risk-management/revenueprotect-engine-rules/consistency-rules/fraudulent-behaviour-on-payment-page).

*As with all CSE integrations, make sure that no card data is sent to your server unencrypted.*

```html
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
        
        // AJAX call or different handling of the post data
    }
    
    // Enable behavior tracking on number and CVC fields
    // Initiate before user interacts with the refeenced fields.
    cseInstance.monitor( 'number', document.getElementById('numberField') );
    cseInstance.monitor( 'cvc', document.getElementById('numberField') );
    
})();
</script>
```

#### Node module

Add to your `package.json`:
```
"dependencies": {
  "adyen-cse-web": "git+https://github.com/Adyen/adyen-cse-web.git#v0.1.XX"
}
```

**Note that the XX needs to be replaced with the version of the library you wish to use.**

For the current latest release use the following dependency:
```
"dependencies": {
  "adyen-cse-web": "git+https://github.com/Adyen/adyen-cse-web.git#v0.1.19"
}
```

Then run `npm install`.

Now you can use adyen as a regular npm package:

```js
var adyenEncrypt = require('adyen-cse-web');

var cseInstance = adyenEncrypt.createEncryption(key, options);
```

# Version History

JavaScript version 0_1_21
-------

* Improved card type detection for ELO and added card type detection for various other cards

* Reduce strictness of generationtime validation to allow hosted CSE upgrade from 0_1_18 to 0_1_21.

JavaScript version 0_1_20
-------

* **Warning: Make sure to use the 0.1.20.1 patch version of this release, due to a bug in 0_1_20**

* Add `encryption.monitor( 'number', myCardField);` to allow fraud prevention data gathering for nodom implementations.

* Improve entropy setup for older browsers

JavaScript version 0_1_19
-------

* Fix reference to `window` in nodom implementation

* Capture referrer page as part of the encrypted blob

* Fix installation problem after relocations ( issue #33 ) because of wrong naming in bower.json

* Generation time will now be validated

* Fix card type detection on China Union Pay vs Maestro

JavaScript version 0_1_18
-------

* Adjust expiryYear validation to require [-2, + 15] year range

* Add `onvalidate` callback which is triggered after CSE has completed the form validation.

* Merge pull requests #22 and #17

JavaScript version 0_1_17
-------

* Add the fourDigitCvcForBins option to validate 4 digit are used for the CVC field on selected bins. The default value is '34,37' for the amex bins.

JavaScript version 0_1_16
-------

* Update device fingerprinting to align with Adyen Hosted Payment Pages fingerprinting update

* Do not validate CVC if it is not provided

* Add validation for holderName

JavaScript version 0_1_15
-------

* Add cardtype detection for three new card types 

* Improve card type detection for dual branded cards (ELO)

* Add length checks to number field validation

* Add device fingerprinting as part of fraud detection

JavaScript version 0_1_14
-------

* Clean up inconsistencies between the nodom Encryption and the UI engine 

* Only validate fields that are only there. Removing CVC from the HTML (in case of mister cash) no longer fails validation.

* Don't require zero padding on the expiryMonth

JavaScript version 0_1_13
-------

* Add validation for the card holder name

* Remove window dependency from the `nodom` variant

* Add `valid` class for valid fields ( can be disabled by setting `options.disabledValidClass` )

JavaScript version 0_1_12
-------

* Validate onkeyup

* Fix issue with event tracking

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

## Questions?

If you have any questions or suggestions, please contact your account manager or send your inquiry to support@adyen.com.

## License

This repository is open-source and available under the [MIT license](https://en.wikipedia.org/wiki/MIT_License). See the LICENSE file for more information.
