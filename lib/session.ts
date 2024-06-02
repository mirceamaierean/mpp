import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import prisma from "./prisma";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  return session?.user;
}

export async function isUserAdmin() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return false;
  }

  const isAdmin = await prisma.user.findUnique({
    where: {
      email: session.user?.email as string,
    },
  });


  return isAdmin?.role === "admin";
}
