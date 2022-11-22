import React from "react";
import userContext from "../contexts/userContext";
import { Route, Redirect } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useSelector } from "react-redux";
const ProtectedRoute = (props) => {
  const { exact, path, component } = props;

  const token = localStorage.getItem("token");

  return (
    <>
      <React.Fragment>
        {token ? (
          <>
            <Navbar />
            <Route path={path} component={component} exact={exact} />
          </>
        ) : (
          <Redirect to={{ pathname: "/" }} />
        )}
      </React.Fragment>
    </>
  );
};

export default ProtectedRoute;
