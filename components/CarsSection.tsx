import React from "react";
import DateRangeForm from "./DateRangeForm";

const CarsSection: React.FC = () => {
  return (
    <section id="cars" className="py-16 sm:py-5 bg-white ">
      <div className="px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="max-w-screen-xl mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
            MPP Cars
          </h2>
          <p className="text-gray-900 sm:text-xl">
            Here you can see the cars we have available in our company. Select
            the period you want to rent the car, and we will automatically
            calculate the required cost.{" "}
            <strong>The price varies depending on the rental period.</strong> To
            rent a car, you will leave a sum of money as a warranty, and at the
            end of the rental period, if there are no damages, you will receive
            the amount back.
          </p>
        </div>
        <DateRangeForm />
      </div>
    </section>
  );
};

export default CarsSection;
