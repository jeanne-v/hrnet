import { useState } from "react";
import { useDispatch } from "react-redux";
import { MenuSelect } from "menu-select";
import "menu-select/style.css";

import states from "../../statesData";
import departments from "../../departmentsData";
import { addEmployee } from "../../slices/employeesSlice";
import styles from "./Home.module.css";

export default function Home() {
  const [selectedDepartmentOption, setSelectedDepartmentOption] = useState(
    departments[0],
  );
  const [selectedStateOption, setSelectedStateOption] = useState(states[0]);

  const dispatch = useDispatch();

  function handleSubmit(formData) {
    const employee = {
      firstName: formData.get("first-name"),
      lastName: formData.get("last-name"),
      dateOfBirth: formData.get("date-of-birth"),
      startDate: formData.get("start-date"),
      department: selectedDepartmentOption.value,
      street: formData.get("street"),
      city: formData.get("city"),
      state: selectedStateOption.value,
      zipCode: formData.get("zip-code"),
    };

    dispatch(addEmployee(employee));
  }

  return (
    <div>
      <h1 className={styles.heading}>Home</h1>
      <div className={styles.content}>
        <h2 className={styles["sub-heading"]}>Create Employee</h2>

        <form action={handleSubmit} className={styles.form}>
          <div className={styles["form-block"]}>
            <label htmlFor="first-name">First Name</label>
            <input id="first-name" name="first-name" type="text" />
          </div>

          <div className={styles["form-block"]}>
            <label htmlFor="last-name">Last Name</label>
            <input id="last-name" name="last-name" type="text" />
          </div>

          <div className={styles["form-block"]}>
            <label htmlFor="date-of-birth">Date of Birth</label>
            <input id="date-of-birth" name="date-of-birth" type="date" />
          </div>

          <div className={styles["form-block"]}>
            <label htmlFor="start-date">Start Date</label>
            <input id="start-date" name="start-date" type="date" />
          </div>

          <div className={styles.separator}></div>

          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Address</legend>

            <div className={styles["inputs-grid"]}>
              <div className={styles["form-block"]}>
                <label htmlFor="street">Street</label>
                <input id="street" name="street" type="text" />
              </div>

              <div className={styles["form-block"]}>
                <label htmlFor="city">City</label>
                <input id="city" name="city" type="text" />
              </div>

              <div className={styles["form-block"]}>
                <p id="state-label">State</p>
                <MenuSelect
                  options={states}
                  selectedOption={selectedStateOption}
                  setSelectedOption={setSelectedStateOption}
                  labelledby="state-label"
                />
              </div>

              <div className={styles["form-block"]}>
                <label htmlFor="zip-code">Zip Code</label>
                <input id="zip-code" name="zip-code" type="number" />
              </div>
            </div>
          </fieldset>

          <div className={styles.separator}></div>

          <div className={styles["form-block"]}>
            <p id="department-label">Department</p>
            <MenuSelect
              options={departments}
              selectedOption={selectedDepartmentOption}
              setSelectedOption={setSelectedDepartmentOption}
              labelledby="department-label"
            />
          </div>
          <button className={styles.button}>Save</button>
        </form>
      </div>
    </div>
  );
}
