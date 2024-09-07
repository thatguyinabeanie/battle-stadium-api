"use client";

import React from "react";
import { SignIn, useUser } from "@clerk/nextjs";

export default function Component() {
  const { user } = useUser();

  if (user) {
    return <div>You are signed in.. </div>;
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
        {<SignIn />}
      </div>
    </div>
  );
}
