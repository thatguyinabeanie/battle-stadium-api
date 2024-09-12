import { Metadata } from "next";

import { Text } from "@/components/text";
export const metadata: Metadata = {
  title: "Admin",
};
const Admin = () => {
  return (
    <div>
      <Text tag="h1" variant="header">
        Admin Pages here
      </Text>
    </div>
  );
};

export default Admin;
