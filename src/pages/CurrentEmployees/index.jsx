import { useSelector } from "react-redux";

export default function CurrentEmployees() {
  const employees = useSelector((state) => state.employees);
  return (
    <div>
      <h1>Current Employees</h1>
      <div className="bg-white mt-8 ml-auto mr-auto max-w-5xl rounded-xl p-6">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Start Date</th>
              <th>Department</th>
              <th>Date of Birth</th>
              <th>Street</th>
              <th>City</th>
              <th>State</th>
              <th>Zip Code</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => {
              return (
                <tr>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.startDate}</td>
                  <td>{employee.department}</td>
                  <td>{employee.dateOfBirth}</td>
                  <td>{employee.street}</td>
                  <td>{employee.city}</td>
                  <td>{employee.state}</td>
                  <td>{employee.zipCode}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
