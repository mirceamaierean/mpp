import AdminDashboard from "@/components/AdminDashboard";
import { getUser } from "@/lib/session";
export default async function Home() {
  const user = await getUser();
  if (!user) {
    return null;
  }

  if (user.role !== "admin") {
    // TODO: Display a message that the user is not authorized. Style it nicely.
    return null;
  }
  return <AdminDashboard user={user} />;
}
