import { render, screen } from "@testing-library/react";

import OrganizationPage from "@/app/organizations/page";

describe("Organizations Page", () => {
  test.skip("should render the organization page", async () => {
    render(await OrganizationPage());

    const orgName = screen.getAllByTestId("org-name");

    expect(orgName).toBeGreaterThan(0);
  });
});
