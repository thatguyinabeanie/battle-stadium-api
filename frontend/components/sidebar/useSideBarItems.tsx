import { UserMe } from "@/lib/api";

import { SidebarItem } from "./sidebar";
import { sectionItems } from "./sidebar-items";
import { useUser } from "@clerk/nextjs";

const getYourOrganizations = (currentUser: UserMe) => {
  const yourOrganizations: SidebarItem = {
    key: "your-organizations",
    title: "Your Organizations",
    items: (currentUser?.organizations ?? []).map((org) => ({
      key: `organization-${org.id}`,
      href: `/organizations/${org.id}`,
      title: org.name,
    })),
  };

  return yourOrganizations;
};

export default function useSideBarItems() {

  const { isSignedIn, user, isLoaded } = useUser();

  if (user && isSignedIn && isLoaded) {
    const orgMemberships = user?.getOrganizationMemberships();
  }

  return [...sectionItems];
}
