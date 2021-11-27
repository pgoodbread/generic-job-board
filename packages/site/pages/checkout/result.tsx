import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Stripe from "stripe";

export default function CheckoutResult() {
  const [checkoutResult, setCheckoutResut] =
    useState<Stripe.Checkout.Session | null>(null);
  const router = useRouter();

  console.log(router);
  useEffect(() => {
    const retrieveSession = async () => {
      if (router.query.session_id) {
        const result: Stripe.Checkout.Session = await fetch(
          `/api/checkout/${router.query.session_id}`
        ).then((res) => res.json());

        setCheckoutResut(result);
      }
    };
    retrieveSession();
  }, [router]);
  console.log(checkoutResult);
  return (
    <>
      <h1>Result</h1>
      <p></p>
    </>
  );
}
