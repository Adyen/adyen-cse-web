  # Options
  
  The `createEncryption ( key , `*`options`*` )` and `createEncryptedForm ( form, key, `*`options`*` )` methods currently support the following fields.
  

* **boolean `[enableValidations = true] `**  
  
  Enable basic field validations. Disable the submit button when the form is not valid 
  
* **boolean `[submitButtonAlwaysEnabled = false]`**

  Force the submit button to be enabled, even when the front-end validation fails.
  
* **boolean `[numberIgnoreNonNumeric = true]`**

  When validating the credit card number, ignore non numeric characters like spaces
  
* **string `[fieldNameAttribute = 'data-encrypted-name']`**

  Configure the attribute to identify fields to be encrypted. Useful when you have multiple payment options within the same form, and want to bind each set to it's own CSE handler.
  
* **function `[onsubmit]`**

  Custom handler to be called on submit of the form.
  
* **HTMLElement `[cardTypeElement]`**

  Placeholder element to place card type detection results on, when the card type detection addon is enabled.
  
* **string `[cvcIgnoreBins = '']`**
   
  A comma separated string of bins for which the CVC code validation should be ignored.
  
  For example `cvcIgnoreBins = '6703'`) to ignore CVC validation for BCMC.


## Option in createEncryptedForm()
Supported fields: `enabledValidations`, `numberIgnoreNonNumeric`, `cvcIgnoreBins`, `submitButtonsAlwaysEnabled`, `fieldNameAttribute`, `onsubmit`

When the card type detection addon is being enabled, the `cardTypeElement` option is also supported.

## Option in createEncryption()
Currently  `enabledValidations`, `numberIgnoreNonNumeric` and `cvcIgnoreBins` are supported.
