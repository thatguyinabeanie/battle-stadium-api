import React from "react";

import LoginForm from "@/components/auth/login-form";
import { providersMap } from "@/lib/auth/";
import { AuthProvidersContextProvider } from "@/components/auth/providers-context";

export default function Component() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
        <AuthProvidersContextProvider providers={providersMap}>
          <LoginForm />
        </AuthProvidersContextProvider>
      </div>
    </div>
  );
}
