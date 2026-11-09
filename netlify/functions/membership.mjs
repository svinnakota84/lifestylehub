import {endpoint,membership} from '../../server/payments.mjs';
export default endpoint(membership);
export const config={path:'/api/membership'};
