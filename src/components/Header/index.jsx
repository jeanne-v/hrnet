import { NavLink } from "react-router";
import clsx from "clsx";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <NavLink to="/" className={clsx(styles.link, styles.home)}>
        HRnet
      </NavLink>
      <nav className={styles.nav}>
        <NavLink
          className={({ isActive }) => clsx(styles.link, isActive && styles.active)}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => clsx(styles.link, isActive && styles.active)}
          to="/employees-list"
        >
          Current Employees
        </NavLink>
      </nav>
    </header>
  );
}
