import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithWithWrappers } from "../../test/utils";
import CurrentEmployees from ".";

const mockEmployeesShortArr = [
  {
    firstName: "Joe",
    lastName: "Schmoe",
    dateOfBirth: "12/05/1971",
    startDate: "01/01/2014",
    department: "Legal",
    street: "763 Olive Street",
    city: "New Kensington",
    state: "PA",
    zipCode: "15069",
  },
  {
    firstName: "Linda",
    lastName: "Hurst",
    dateOfBirth: "22/08/1985",
    startDate: "01/01/2017",
    department: "Marketing",
    street: "331 Charles Street",
    city: "Deltona",
    state: "FL",
    zipCode: "32725",
  },
  {
    firstName: "Susan",
    lastName: "Owens",
    dateOfBirth: "09/05/1998",
    startDate: "01/01/2021",
    department: "Human Resources",
    street: "159 Mulholland Drive",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90077",
  },
];

const mockEmployeesFullArr = [
  ...mockEmployeesShortArr,
  {
    firstName: "Michael",
    lastName: "Johnson",
    dateOfBirth: "15/03/1980",
    startDate: "10/06/2015",
    department: "Engineering",
    street: "456 Maple Avenue",
    city: "Seattle",
    state: "WA",
    zipCode: "98101",
  },
  {
    firstName: "Emily",
    lastName: "Williams",
    dateOfBirth: "30/11/1990",
    startDate: "15/03/2018",
    department: "Sales",
    street: "789 Pine Road",
    city: "Austin",
    state: "TX",
    zipCode: "78701",
  },
  {
    firstName: "David",
    lastName: "Brown",
    dateOfBirth: "18/07/1975",
    startDate: "22/09/2012",
    department: "Sales",
    street: "101 Oak Lane",
    city: "Boston",
    state: "MA",
    zipCode: "02108",
  },
  {
    firstName: "Jessica",
    lastName: "Miller",
    dateOfBirth: "04/02/1988",
    startDate: "05/11/2019",
    department: "Legal",
    street: "202 Cedar Boulevard",
    city: "Denver",
    state: "CO",
    zipCode: "80202",
  },
  {
    firstName: "Robert",
    lastName: "Davis",
    dateOfBirth: "27/09/1993",
    startDate: "12/07/2020",
    department: "Sales",
    street: "303 Birch Street",
    city: "Portland",
    state: "OR",
    zipCode: "97201",
  },
  {
    firstName: "Sarah",
    lastName: "Garcia",
    dateOfBirth: "11/06/1982",
    startDate: "08/04/2016",
    department: "Marketing",
    street: "404 Elm Avenue",
    city: "Chicago",
    state: "IL",
    zipCode: "60601",
  },
  {
    firstName: "Thomas",
    lastName: "Martinez",
    dateOfBirth: "19/12/1978",
    startDate: "17/05/2013",
    department: "Legal",
    street: "505 Spruce Drive",
    city: "Atlanta",
    state: "GA",
    zipCode: "30301",
  },
  {
    firstName: "Yasmin",
    lastName: "Robinson",
    dateOfBirth: "08/10/1995",
    startDate: "20/02/2022",
    department: "Engineering",
    street: "606 Willow Lane",
    city: "San Francisco",
    state: "CA",
    zipCode: "94102",
  },
];

describe("The CurrentEmployees component", () => {
  it("should render without crashing", () => {
    renderWithWithWrappers(<CurrentEmployees />);

    expect(screen.getByText("Current Employees")).toBeInTheDocument();
  });

  it("should render employees", () => {
    const preloadedState = {
      employees: mockEmployeesShortArr,
    };
    renderWithWithWrappers(<CurrentEmployees />, { preloadedState });

    expect(screen.getByText("Joe")).toBeInTheDocument();
    expect(screen.getByText("Linda")).toBeInTheDocument();
    expect(screen.getByText("Susan")).toBeInTheDocument();
  });

  it("should render only matching employees when the user searches a term in the searchbar", async () => {
    const user = userEvent.setup();
    const preloadedState = {
      employees: mockEmployeesShortArr,
    };
    renderWithWithWrappers(<CurrentEmployees />, { preloadedState });

    const input = screen.getByLabelText("Search:");
    await user.type(input, "Linda");

    expect(screen.getByText("Linda")).toBeInTheDocument();
    expect(screen.queryByText("Joe")).not.toBeInTheDocument();
    expect(screen.queryByText("Susan")).not.toBeInTheDocument();
  });

  it("should render employees sorted in ascending order when the user clicks on a sort button once", async () => {
    const user = userEvent.setup();
    const preloadedState = {
      employees: mockEmployeesShortArr,
    };
    renderWithWithWrappers(<CurrentEmployees />, { preloadedState });

    await user.click(screen.getByRole("button", { name: "Department" }));
    const departmentsTexts = screen
      .getAllByText(/Legal|Marketing|Human Resources/)
      .map((el) => el.textContent);
    const ascendingSortedTexts = ["Human Resources", "Legal", "Marketing"];

    expect(departmentsTexts).toEqual(ascendingSortedTexts);
  });

  it("should render employees sorted in descending order when the user clicks on a sort button twice", async () => {
    const user = userEvent.setup();
    const preloadedState = {
      employees: mockEmployeesShortArr,
    };
    renderWithWithWrappers(<CurrentEmployees />, { preloadedState });

    await user.click(screen.getByRole("button", { name: "Department" }));
    await user.click(screen.getByRole("button", { name: "Department" }));
    const departmentsTexts = screen
      .getAllByText(/Legal|Marketing|Human Resources/)
      .map((el) => el.textContent);
    const descendingSortedTexts = ["Marketing", "Legal", "Human Resources"];

    expect(departmentsTexts).toEqual(descendingSortedTexts);
  });

  it("should disable the previous page button if there is no previous page", () => {
    renderWithWithWrappers(<CurrentEmployees />, {
      preloadedState: { employees: mockEmployeesShortArr },
    });

    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
  });

  it("should disable the next page button if there is no next page", () => {
    renderWithWithWrappers(<CurrentEmployees />, {
      preloadedState: { employees: mockEmployeesShortArr },
    });

    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
  });

  it("should go to the next page on next page button click and on the previous page on previous page button click", async () => {
    const user = userEvent.setup();
    renderWithWithWrappers(<CurrentEmployees />, {
      preloadedState: { employees: mockEmployeesFullArr },
    });

    expect(screen.getByTestId("page-nb").textContent).toBe("1");
    expect(screen.getByText("Joe")).toBeInTheDocument();
    expect(screen.queryByText("Yasmin")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Next page" }));
    expect(screen.getByTestId("page-nb").textContent).toBe("2");
    expect(screen.queryByText("Joe")).not.toBeInTheDocument();
    expect(screen.getByText("Yasmin")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Previous page" }));
    expect(screen.getByTestId("page-nb").textContent).toBe("1");
    expect(screen.getByText("Joe")).toBeInTheDocument();
    expect(screen.queryByText("Yasmin")).not.toBeInTheDocument();
  });

  it("should show rows based on max number of rows select value ", async () => {
    const user = userEvent.setup();
    renderWithWithWrappers(<CurrentEmployees />, {
      preloadedState: { employees: mockEmployeesFullArr },
    });

    //by default, 10 employee rows are shown (+ 1 headers row)
    expect(screen.getAllByRole("row").length).toBe(10 + 1);
    expect(screen.queryByText("Yasmin")).not.toBeInTheDocument();

    await user.click(screen.getByLabelText("Show rows"));
    await user.selectOptions(screen.getByRole("listbox"), "25");

    expect(screen.getAllByRole("row").length).toBe(11 + 1);
    expect(screen.getByText("Yasmin")).toBeInTheDocument();
  });
});
