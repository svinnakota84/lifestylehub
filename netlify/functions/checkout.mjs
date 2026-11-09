import {endpoint,createCheckout} from '../../server/payments.mjs';
export default endpoint(createCheckout);
export const config={path:'/api/checkout'};
