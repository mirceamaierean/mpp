import { format } from "date-fns";

export default function UserInfo({
  name,
  email,
  driversLicenseEmitted,
  driversLicenseExpires,
}: {
  name?: string;
  email?: string;
  driversLicenseEmitted?: Date;
  driversLicenseExpires?: Date;
}) {
  return (
    <div className=" w-1/2">
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name ? name : "N/A"}
            readOnly
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email ? email : "N/A"}
            readOnly
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700">
            Driver{"'"}s License Emitted
          </label>
          <input
            type="text"
            value={
              driversLicenseEmitted
                ? format(new Date(driversLicenseEmitted), "PPP")
                : "N/A"
            }
            readOnly
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700">
            Driver{"'"}s License Expires
          </label>
          <input
            type="text"
            value={
              driversLicenseExpires
                ? format(new Date(driversLicenseExpires), "PPP")
                : "N/A"
            }
            readOnly
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
}
