import { Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { m } from "framer-motion";

import { providerSignIn } from "@/lib/server-actions/sign-in";
import { useAuthProviders } from "@/components/auth/providers-context";

export default function AuthProviders() {
  const providers = useAuthProviders();

  return (
    <div className="flex flex-col gap-2">
      {Object.values(providers).map((provider) => (
        <m.form key={provider.id} action={() => providerSignIn(provider.id)}>
          <Button
            fullWidth
            startContent={
              <Icon
                className="text-default-500"
                icon={ provider.icon}
                width={20}
              />
            }
            type="submit"
            variant="flat"
          >
            <span>Sign in with {provider.name}</span>
          </Button>
        </m.form>
      ))}
    </div>
  );
}
