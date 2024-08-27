import { Button } from "@nextui-org/react";
import React from "react";
import { Icon } from "@iconify/react";
import { m } from "framer-motion";

import SignUp from "../../lib/server-actions/sign-up";

import { LoginFormProps, orDivider, variants } from "./common";
import AuthProviders from "./auth-providers";

export default function LoginOptions({ setIsFormVisible }: LoginFormProps) {
  return (
    <>
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
    </>
  );
}
