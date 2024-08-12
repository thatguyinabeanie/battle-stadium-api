import { render } from "@testing-library/react";

import OrganizationCard from "@/components/organizations/OrganizationCard";
import { Organization } from "@/lib/api";

describe("OrganizationCard", () => {
  const organization: Organization = {
    id: 1,
    name: "Organization Name",
    description: "Organization Description",
    owner: {
      id: 1,
      username: "owner",
      pronouns: "they/them",
    },
  };

  it("renders organization name correctly", () => {
    const { getByText } = render(
      <OrganizationCard organization={organization} />,
    );

    expect(getByText(organization.name)).toBeInTheDocument();
  });

  it("renders default image", () => {
    const { getByAltText } = render(
      <OrganizationCard organization={organization} />,
    );

    expect(getByAltText("organization-image")).toBeInTheDocument();
  });
});
