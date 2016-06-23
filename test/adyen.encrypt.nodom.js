var expect = require('chai').expect;
var jsdomify = require('jsdomify').default;

// mock dom api
jsdomify.create();
var navigator = jsdomify.getDocument().navigator;

var adyenEncrypt = require('../js/adyen.encrypt.nodom');

describe('adyenEncrypt', function () {
  it('has createEncryption function', function () {
    expect(adyenEncrypt).to.have.property('createEncryption');
  });

  it('has errors object', function () {
    expect(adyenEncrypt).to.have.property('errors');
  });
});
