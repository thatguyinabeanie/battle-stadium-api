import { Button } from "@nextui-org/react";
import { m } from "framer-motion";

import { Icon } from "../../components/client";

import { credentialsSignIn } from "@/lib/server-actions/sign-in";

export default function SignUp() {
  return (
    <m.form action={ credentialsSignIn }>
      <p className="mt-3 text-center text-small">
        Need to create an account?&nbsp;

          <Button
            fullWidth
            startContent={<Icon className="text-default-500" icon={"logos:people"} width={20} />}
            type="submit"
            variant="flat"
          >
            <span>Sign Up</span>
          </Button>
      </p>
    </m.form>
  );
}
