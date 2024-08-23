import { Button, Input } from "@nextui-org/react";
import { m } from "framer-motion";

import { Icon } from "../client";

import { LoginFormProps, orDivider, variants } from "./common";

import { credentialsSignIn } from "@/lib/server-actions/sign-in";

export default function EmailLoginForm({ setIsFormVisible }: LoginFormProps) {
  return (
    <m.form
      action={credentialsSignIn}
      animate="visible"
      className="flex flex-col gap-y-3"
      exit="hidden"
      initial="hidden"
      variants={variants}
    >
      <Input label="Email Address" name="email" type="email" variant="bordered" />
      <Input label="Password" name="password" type="password" variant="bordered" />

      <Button color="primary" type="submit">
        Log In
      </Button>

      {orDivider}
      <Button
        fullWidth
        startContent={<Icon className="text-default-500" icon="solar:arrow-left-linear" width={18} />}
        variant="flat"
        onPress={() => setIsFormVisible(false)}
      >
        Other Login options
      </Button>
    </m.form>
  );
}
