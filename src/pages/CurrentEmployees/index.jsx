import { useState } from "react";
import { useSelector } from "react-redux";
import { MenuSelect } from "menu-select";
import styles from "./CurrentEmployees.module.css";

import sortIcon from "../../assets/sort.svg";
import sortUpIcon from "../../assets/sort-up.svg";
import sortDownIcon from "../../assets/sort-down.svg";
import chevronLeftIcon from "../../assets/chevron-left.svg";
import chevronRightIcon from "../../assets/chevron-right.svg";

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

  const numbersOptions = [
    { text: "10", value: "10" },
    { text: "25", value: "25" },
    { text: "50", value: "50" },
    { text: "100", value: "100" },
  ];
  const [selectedNumberOption, setSelectedNumberOption] = useState(numbersOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);

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

  const maxNumberOfRows = +selectedNumberOption.value;

  const filteredRows = getSearchFilteredRows(employees, searchInputValue);

  const sortedRows = getSortedRows(filteredRows, currentSort);

  const startIndex = maxNumberOfRows * (currentPage - 1);
  const endIndex = maxNumberOfRows * currentPage - 1;

  const visibleRows = sortedRows.slice(startIndex, endIndex + 1);

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

  function handleNextPageBtnClick() {
    setCurrentPage((prevValue) => prevValue + 1);
  }

  function handlePreviousPageBtnClick() {
    setCurrentPage((prevValue) => prevValue - 1);
  }

  return (
    <div>
      <h1 className={styles.heading}>Current Employees</h1>
      <div className={styles.content}>
        <div className={styles.filter}>
          <div className={styles.limit}>
            <p id="number-of-rows">Show rows</p>
            <div>
              <MenuSelect
                labelledby="number-of-rows"
                options={numbersOptions}
                selectedOption={selectedNumberOption}
                setSelectedOption={setSelectedNumberOption}
                size="small"
              />
            </div>
          </div>
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
              {visibleRows.map((employee, index) => {
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
        <div className={styles["pagination-container"]}>
          <p className={styles["rows-nb"]}>
            Showing {startIndex + 1} to{" "}
            {filteredRows.length > endIndex + 1 ? endIndex + 1 : filteredRows.length} of{" "}
            {filteredRows.length} entries{" "}
            {filteredRows.length === employees.length
              ? ""
              : `(filtered from total ${employees.length} entries)`}
          </p>
          <div className={styles.pagination}>
            <button
              className={styles["pagination-btn"]}
              disabled={currentPage === 1}
              onClick={handlePreviousPageBtnClick}
            >
              <img src={chevronLeftIcon} alt="Previous page" />
            </button>
            <p className={styles["pagination-text"]}>{currentPage}</p>
            <button
              className={styles["pagination-btn"]}
              disabled={filteredRows.length <= endIndex + 1}
              onClick={handleNextPageBtnClick}
            >
              <img src={chevronRightIcon} alt="Next page" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
