import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about who we are and what we do",
};

export default function About() {
  return (
    <div>
      <h1>About</h1>
      <p>Learn more about us</p>
    </div>
  );
}
