import { useDispatch } from "react-redux";
import states from "../../statesData";
import { addEmployee } from "../../slices/employeesSlice";
import styles from "./Home.module.css";

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

              <div className={styles["form-block"]}>
                <label htmlFor="zip-code">Zip Code</label>
                <input id="zip-code" name="zip-code" type="number" />
              </div>
            </div>
          </fieldset>

          <div className={styles.separator}></div>

          <div className={styles["form-block"]}>
            <label htmlFor="department">Department</label>
            <select id="department" name="department">
              <option>Sales</option>
              <option>Marketing</option>
              <option>Engineering</option>
              <option>Human Resources</option>
              <option>Legal</option>
            </select>
          </div>
          <button className={styles.button}>Save</button>
        </form>
      </div>
    </div>
  );
}
