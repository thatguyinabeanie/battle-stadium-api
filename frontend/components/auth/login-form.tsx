"use client";

import React from "react";

import EmailLoginForm from "./email-log-in-form";
import LoginOptions from "./login-options";

import { AnimatePresence, domAnimation, LazyMotion, ResizablePanel } from "@/components/client";

export default function LoginForm() {
  const [isFormVisible, setIsFormVisible] = React.useState(false);

  const LoginFormComponent = isFormVisible ? EmailLoginForm : LoginOptions;

  return (
    <ResizablePanel aria-label={"LoginForm"}>
      <h1 className="mb-4 text-xl font-medium">Log In</h1>
      <AnimatePresence initial={false} mode="popLayout">
        <LazyMotion features={domAnimation}>
          <LoginFormComponent setIsFormVisible={setIsFormVisible}/>
        </LazyMotion>
      </AnimatePresence>
    </ResizablePanel>
  );
}
