export const getCheapestCarburantInCity = async (city: string) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_APP_URL + "/api/price/gas?city=" + city,
    );

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
  }
  return null;
};
