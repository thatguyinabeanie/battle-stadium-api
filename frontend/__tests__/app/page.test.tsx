import { render, screen } from "@testing-library/react";

import Page from "@/app/SideBarComponent";

describe("Page", () => {
  it("renders the correct text", () => {
    render(<Page />);
    const text = screen.getByText(
      /Beautiful, fast and modern React UI library./i,
    );

    expect(text).toBeInTheDocument();
  });
});
