import Image from "next/image";
import { getUser } from "@/lib/session";
import { format } from "date-fns";
import dynamic from "next/dynamic";

const PhotoUploadForm = dynamic(() => import("@/components/PhotoUploadForm"), {
  ssr: false,
});

export default async function ProfilePage() {
  const user = await getUser();
  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-gray-100 pt-16">
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <div className="flex flex-col items-center space-x-4">
            <Image
              src={user.image || "/default-profile.png"}
              alt={user.name || "User"}
              width={80}
              height={80}
              className="rounded-full"
            />
            <div className="mt-4">
              <h2 className="text-xl text-center font-bold">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>
        <nav className="mt-6">
          <ul>
            <li className="mb-2">
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 block py-2 px-6"
              >
                Profile
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 block py-2 px-6"
              >
                Rentals
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4">Profile</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                value={user.name ? user.name : "N/A"}
                readOnly
                className="w-full px-4 py-2 border rounded-lg bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={user.email ? user.email : "N/A"}
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
                  user.driversLicenseEmitted
                    ? format(new Date(user.driversLicenseEmitted), "PPP")
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
                  user.driversLicenseExpires
                    ? format(new Date(user.driversLicenseExpires), "PPP")
                    : "N/A"
                }
                readOnly
                className="w-full px-4 py-2 border rounded-lg bg-gray-100"
              />
            </div>
          </div>
          <PhotoUploadForm />
        </div>
      </main>
    </div>
  );
}
