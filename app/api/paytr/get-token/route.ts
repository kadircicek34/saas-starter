import { NextRequest, NextResponse } from 'next/server';
import { createPayTRToken } from '@/lib/paytr';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1️⃣ Zorunlu alanları backend’de üret
    const merchant_id = process.env.PAYTR_MERCHANT_ID!;
    const test_mode: '0' | '1' = '1';           // Canlıya geçince '0'
    const no_installment: '0' | '1' = '0';
    const max_installment = '0';
    const currency = 'TL';

    const user_basket = Buffer.from(
      JSON.stringify([[body.productName, (body.amount / 100).toFixed(2), 1]])
    ).toString('base64');

    const token = createPayTRToken({
      merchant_id,
      user_ip: body.userIp,
      merchant_oid: body.orderId,
      email: body.email,
      payment_amount: body.amount,
      user_basket: user_basket,
      no_installment,
      max_installment,
      currency,
      test_mode,
    });

    const payload = {
      merchant_id,
      user_ip: body.userIp,
      merchant_oid: body.orderId,
      email: body.email,
      payment_amount: body.amount,
      paytr_token: token,
      user_basket: user_basket,
      no_installment,
      max_installment,
      user_name: body.fullName,
      user_address: body.address,
      user_phone: body.phone,
      merchant_ok_url: process.env.PAYTR_OK_URL,
      merchant_fail_url: process.env.PAYTR_FAIL_URL,
      timeout_limit: '30',
      currency,
      test_mode,
      debug_on: '1',
    };

    const res = await fetch('https://www.paytr.com/odeme/api/get-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(payload as Record<string, string>).toString(),
    }).then(r => r.json());

    if (res.status !== 'success') {
      return NextResponse.json(res, { status: 400 });
    }

    return NextResponse.json({ token: res.token });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
