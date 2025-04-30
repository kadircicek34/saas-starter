// lib/payments/stripe.ts
// --------------------------------------------------
// Stripe KAPALI. Bu dosya yalnızca diğer dosyaların
// import'larını bozmamak için 'stub' işlevi görüyor.
// --------------------------------------------------

/* ---------- Basit tip tanımları ---------- */
export type StripeProduct = {
  id: string;
  name: string;
};

export type StripePrice = {
  id: string;
  productId: string;
  unitAmount: number;
  interval: string;
  trialPeriodDays: number;
};

/* ---------- Ürün / Fiyat sorguları ---------- */
export async function getStripeProducts(): Promise<StripeProduct[]> {
  return []; // Stripe devre dışı
}

export async function getStripePrices(): Promise<StripePrice[]> {
  return []; // Stripe devre dışı
}

/* ---------- Checkout & Portal STUB ---------- */
export async function createCheckoutSession(..._args: any[]) {
  // _args → { team, priceId } vb. olabilir
  throw new Error('Stripe is disabled in this project.');
}

export async function createCustomerPortalSession(..._args: any[]) {
  throw new Error('Stripe is disabled in this project.');
}

/* ---------- Webhook yardımcıları STUB ---------- */
export async function handleSubscriptionChange(..._args: any[]) {
  /* no-op */
}

/* ---------- Stripe SDK nesnesine sahte export ---------- */
export const stripe: any = {}; // boş obje, import çakışmasını önler