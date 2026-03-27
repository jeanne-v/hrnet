import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithWithWrappers } from "../../test/utils";
import Home from ".";

describe("The Home component", () => {
  it("should render without crashing", () => {
    renderWithWithWrappers(<Home />);

    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});
