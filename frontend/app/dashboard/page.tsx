"use client";

import { useUser } from "@clerk/nextjs";

export default function Dashboard() {
  const { isSignedIn, user } = useUser();

  if (user && isSignedIn) {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>Welcome, {user?.fullName}!</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, please sign in to continue.</p>
    </div>
  );
}
