import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { format, isValid, parse } from "date-fns";
import clsx from "clsx";
import classNames from "react-day-picker/style.module.css";
import styles from "./DateInput.module.css";

import calendarIcon from "../../assets/calendar.svg";

export default function DateInput({ name, id }) {
  const [inputValue, setInputValue] = useState("");
  const [month, setMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef(null);
  const btnRef = useRef(null);

  function handleDayPickerSelect(date) {
    if (!date) {
      setInputValue("");
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
      setMonth(date);
      setInputValue(format(date, "dd/MM/yyyy"));
      setIsOpen(false);
    }
  }

  function handleInputValueChange(e) {
    setInputValue(e.target.value);

    const parsedDate = parse(e.target.value, "dd/MM/yyyy", new Date());

    if (isValid(parsedDate)) {
      setSelectedDate(parsedDate);
      setMonth(parsedDate);
    } else {
      setSelectedDate(undefined);
    }
  }

  function handleBtnClick() {
    setIsOpen((prevValue) => !prevValue);
  }

  function handleKeyDown(e) {
    if (e.key === "Escape" && isOpen) {
      setIsOpen(false);
    }
  }

  function handleDocumentClick(e) {
    const target = e.target;
    if (
      calendarRef.current &&
      !calendarRef.current.contains(target) &&
      !btnRef.current.contains(target)
    ) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  return (
    <div className={styles.container} onKeyDown={handleKeyDown}>
      <div className={styles["input-container"]}>
        <input
          id={id}
          name={name}
          value={inputValue}
          type="text"
          onChange={handleInputValueChange}
          className={styles.input}
        />
        <button
          type="button"
          className={styles.button}
          onClick={handleBtnClick}
          ref={btnRef}
          aria-label={isOpen ? "close calendar" : "open calendar"}
        >
          <img className={styles.icon} src={calendarIcon} alt="" />
        </button>
      </div>
      {isOpen && (
        <div
          className={styles["calendar-wrapper"]}
          ref={calendarRef}
          aria-label="Pick a date"
        >
          <DayPicker
            role="application"
            animate
            autoFocus
            captionLayout="dropdown"
            selected={selectedDate}
            onSelect={handleDayPickerSelect}
            month={month}
            onMonthChange={setMonth}
            mode="single"
            classNames={{
              ...classNames,
              root: clsx(classNames.root, styles.calendar),
            }}
          />
        </div>
      )}
    </div>
  );
}
