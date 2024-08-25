import { SidebarItem } from "./sidebar";
import { sectionItems } from "./sidebar-items";

import { UserMe } from "@/lib/api";
import { useCurrentUser } from "@/lib/context/current-user";

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
  const contextValue = useCurrentUser();

  const currentUser = contextValue?.currentUser;

  if (currentUser && currentUser?.organizations?.length > 0) {
    return [...sectionItems, getYourOrganizations(currentUser)];
  }

  return [...sectionItems];
}
