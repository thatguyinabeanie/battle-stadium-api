import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

import Page from "@/app/page";

describe("Page", () => {
  test("renders the correct text", () => {
    render(
      <SessionProvider session={null}>
        <Page />
      </SessionProvider>,
    );
    const text = screen.getByText(/Beautiful, fast and modern React UI library./i);

    expect(text).toBeDefined();
  });
});
