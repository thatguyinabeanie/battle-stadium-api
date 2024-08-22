"use client";

import React from "react";
import { Button, Input, Link, Divider } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { m } from "framer-motion";

import { providerMap } from "@/auth";
import { signIn } from "@/lib/server-actions/sign-in";
import { AnimatePresence, domAnimation, LazyMotion, ResizablePanel } from "@/components/client";

const orDivider = (
  <div className="flex items-center gap-4 py-2">
    <Divider className="flex-1" />
    <p className="shrink-0 text-tiny text-default-500">OR</p>
    <Divider className="flex-1" />
  </div>
);

const variants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 10 },
};

const AuthProviders = () => {
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
};

const SignUp = () => {
  return (
    <p className="mt-3 text-center text-small">
      Need to create an account?&nbsp;
      <Link href="#" size="sm">
        Sign Up
      </Link>
    </p>
  );
};

interface LoginFormProps {
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmailLoginForm = ({ setIsFormVisible }: LoginFormProps) => {
  return (
    <m.form
      animate="visible"
      className="flex flex-col gap-y-3"
      exit="hidden"
      initial="hidden"
      variants={variants}
      onSubmit={(e) => e.preventDefault()}
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
};

EmailLoginForm.displayName = "EmailLoginForm";

const LoginOptions = ({ setIsFormVisible }: LoginFormProps) => {
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
};

LoginOptions.displayName = "LoginOptions";
function LoginForm() {
  const [isFormVisible, setIsFormVisible] = React.useState(false);

  const LoginFormComponent = isFormVisible ? EmailLoginForm : LoginOptions;

  return (
    <ResizablePanel>
      <h1 className="mb-4 text-xl font-medium">Log In</h1>
      <AnimatePresence initial={false} mode="popLayout">
        <LazyMotion features={domAnimation}>
          <LoginFormComponent aria-label={"LoginForm"} setIsFormVisible={setIsFormVisible} />)
        </LazyMotion>
      </AnimatePresence>
    </ResizablePanel>
  );
}
LoginForm.displayName = "LoginForm";

export default LoginForm();
