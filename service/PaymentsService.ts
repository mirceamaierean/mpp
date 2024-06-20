export const createPaymentIntent = async (amount: number) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_APP_URL + "/api/payment/create",
      {
        method: "POST",
        body: JSON.stringify({ amount: amount }),
      },
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
  return null;
};

export const getLatestCharge = async (paymentId: string) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_APP_URL +
        "/api/payment/charge?paymentId=" +
        paymentId,
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
  return null;
};
