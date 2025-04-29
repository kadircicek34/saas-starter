import { NextRequest } from 'next/server';
import crypto from 'crypto';
import { db } from '@/lib/db'; // varsayılan DB helper’ınız

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const data = Object.fromEntries(form.entries()) as Record<string, string>;
  const { PAYTR_MERCHANT_KEY, PAYTR_MERCHANT_SALT } = process.env;

  const hashCheck = crypto
    .createHmac('sha256', PAYTR_MERCHANT_KEY as string)
    .update(
      data.merchant_oid +
        PAYTR_MERCHANT_SALT +
        data.status +
        data.total_amount
    )
    .digest();
  const hashBase64 = Buffer.from(hashCheck).toString('base64');

  if (hashBase64 !== data.hash) {
    return new Response('PAYTR notification failed: bad hash', { status: 400 });
  }

  // 🔄 Sipariş durumu kontrol/ güncelle
  // await db.orders.update(...)

  return new Response('OK');
}
