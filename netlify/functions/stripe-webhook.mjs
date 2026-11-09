import {endpoint,webhook} from '../../server/payments.mjs';
export default endpoint(webhook);
export const config={path:'/api/stripe-webhook'};
