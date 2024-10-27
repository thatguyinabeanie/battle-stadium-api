"use client";

import { SignIn, useUser } from "@clerk/nextjs";

export default function SignInPage() {
  const { user } = useUser();

  if (user) {
    return <div>You are signed in.. </div>;
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <SignIn />
    </div>
  );
}
