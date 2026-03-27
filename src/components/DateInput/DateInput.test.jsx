import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DateInput from ".";

describe("The DateInput component", () => {
  it("should render without crashing", () => {
    render(<DateInput />);
  });

  it("should open and close calendar on button click", async () => {
    const user = userEvent.setup();
    render(<DateInput />);
    await user.click(screen.getByRole("button", { name: "open calendar" }));
    const calendar = screen.queryByTestId("calendar");
    expect(calendar).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "close calendar" }));
    expect(calendar).not.toBeInTheDocument();
  });

  it("should replace input value with selected date afer picking a date in the calendar", async () => {
    const user = userEvent.setup();
    render(<DateInput />);
    const input = screen.getByRole("textbox");
    await user.type(input, "31/12/1999");
    expect(input.value).toBe("31/12/1999");
    await user.click(screen.getByRole("button", { name: "open calendar" }));
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Choose the Month" }),
      "January",
    );
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Choose the Year" }),
      "2000",
    );
    await user.click(screen.getByRole("button", { name: "Saturday, January 1st, 2000" }));
    expect(input.value).toBe("01/01/2000");
  });
});
