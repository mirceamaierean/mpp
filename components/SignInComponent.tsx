import Login from "@/components/Login";

import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";

export default async function SignInForm() {
  const user = await getCurrentUser();

  if (user) return redirect("/dashboard/cars");

  return (
    <div className="bg-white h-96">
      <div className="justify-center mx-auto">
        <div className="mx-auto">
          <Login />
        </div>
      </div>
    </div>
  );
}
