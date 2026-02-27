import { useDispatch } from "react-redux";
import states from "../../statesData";
import { addEmployee } from "../../slices/employeesSlice";

export default function Home() {
  const dispatch = useDispatch();

  function handleSubmit(formData) {
    const employee = {
      firstName: formData.get("first-name"),
      lastName: formData.get("last-name"),
      dateOfBirth: formData.get("date-of-birth"),
      startDate: formData.get("start-date"),
      department: formData.get("department"),
      street: formData.get("street"),
      city: formData.get("city"),
      state: formData.get("state"),
      zipCode: formData.get("zip-code"),
    };

    dispatch(addEmployee(employee));
  }

  return (
    <div>
      <h1>Home</h1>
      <div className="bg-white mt-8 ml-auto mr-auto max-w-lg rounded-xl p-6">
        <h2>Create Employee</h2>

        <form action={handleSubmit} className="mt-4 flex flex-col gap-4 items-center">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="first-name">First Name</label>
            <input id="first-name" name="first-name" type="text" />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="last-name">Last Name</label>
            <input id="last-name" name="last-name" type="text" />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="date-of-birth">Date of Birth</label>
            <input id="date-of-birth" name="date-of-birth" type="date" />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="start-date">Start Date</label>
            <input id="start-date" name="start-date" type="date" />
          </div>

          <div className="border-t-4 border-dotted border-light-middle-grey w-full mt-1 mb-1"></div>

          <fieldset className="w-full">
            <legend className="font-bold mb-2">Address</legend>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="street">Street</label>
                <input id="street" name="street" type="text" />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="city">City</label>
                <input id="city" name="city" type="text" />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="state">State</label>
                <select id="state" name="state">
                  {states.map((state) => {
                    return (
                      <option key={state.abbreviation} value={state.abbreviation}>
                        {state.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="zip-code">Zip Code</label>
                <input id="zip-code" name="zip-code" type="number" />
              </div>
            </div>
          </fieldset>

          <div className="border-t-4 border-dotted border-light-middle-grey w-full mt-1 mb-1"></div>

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="department">Department</label>
            <select id="department" name="department">
              <option>Sales</option>
              <option>Marketing</option>
              <option>Engineering</option>
              <option>Human Resources</option>
              <option>Legal</option>
            </select>
          </div>
          <button className="bg-purple hover:bg-purple-darkened pt-2 pb-2 pl-3 pr-3 text-white cursor-pointer w-fit min-w-28 rounded-sm">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
