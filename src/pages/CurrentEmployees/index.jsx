import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./CurrentEmployees.module.css";

import sortIcon from "../../assets/sort.svg";
import sortUpIcon from "../../assets/sort-up.svg";
import sortDownIcon from "../../assets/sort-down.svg";

function getSearchFilteredRows(rows, searchFilter) {
  if (!searchFilter) {
    return rows;
  }

  const searchValue = searchFilter.toLowerCase();

  return rows.filter((row) => {
    const values = Object.values(row);
    return values.some((value) => value.toLowerCase().includes(searchValue));
  });
}

function getSortedRows(rows, sortObj) {
  if (!sortObj) {
    return rows;
  }

  return rows.toSorted((a, b) => {
    const valueA = a[sortObj.value];
    const valueB = b[sortObj.value];
    if (sortObj.type === "descending") {
      return valueB.localeCompare(valueA);
    } else {
      return valueA.localeCompare(valueB);
    }
  });
}

export default function CurrentEmployees() {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [currentSort, setCurrentSort] = useState(null);
  const employees = useSelector((state) => state.employees);
  const headers = [
    { text: "First Name", value: "firstName" },
    { text: "Last Name", value: "lastName" },
    { text: "Start Date", value: "startDate" },
    { text: "Department", value: "department" },
    { text: "Date of Birth", value: "dateOfBirth" },
    { text: "Street", value: "street" },
    { text: "City", value: "city" },
    { text: "State", value: "state" },
    { text: "Zip Code", value: "zipCode" },
  ];

  let rows = getSearchFilteredRows(employees, searchInputValue);

  rows = getSortedRows(rows, currentSort);

  function onSortBtnClick(e) {
    const value = e.currentTarget.dataset.value;
    if (!currentSort || currentSort.value !== value) {
      setCurrentSort({ value, type: "ascending" });
      return;
    }
    if (currentSort.type === "ascending") {
      setCurrentSort((prevSort) => ({ ...prevSort, type: "descending" }));
    } else {
      setCurrentSort(null);
    }
  }

  function handleSearchInputChange(e) {
    setSearchInputValue(e.target.value);
  }

  return (
    <div>
      <h1 className={styles.heading}>Current Employees</h1>
      <div className={styles.content}>
        <div className={styles.filter}>
          <div className={styles.search}>
            <label htmlFor="search-input">Search:</label>
            <input
              value={searchInputValue}
              onChange={handleSearchInputChange}
              name="search"
              type="search"
              id="search-input"
              className={styles["search-input"]}
            />
          </div>
        </div>
        <div className={styles["table-container"]}>
          <table className={styles.table}>
            <thead className={styles.headers}>
              <tr>
                {headers.map((header) => {
                  let icon = sortIcon;
                  const isCurrentSort = currentSort && currentSort.value === header.value;
                  if (isCurrentSort && currentSort.type === "ascending")
                    icon = sortUpIcon;
                  if (isCurrentSort && currentSort.type === "descending")
                    icon = sortDownIcon;

                  return (
                    <th
                      key={header.value}
                      aria-sort={isCurrentSort ? currentSort.type : null}
                    >
                      <button
                        className={styles.sort}
                        data-value={header.value}
                        onClick={onSortBtnClick}
                      >
                        {header.text}
                        <img src={icon} alt="" className={styles.icon} />
                      </button>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className={styles.rows}>
              {rows.map((employee, index) => {
                return (
                  <tr key={index}>
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
    </div>
  );
}
