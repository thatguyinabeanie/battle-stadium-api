import { render } from "@testing-library/react";
import OrganizationCard from "@/components/organizations/OrganizationCard";
import { Organization } from "@/api";
import factories from "@/factories";

describe("OrganizationCard", () => {
  const organization: Organization = {
    id: 1,
    name: "Organization Name",
    description: "Organization Description",

  };
  it("renders organization name correctly", () => {
    const { getByText } = render(
      <OrganizationCard organization={organization} />
    );
    expect(getByText(organization.name)).toBeInTheDocument();
  });

  it("renders default image", () => {
    const { getByAltText } = render(
      <OrganizationCard organization={organization} />
    );
    expect(getByAltText("Woman listing to music")).toBeInTheDocument();
  });
});
