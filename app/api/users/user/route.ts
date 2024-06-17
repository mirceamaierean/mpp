import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/session";

export async function GET(req: NextRequest) {
  let email = req.nextUrl.searchParams.get("email");
  if (!email) {
    return new NextResponse("Missing email", { status: 400 });
  }
  // get the user
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }
  return new NextResponse("User found", { status: 200 });
}

export async function POST(req: NextRequest) {
  const loggedInUser = await getUser();
  if (!loggedInUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  let { category, name, issueDate, expiryDate } = await req.json();

  if (!loggedInUser.email) {
    return new NextResponse("Missing email", { status: 400 });
  }
  // check if category is valid. it means it has B in it
  if (!category.includes("B")) {
    return new NextResponse("Invalid category", { status: 400 });
  }
  // ensure the expiry date is in the future
  if (new Date(expiryDate) < new Date()) {
    return new NextResponse("Invalid expiry date for ", { status: 400 });
  }

  if (!issueDate) {
    if (!expiryDate) {
      return new NextResponse("Missing issue and expiry date", { status: 400 });
    }
    // issue date is not provided, set it to 10 years before expiry date
    issueDate = new Date(expiryDate);
    issueDate.setFullYear(issueDate.getFullYear() - 10);
  }

  if (!expiryDate) {
    // set expiry date to 10 years after issue date
    expiryDate = new Date(issueDate);
    expiryDate.setFullYear(expiryDate.getFullYear() + 10);
  }

  issueDate = new Date(issueDate);
  expiryDate = new Date(expiryDate);

  // update the user with the driver license info
  const user = await prisma.user.update({
    where: {
      email: loggedInUser.email,
    },
    data: {
      name: name,
      driversLicenseEmitted: issueDate,
      driversLicenseExpires: expiryDate,
    },
  });

  console.log("User updated", user);

  return new NextResponse(JSON.stringify(user), {
    status: 200,
  });
}
