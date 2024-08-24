import { render, screen } from "@testing-library/react";

import OrganizationPage from "@/app/organizations/page";
import BattleStadiumAPI from "@/lib/battle-stadium-api";
describe("Organizations Page", () => {
  it("renders the correct text", async () => {
    spyOn(BattleStadiumAPI.Organizations, "list").mockResolvedValue([]);

    render(await OrganizationPage());
    const text = screen.getByText(/Organizations/i);

    expect(text).toBeDefined();
  });
});
