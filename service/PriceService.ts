import cache from "@/lib/cache";
export const getCheapestCarburantInCity = async (city: string) => {
  const key = `cheapest-carburant-${city}`;
  if (cache.has(key)) {
    return cache.get(key) as {
      price: number;
      location: string;
      provider: string;
    };
  }
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_APP_URL + "/api/price/gas?city=" + city,
    );

    const data = await res.json();

    cache.set(key, data);

    return data;
  } catch (error) {
    console.error("Error:", error);
  }
  return null;
};
