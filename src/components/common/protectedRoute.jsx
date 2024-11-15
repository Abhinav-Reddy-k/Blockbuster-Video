import { render } from "@testing-library/react";
import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

import { getCurrentUser } from "./../../services/authService";

const ProtectedRoute = ({ path, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!getCurrentUser())
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
