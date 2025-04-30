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
type RedirectObj = { url: string };

export async function createCheckoutSession(
  ..._args: any[]
): Promise<RedirectObj> {
  // _args → { team, priceId } vb. olabilir
  // Gerçekte Stripe olmadığından varsayılan bir URL dönüyoruz
  return { url: '/dashboard' };
}

export async function createCustomerPortalSession(
  ..._args: any[]
): Promise<RedirectObj> {
  return { url: '/dashboard' };
}

/* ---------- Webhook yardımcıları STUB ---------- */
export async function handleSubscriptionChange(..._args: any[]) {
  /* no-op */
}

/* ---------- Stripe SDK nesnesine sahte export ---------- */
export const stripe: any = {}; // Boş obje, import çakışmasını önler