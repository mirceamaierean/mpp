import CloudinaryImage from "./CloudinaryImage";
import PhotoUploadForm from "./PhotoUploadForm";
import UserInfo from "./UserInfo";
import { User } from "@prisma/client";

export default function ProfileComponent({
  user,
  imagePath,
}: {
  user: User;
  imagePath: String;
}) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="flex flex-row">
        <UserInfo
          name={user.name as string}
          email={user.email as string}
          driversLicenseEmitted={user.driversLicenseEmitted as Date}
          driversLicenseExpires={user.driversLicenseExpires as Date}
        />
        {imagePath && (
          <CloudinaryImage
            imageSource={imagePath as string}
            alt="Driver's License"
            width={500}
            height={300}
            className="rounded-lg mx-auto w-fit-content"
          />
        )}
      </div>
      <PhotoUploadForm />
    </div>
  );
}
