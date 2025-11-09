import HomePage from "@/pages/home";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
