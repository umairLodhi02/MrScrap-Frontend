import React from "react";
import userContext from "../contexts/userContext";
import { Route, Redirect } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useSelector } from "react-redux";
import Sidebar from "../Admin/Sidebar/Sidebar";
const AdminProtectedRoute = (props) => {
  const { exact, path, component } = props;
  const session = useSelector((state) => state.auth.session);
  const token = localStorage.getItem("token");

  return (
    <>
      <React.Fragment>
        {token && session.isAdmin ? (
          <>
            <Sidebar />

            <Route path={path} component={component} exact={exact} />
          </>
        ) : (
          <Redirect to={{ pathname: "/" }} />
        )}
      </React.Fragment>
    </>
  );
};

export default AdminProtectedRoute;
