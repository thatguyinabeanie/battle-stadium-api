"use client";

import React from "react";
import { SignUp, useUser } from "@clerk/nextjs";

export const runtime = "edge";

export default function SignUpPage() {
  const { user } = useUser();

  if (user) {
    return <div>You are signed in.. </div>;
  }

  return <SignUp path="/sign-up" routing="path" />;
}
