"use client";

import React from "react";
import { Button, Input } from "../nextui-use-client";

export default function NewProfile() {

  const [input, setInput] = React.useState<string>("");

  const handleSubmit = () => {
    console.log("submitting new profile", input);
  }

  return (
    <form className="flex flex-row" >
      <Input
        placeholder="new profile"
        name="profile"
        value={ input }
        onChange={ (e) => setInput(e.target.value) }
      />
      <Button color="primary" type="submit" onClick={handleSubmit}>
        Add Profile
      </Button>
    </form>
  )
}
