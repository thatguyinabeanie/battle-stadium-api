import { render, screen } from "@testing-library/react";

import OrganizationPage from "@/app/organizations/page";

describe("Organizations Page", () => {
  it("renders the correct text", async () => {
    render(await OrganizationPage());
    const text = screen.getByText(/Organizations/i);

    expect(text).toBeDefined();
  });
});
