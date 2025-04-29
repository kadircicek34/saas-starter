'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { useState } from 'react';

export default function SubmitButton({ planId, price }: { planId: string; price: number }) {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);

    // 1️⃣ Kullanıcı & sipariş bilgileri – gerçek uygulamada formdan/DB’den
    const body = {
      productName: planId,
      amount: price,      // 10.99 TL → 1099
      email: 'user@example.com',
      fullName: 'John Doe',
      address: 'Istanbul',
      phone: '5555555555',
      orderId: 'ORDER-' + Date.now(),
      userIp: window.location.hostname, // Prod’da real IP’yi backend’den al
    };

    const res = await fetch('/api/paytr/get-token', {
      method: 'POST',
      body: JSON.stringify(body),
    }).then(r => r.json());

    setLoading(false);

    if (!res.token) {
      alert('Payment error');
      return;
    }

    // 2️⃣ iFrame’i aç
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.paytr.com/odeme/guvenli/${res.token}`;
    iframe.id = 'paytriframe';
    iframe.frameBorder = '0';
    iframe.scrolling = 'no';
    iframe.style.width = '100%';
    iframe.style.minHeight = '650px';
    document.body.appendChild(iframe);

    // iFrame resize helper
    const script = document.createElement('script');
    script.src = 'https://www.paytr.com/js/iframeResizer.min.js';
    script.onload = () => (window as any).iFrameResize({}, '#paytriframe');
    document.body.appendChild(script);
  };

  return (
    <button
      onClick={handlePay}
      disabled={loading}
      className="px-4 py-2 bg-indigo-600 text-white rounded-md"
    >
      {loading ? 'Processing…' : 'Pay with PayTR'}
    </button>
  );
}


export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      variant="outline"
      className="w-full rounded-full"
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
          Loading...
        </>
      ) : (
        <>
          Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}
