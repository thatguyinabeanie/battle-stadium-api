import { render, screen } from "@testing-library/react";

import OrganizationPage from "@/app/organizations/page";
import { BattleStadiumAPI } from "@/lib/api";
import { OrganizationFactory } from "@/factories";


// Mock the headers function
// Mock the headers function manually


describe("Organizations Page", () => {
  it("renders the correct text", async () => {
    const org = OrganizationFactory.build();

    spyOn(BattleStadiumAPI().Organizations, "list").mockResolvedValue([org]);

    render(await OrganizationPage());
    const text = screen.getByText(org.name);

    expect(text).toBeDefined();
  });
});
