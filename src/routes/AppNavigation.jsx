import React from "react";
import { Route, Routes } from "react-router-dom";
import configsRoutes from "./configsRoutes";
import ProtectedRoute from "./key/ProtectedRoutes";

export default function AppNavigation() {
  return (
    <Routes>
      {configsRoutes.map(({ role, Layout: Layout, routes }, i) => {
        if (role === "public") {
          return routes.map(({ path, index, component }, j) => (
            <Route
              key={`${i}-${j}`}
              path={path}
              index={index}
              element={component}
            />
          ));
        }

        return (
          <Route
            key={i}
            element={
              <ProtectedRoute
                allowedRoles={Array.isArray(role) ? role : [role]}
              >
                <Layout />
              </ProtectedRoute>
            }
          >
            {routes.map(({ path, component }, j) => (
              <Route key={`${i}-${j}`} path={path} element={component} />
            ))}
          </Route>
        );
      })}
    </Routes>
  );
}
