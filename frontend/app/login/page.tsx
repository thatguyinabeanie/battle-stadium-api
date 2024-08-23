import React from "react";

import LoginForm from "@/components/auth/login-form";
import { providers as providersRaw } from "@/auth.config";
import { AuthProvidersContextProvider } from "@/components/auth/providers-context";

export default function Component() {
  const providers = providersRaw
    .map((provider) => {
      if (typeof provider === "function") {
        const providerData = provider();

        return { id: providerData.id, name: providerData.name };
      } else {
        return { id: provider.id, name: provider.name };
      }
    })
    .filter((provider) => provider.id !== "credentials");

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
        <AuthProvidersContextProvider providers={providers} >
          <LoginForm />
        </AuthProvidersContextProvider>
      </div>
    </div>
  );
}
