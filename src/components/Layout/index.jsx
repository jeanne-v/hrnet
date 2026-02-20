import { Outlet } from "react-router";
import Header from "../Header";

export default function Layout() {
  return (
    <div className="bg-light-grey min-h-screen">
      <Header />
      <main className="p-8">
        <Outlet />
      </main>
    </div>
  );
}
