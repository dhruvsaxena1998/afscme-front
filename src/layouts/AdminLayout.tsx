import { Outlet } from "react-router-dom";
import config from "../config";
export default function AdminLayout() {
  // check if user jwt is present in local storage
  const jwt = localStorage.getItem(config.token.id);
  if (!jwt) {
    window.location.href = "/";
  }

  return (
    <div className="p-4">
      <h1 className="p-4 text-3xl font-bold text-gray-700">AFSCME</h1>
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}
