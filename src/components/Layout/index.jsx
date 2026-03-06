import { Outlet } from "react-router";
import Header from "../Header";
import styles from "./Layout.module.css";

export default function Layout() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
