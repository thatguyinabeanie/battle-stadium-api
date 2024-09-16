import { SignOutButton, useUser } from "@clerk/nextjs";

import { cn } from "@/lib";

export interface LogoutProps {
  isCompact: boolean;
}

export default function SignOut({ isCompact }: Readonly<LogoutProps>) {
  const { user, isSignedIn } = useUser();

  if (!(user && isSignedIn)) {
    return null;
  }

  return (
    <div
      className={cn("mt-auto flex flex-col", {
        "items-center": isCompact,
      })}
    >
      <SignOutButton>
        <button>Sign out</button>
      </SignOutButton>
    </div>
  );
}
