"use client";
import { useRouter } from "next/navigation";

import React from "react";
import { Button, Input } from "../nextui/client-components";
import { createProfile } from "@/app/server-actions/profiles/actions";
import { AccountMe } from "@/lib/api";
import Form from "next/form";

interface NewProfileProps {
  me: AccountMe;
}

export default function NewProfile({ me }: NewProfileProps) {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    await createProfile(formData.get("profile") as string, me.id);
    router.push("/dashboard?tab=profiles");
  };

  return (
    <Form action={handleSubmit} className="flex flex-row">
      <Input name="profile" placeholder="new profile" />
      <Button color="primary" type="submit">
        Add Profile
      </Button>
    </Form>
  );
}
