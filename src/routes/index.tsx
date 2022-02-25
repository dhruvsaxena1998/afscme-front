import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import DefaultLayout from "../layouts/DefaultLayout";
import Callback from "../pages/Callback";

import Loader from "../shared/components/Loader";

export function Lazy(props: { element: any }) {
  const { element: Children } = props;
  return (
    <Suspense fallback={<Loader />}>
      <Children />
    </Suspense>
  );
}

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route
            index
            element={
              <Lazy element={React.lazy(() => import("../pages/Leads"))} />
            }
          />
          <Route
            path="/login"
            element={
              <Lazy element={React.lazy(() => import("../pages/Login"))} />
            }
          />
        </Route>
        <Route path="/callback" element={<Callback />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            index
            element={
              <Lazy element={React.lazy(() => import("../pages/Admin"))} />
            }
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
