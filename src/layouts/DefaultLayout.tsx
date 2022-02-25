import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
  return (
    <div className="p-4">
      <h1 className="p-4 text-3xl font-bold text-gray-700">AFSCME</h1>
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}
