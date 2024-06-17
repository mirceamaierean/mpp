"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface IUser {
  name: string;
  image: string;
}

export default function UserProfile({ name, image }: IUser) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative h-10 w-10 cursor-pointer select-none rounded-full">
          <Image
            src={image}
            alt="user"
            layout="fill"
            className="rounded-full"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            signOut({
              callbackUrl: `${window.location.origin}`,
            });
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
