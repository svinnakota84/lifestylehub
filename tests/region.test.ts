import test from 'node:test';
import assert from 'node:assert/strict';
import { browserCurrency, currencyForCountry, formatAmount, localEquivalent } from '../services/region';
test('regional preferences resolve common customer currencies',()=>{
  assert.equal(browserCurrency('en-IN'),'INR');assert.equal(browserCurrency('en-GB'),'GBP');assert.equal(browserCurrency('fr-FR'),'EUR');assert.equal(browserCurrency('en-AU'),'AUD');assert.equal(currencyForCountry('jp'),'JPY');assert.equal(browserCurrency('invalid-language-???'),'USD');
});
test('currency conversions are numeric estimates and unavailable rates do not invent values',()=>{
  assert.equal(localEquivalent(10,'INR',{inr:90}),900);assert.equal(localEquivalent(10,'USD',{}),10);assert.equal(localEquivalent(10,'EUR',{}),null);assert.equal(localEquivalent(10,'EUR',{eur:-1}),null);
});
test('zero-decimal currency display rounds correctly',()=>{
  assert.equal(formatAmount(1234.56,'JPY','en-US'),'¥1,235');assert.ok(formatAmount(900,'INR','en-IN').includes('900.00'));
});
