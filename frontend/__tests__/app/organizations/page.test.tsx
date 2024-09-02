import { render, screen} from "@testing-library/react";
import OrganizationPage from "@/app/organizations/page";

describe("Organizations Page", () => {
  test("should render the organization page", async () => {
    render(await OrganizationPage());

    const orgName = screen.getByTestId("org-name");

    expect(orgName).toBeDefined();

  });
});
