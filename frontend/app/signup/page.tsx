"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { UsersApi } from "@/lib/api"; // Adjust the import based on your OpenAPI client setup

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    pronouns: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirmation: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userApi = new UsersApi();

      await userApi.postUser({
        userPostRequest: {
          username: formData.username,
          pronouns: formData.pronouns,
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          password: formData.password,
          passwordConfirmation: formData.passwordConfirmation,
        },
      });

      router.push("/login");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error creating user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" type="text" onChange={handleChange} />
      <input name="pronouns" placeholder="Pronouns" type="text" onChange={handleChange} />
      <input name="email" placeholder="Email" type="email" onChange={handleChange} />
      <input name="firstName" placeholder="First Name" type="text" onChange={handleChange} />
      <input name="lastName" placeholder="Last Name" type="text" onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} />
      <input name="passwordConfirmation" placeholder="Password Confirmation" type="password" onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
