import { render, screen } from "@testing-library/react";

import Page from "@/app/page";
import { ClerkProvider } from "@clerk/nextjs";

describe("Page", () => {
  test("renders the correct text", () => {
    render(
      <ClerkProvider>
        <Page />
      </ClerkProvider>,
    );
    const text = screen.getByText(/Beautiful, fast and modern React UI library./i);

    expect(text).toBeDefined();
  });
});
