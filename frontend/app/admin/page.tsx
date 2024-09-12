import { Text } from "@/components/text";
import { Metadata } from "next";
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
