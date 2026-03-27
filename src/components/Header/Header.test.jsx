import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from ".";
import { MemoryRouter } from "react-router";

describe("The Header component", () => {
  it("should render without crashing", () => {
    render(<Header />, { wrapper: MemoryRouter });
    expect(screen.getByText("HRnet")).toBeInTheDocument();
  });
});
