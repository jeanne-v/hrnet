import { Routes, Route } from "react-router";
import Layout from "../Layout";
import Home from "../../pages/Home";
import CurrentEmployees from "../../pages/CurrentEmployees";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="employees-list" element={<CurrentEmployees />} />
      </Route>
    </Routes>
  );
}
