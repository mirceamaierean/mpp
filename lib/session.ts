import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import prisma from "./prisma";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  return session?.user;
}

export async function getUser() {
  const userInSession = await getCurrentUser();
  if (!userInSession) return null;

  const user = await prisma.user.findUnique({
    where: {
      email: userInSession.email as string,
    },
  });

  return user;
}

export async function isUserAdmin() {
  const user = await getUser();
  return user?.role === "admin";
}
