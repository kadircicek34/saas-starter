import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export const runtime = 'nodejs'; // Edge Runtime yerine Node.js kullan

export async function POST(req: NextRequest) {
  // PayTR POST içeriğini al
  const form = await req.formData();
  const data = Object.fromEntries(form.entries()) as Record<string, string>;

  const { PAYTR_MERCHANT_KEY, PAYTR_MERCHANT_SALT } = process.env;

  // Hash doğrulaması (güvenlik)
  const hashCheck = crypto
    .createHmac('sha256', PAYTR_MERCHANT_KEY as string)
    .update(
      data.merchant_oid +
        PAYTR_MERCHANT_SALT +
        data.status +
        data.total_amount,
    )
    .digest('base64');

  if (hashCheck !== data.hash) {
    return new Response('PAYTR notification failed: bad hash', { status: 400 });
  }

  // TODO: Sipariş kaydını DB’de güncelle (ileride eklenecek)

  // PayTR'ye “OK” cevabı
  return NextResponse.text('OK');
}
