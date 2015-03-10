client-side-encryption
==========
Sample code for client-side encryption

[![Build Status](https://travis-ci.org/Adyen/CSE-iOS.svg)](https://travis-ci.org/Adyen/CSE-iOS)

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
