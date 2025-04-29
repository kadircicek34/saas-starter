import crypto from 'crypto';

export interface PayTRTokenParams {
  merchant_id: string;
  user_ip: string;
  merchant_oid: string;
  email: string;
  payment_amount: number; // 3456 = 34.56 TL
  user_basket: string; // base64-encoded JSON
  no_installment: '0' | '1';
  max_installment: string;
  currency: 'TL' | 'USD' | 'EUR' | 'GBP' | 'RUB';
  test_mode: '0' | '1';
}

const { PAYTR_MERCHANT_KEY, PAYTR_MERCHANT_SALT } = process.env;

/**
 * Creates the paytr_token value required by the PayTR API.
 */
export function createPayTRToken(data: PayTRTokenParams): string {
  const {
    merchant_id,
    user_ip,
    merchant_oid,
    email,
    payment_amount,
    user_basket,
    no_installment,
    max_installment,
    currency,
    test_mode,
  } = data;

  const hashStr =
    merchant_id +
    user_ip +
    merchant_oid +
    email +
    payment_amount +
    user_basket +
    no_installment +
    max_installment +
    currency +
    test_mode;

  const hmac = crypto.createHmac('sha256', PAYTR_MERCHANT_KEY as string);
  hmac.update(hashStr + PAYTR_MERCHANT_SALT);
  return Buffer.from(hmac.digest()).toString('base64');
}
