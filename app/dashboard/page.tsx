import AdminDashboard from "@/components/AdminDashboard";
import { getUser } from "@/lib/session";
export default async function Home() {
  const user = await getUser();
  if (!user) {
    return null;
  }

  if (user.role !== "admin") {
    return null;
  }
  return <AdminDashboard user={user} />;
}
