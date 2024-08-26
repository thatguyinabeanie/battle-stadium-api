import { render, screen } from "@testing-library/react";

import Page from "@/app/(dynamic)/page";

describe("Page", () => {
  test("renders the correct text", () => {
    render(<Page />);
    const text = screen.getByText(/Beautiful, fast and modern React UI library./i);

    expect(text).toBeDefined();
  });
});
