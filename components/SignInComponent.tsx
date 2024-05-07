import Login from "@/components/Login";

import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";

export default async function SignInForm() {
  const user = await getCurrentUser();

  if (user) return redirect("/dashboard");

  return (
    <div className="bg-white pt-12 sm:pt-0 sm:h-screen sm:w-1/2 max-w-2xl">
      <div className="flex flex-col justify-center mx-auto h-[90%]  px-8">
        <div className="mx-auto w-64">
          <Login />
        </div>
      </div>
    </div>
  );
}
