import { notFound } from "next/navigation";
import { getCarById } from "@/service/CarsService";
import "react-multi-carousel/lib/styles.css";
import ElementsWrapperStripe from "@/components/ElementsWrapperStripe";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: URLSearchParams;
}) {
  const car = await getCarById(params.id);

  if (!car) {
    return notFound();
  }

  const startDate = (searchParams as any)["start"] as string;
  const endDate = (searchParams as any)["end"] as string;

  let nrOfDays = 0;

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = Math.abs(end.getTime() - start.getTime());
    nrOfDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  return (
    <>
      <section className="font-roboto sm:pt-20 bg-gradient-to-b from-gray-900 to-teal-400 mb-4">
        <div className="flex justify-center items-center max-w-screen-xl mx-auto pt-20 pb-6 sm:pb-16">
          <div className="mx-auto">
            <h1 className="text-3xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white">
              {car.make} {car.model} {car.transmission} {nrOfDays}
            </h1>
          </div>
        </div>
      </section>
      {nrOfDays > 0 && car.price && (
        <ElementsWrapperStripe
          amount={car.price * nrOfDays}
          startDate={startDate}
          endDate={endDate}
          carId={car.id}
        />
      )}
    </>
  );
}
