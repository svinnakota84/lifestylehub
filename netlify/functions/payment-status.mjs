import {json,paymentConfig} from '../../server/payments.mjs';
export default async request=>request.method==='GET'?json(200,{available:Boolean(paymentConfig())}):json(405,{error:'Method not allowed.'});
export const config={path:'/api/payment-status'};
