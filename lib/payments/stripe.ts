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
  // Stripe devre dışı → boş liste
  return [];
}

export async function getStripePrices(): Promise<StripePrice[]> {
  // Stripe devre dışı → boş liste
  return [];
}

/* ---------- Checkout & Portal STUB ---------- */
export async function createCheckoutSession() {
  throw new Error('Stripe is disabled in this project.');
}

export async function createCustomerPortalSession() {
  throw new Error('Stripe is disabled in this project.');
}

/* ---------- Webhook yardımcıları STUB ---------- */
export async function handleSubscriptionChange() {
  /* no-op */
}

/* ---------- Stripe SDK nesnesine sahte export ---------- */
export const stripe: any = {}; // boş obje, import çakışmasını önler