import { render, screen } from "@testing-library/react";
import Page from "@/app/page";
import { describe, expect, test } from 'bun:test';

describe("Page", () => {
  test("renders the correct text", () => {
    render(<Page />);
    const text = screen.getByText(/Beautiful, fast and modern React UI library./i);

    expect(text).toBeDefined();
  });
});
