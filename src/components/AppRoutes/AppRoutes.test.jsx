import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithWithWrappers } from "../../test/utils";
import AppRoutes from ".";

// NEW EMPLOYEE CREATION INTEGRATION TEST

describe("When i fill the form on the home page to create a new employee", () => {
  it("should show the employee i just created on the current employees page", async () => {
    const user = userEvent.setup();
    renderWithWithWrappers(<AppRoutes />);

    await user.type(screen.getByLabelText("First Name"), "Julia");
    await user.type(screen.getByLabelText("Last Name"), "May");
    await user.type(screen.getByLabelText("Date of Birth"), "07/02/2001");
    await user.type(screen.getByLabelText("Start Date"), "01/01/2023");
    await user.type(screen.getByLabelText("Street"), "555 Front Street");
    await user.type(screen.getByLabelText("City"), "San Diego");
    await user.click(screen.getByLabelText("State"));
    await user.selectOptions(screen.getByRole("listbox"), "California");
    await user.type(screen.getByLabelText("Zip Code"), "92101");
    await user.click(screen.getByLabelText("Department"));
    await user.selectOptions(screen.getByRole("listbox"), "Marketing");
    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(screen.getByText("Employee Created!")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "close" }));
    await user.click(screen.getByText("Current Employees"));

    expect(screen.getByText("Julia")).toBeInTheDocument();
    expect(screen.getByText("May")).toBeInTheDocument();
    expect(screen.getByText("07/02/2001")).toBeInTheDocument();
    expect(screen.getByText("Marketing")).toBeInTheDocument();
    expect(screen.getByText("01/01/2023")).toBeInTheDocument();
    expect(screen.getByText("555 Front Street")).toBeInTheDocument();
    expect(screen.getByText("San Diego")).toBeInTheDocument();
    expect(screen.getByText("CA")).toBeInTheDocument();
    expect(screen.getByText("92101")).toBeInTheDocument();
  });
});
