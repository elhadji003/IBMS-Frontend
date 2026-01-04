import React from "react";
import { Outlet } from "react-router-dom";

export default function LayoutUser() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
