import { Button } from "@nextui-org/react";
import React from "react";
import { Icon } from "@iconify/react";
import { m } from "framer-motion";

import { LoginFormProps, orDivider, variants } from "./common";
import AuthProviders from "./auth-providers";
import SignUp from "./sign-up";

const LoginOptions = React.forwardRef<HTMLDivElement, LoginFormProps>(({ setIsFormVisible }, ref) => {
  return (
    <div ref={ref}>
      <Button
        fullWidth
        color="primary"
        startContent={<Icon className="pointer-events-none text-2xl" icon="solar:letter-bold" />}
        type="button"
        onPress={() => setIsFormVisible(true)}
      >
        Continue with Email
      </Button>

      {orDivider}

      <m.div animate="visible" className="flex flex-col gap-y-2" exit="hidden" initial="hidden" variants={variants}>
        <AuthProviders />
        <SignUp />
      </m.div>
    </div>
  );
});

LoginOptions.displayName = "LoginOptions";

export default LoginOptions;
