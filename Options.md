# Options
  
The `createEncryption ( key , `*`options`*` )` and `createEncryptedForm ( form, key, `*`options`*` )` methods both have an `options` argument, which is a JavaScript object with (a selection of) the following fields:
  
* **string `[name = 'adyen-encrypted-data'] `**
  
  The name of the field that should contain the Adyen-encrypted data block.

* **string `[fieldNameAttribute = 'data-encrypted-name']`** - *since version: 0_1_10*

  Configure this attribute to identify fields to be encrypted. Useful when you have multiple payment options within the same form, and want to bind each set to its own CSE handler.
  
* **boolean `[enableValidations = true] `**  
  
  Enable basic field validations. Disable the submit button when the form is not valid.
  
* **boolean `[submitButtonAlwaysEnabled = false]`**

  Force the submit button to be enabled, even when the front-end validation fails.

* **boolean `[disabledValidClass = false]`** - *since version: 0_1_13*
 
  The validation will add a `valid` class for valid fields, next to the `invalid` css class. 
  
  Set this flag to true to disable the addition of the `valid` class to the input elements.

* **boolean `[numberIgnoreNonNumeric = true]`**

  When validating the credit card number, ignore non-numeric characters (like spaces).
  
* **function `[onsubmit]`**

  Custom handler to be called on submission of the form.
  
  The callback function will be executed after encryption has taken place, and will receive the original submit event as its first argument.

* **function `[onvalidate]`**

  Handler to be called on validation of the form. 
  
  The callback function will be executed after the validation routine of the CSE form has been completed and will receive the validaty status of the form as its first argument.
  
* **HTMLElement `[cardTypeElement]`**

  A placeholder element to place card type detection results on, when the card type detection addon is enabled.
  
* **string `[cvcIgnoreBins = '']`** - *since version: 0_1_11*
   
  A comma-separated string of BINs, for which the CVC code validation should be ignored.
  
  For example `cvcIgnoreBins = '6703'` to ignore CVC validation for BCMC.
  
* **string `[fourDigitCvcForBins = '34,37']`** - *since version: 0_1_17*

  A comma-separated string of BINs, for which a four digit CVC is required.

  For example `fourDigitCvcForBins = '34,37'` to require four digit CVC for Amex cards.
  
  When no value is supplied, the default '34,37' will be used.

## Option in createEncryptedForm()
Supported fields: `enabledValidations`, `numberIgnoreNonNumeric`, `cvcIgnoreBins`, `fourDigitCvcForBins`, `submitButtonAlwaysEnabled`, `fieldNameAttribute`, `onsubmit`, `onvalidate`

*Example:*
```Javascript
var cseForm = createEncryptedForm ( form, key , {
    "name" : "my-custom-name",
    "enableValidations" : true,
    "submitButtonAlwaysEnabled": false,
    "numberIgnoreNonNumeric" : true,
    "fieldNameAttribute" : "data-encrypted-name",
    "cvcIgnoreBins" : "6703",
    "fourDigitCvcForBins" : "34,37"
} );
```

When the card type detection addon is being enabled, the `cardTypeElement` option is also supported.

## Option in createEncryption()
Currently  `enabledValidations`, `numberIgnoreNonNumeric`, `fourDigitCvcForBins` and `cvcIgnoreBins` are supported.

```Javascript
var cse = createEncryption ( key , {
    "enableValidations" : true,
    "numberIgnoreNonNumeric" : true,
    "cvcIgnoreBins" = "6703",
    "fourDigitCvcForBins" : "34,37"
} );
```
