import test from 'node:test';
import assert from 'node:assert/strict';
import {paymentLink} from '../shared/payment-links.mjs';
test('only a live hosted Stripe link is accepted',()=>{assert.equal(paymentLink('{"coach":"https://buy.stripe.com/example"}','coach'),'https://buy.stripe.com/example');for(const link of ['https://buy.stripe.com/test_example','https://buy.stripe.com.evil.example/x','https://buy.stripe.com@evil.example/x','javascript:alert(1)','http://buy.stripe.com/x','https://user:pass@buy.stripe.com/x'])assert.equal(paymentLink(JSON.stringify({coach:link}),'coach'),null);});
test('missing or malformed configuration never simulates checkout',()=>{for(const value of ['',undefined,'bad json','{}'])assert.equal(paymentLink(value,'coach'),null);});
