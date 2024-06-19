import { notFound } from "next/navigation";
import { getCarById } from "@/service/CarsService";
import "react-multi-carousel/lib/styles.css";
import RentalForm from "@/components/RentalForm";
import "../../embla.css";
import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "@/components/EmblaCarousel";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCarsPhotos } from "@/service/CarsService";
import { getUser } from "@/lib/session";

const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true };

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

  const user = await getUser();
  let invalidUserMessage = "";
  if (user === null) {
    invalidUserMessage = "You need to be logged in to rent a car";
  } else if (user.driversLicenseEmitted === null) {
    invalidUserMessage =
      "You need to upload a driver's license to rent a car! Go to the profile section to upload it.";
  } else if (new Date(user.driversLicenseExpires as Date) < new Date()) {
    invalidUserMessage =
      "Your driver's license has expired! Go to the profile section to upload a new one.";
  }

  const photosPaths = await getCarsPhotos(car.id);

  const startDate = (searchParams as any)["start"] as string;
  const endDate = (searchParams as any)["end"] as string;

  return (
    <div>
      <section className="font-roboto sm:pt-20 bg-gradient-to-b from-gray-900 to-teal-400 mb-4">
        <div className="flex justify-center items-center max-w-screen-xl mx-auto pt-20 pb-6 sm:pb-16">
          <div className="mx-auto">
            <h1 className="text-3xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white">
              {car.make} {car.model}
            </h1>
          </div>
        </div>
      </section>
      <div className="flex flex-row  mx-auto">
        <EmblaCarousel slides={photosPaths} options={OPTIONS} />
        <RentalForm
          car={car}
          startDateSearch={startDate}
          endDateSearch={endDate}
          errorMessage={invalidUserMessage}
        />
      </div>
      <ToastContainer />
    </div>
  );
}
