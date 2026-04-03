import { useState } from "react";
import { useDispatch } from "react-redux";
import { MenuSelect } from "@jeanne-v/menu-select";
import "@jeanne-v/menu-select/style.css";

import Modal from "../../components/Modal";
import states from "../../data/statesData";
import departments from "../../data/departmentsData";
import { addEmployee } from "../../slices/employeesSlice";
import styles from "./Home.module.css";
import DateInput from "../../components/DateInput";

export default function Home() {
  const [formKey, setFormKey] = useState(0);
  const [selectedDepartmentOption, setSelectedDepartmentOption] = useState(
    departments[0],
  );
  const [selectedStateOption, setSelectedStateOption] = useState(states[0]);

  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setSelectedDepartmentOption(departments[0]);
    setSelectedStateOption(states[0]);
    setFormKey((prevValue) => prevValue + 1);
    setIsModalOpen(true);
  }

  return (
    <div>
      <h1 className={styles.heading}>Home</h1>
      <div className={styles.content}>
        <h2 className={styles["sub-heading"]}>Create Employee</h2>

        <form action={handleSubmit} className={styles.form} key={formKey}>
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
            <DateInput id="date-of-birth" name="date-of-birth" />
          </div>

          <div className={styles["form-block"]}>
            <label htmlFor="start-date">Start Date</label>
            <DateInput id="start-date" name="start-date" />
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
                <p className={styles["menu-label"]} id="state-label">
                  State
                </p>
                <MenuSelect
                  options={states}
                  selectedOption={selectedStateOption}
                  onOptionSelect={setSelectedStateOption}
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
            <p className={styles["menu-label"]} id="department-label">
              Department
            </p>
            <MenuSelect
              options={departments}
              selectedOption={selectedDepartmentOption}
              onOptionSelect={setSelectedDepartmentOption}
              labelledby="department-label"
            />
          </div>
          <button className={styles.button}>Save</button>
        </form>
      </div>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        Employee Created!
      </Modal>
    </div>
  );
}
