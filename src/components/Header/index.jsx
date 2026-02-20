import { NavLink } from "react-router";

export default function Header() {
  return (
    <header className="bg-white sticky top-0 flex p-6 justify-between items-center shadow-md">
      <NavLink to="/" className="text-2xl font-bold">
        HRnet
      </NavLink>
      <nav className="flex items-center gap-2">
        <NavLink
          className={({ isActive }) => (isActive ? "text-purple underline" : "")}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "text-purple underline" : "")}
          to="/employees-list"
        >
          Current Employees
        </NavLink>
      </nav>
    </header>
  );
}
