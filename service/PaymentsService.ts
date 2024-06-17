export const createPaymentIntent = async (amount: number) => {
  try {
    const res = await fetch("/api/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({ amount: amount }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
  return null;
};
