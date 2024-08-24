import { render } from "@testing-library/react";

import OrganizationCard from "@/components/organizations/OrganizationCard";
import { OrganizationFactory } from "@/factories";

describe("OrganizationCard", () => {
  const organization = OrganizationFactory.build();

  it("renders organization name correctly", () => {
    const { getByText } = render(<OrganizationCard organization={organization} />);

    expect(getByText(organization.name)).toBeDefined();
  });

  it("renders default image", async () => {
    const { findAllByAltText } = render(<OrganizationCard organization={organization} />);

    const images = await findAllByAltText(organization.name);

    expect(images.length).toBe(4);
    expect(images[0]).toBeDefined();
    expect(images[1]).toBeDefined();
  });
});
