import { Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { m } from "framer-motion";

import { signIn } from "@/lib/server-actions/sign-in";
import { providerMap } from "@/auth";

export default function AuthProviders() {
  return (
    <div className="flex flex-col gap-2">
      {Object.values(providerMap).map((provider) => (
        <m.form key={provider.id} action={() => signIn(provider.id)}>
          <Button
            fullWidth
            startContent={<Icon className="text-default-500" icon="fe:github" width={24} />}
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
