import React from "react";
import { Route, Routes } from "react-router-dom";
import configsRoutes from "./configsRoutes";

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
            <Route key={i} element={<Layout />}>
              {routes.map(({ path, component }, j) => (
                <Route key={`${i}-${j}`} path={path} element={component} />
              ))}
            </Route>
          );
        })}
      </Routes>
  );
}
