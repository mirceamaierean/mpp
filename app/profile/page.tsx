import ProfilePage from "@/components/ProfilePage";
import { getUser } from "@/lib/session";
import { User } from "@prisma/client";

export default async function Home() {
  const user = (await getUser()) as User;
  if (!user) return null;
  return <ProfilePage user={user} />;
}
