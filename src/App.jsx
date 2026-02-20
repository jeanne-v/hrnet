import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CurrentEmployees from "./pages/CurrentEmployees";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="employees-list" element={<CurrentEmployees />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
