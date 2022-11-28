import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import Home from "../Screens/Home/Home";
import Register from "./../Screens/Register/Register";
import Login from "./../Screens/Login/Login";
import ProtectedRoute from "./ProtectedRoutes";
import Profile from "./../Screens/Profile/Profile";
import AddScrap from "./../Screens/Scraps/AddScrap";
import Scraps from "./../Screens/Scraps/Scraps";
import Rates from "../Screens/Rates/Rates";

const AppRoutes = () => {
  return (
    <>
      <Switch>
        <ProtectedRoute exact path="/home" component={Home}></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/profile"
          component={Profile}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/scraps"
          component={Scraps}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/check-rates"
          component={Rates}
        ></ProtectedRoute>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/" component={Login}></Route>
      </Switch>
    </>
  );
};

export default AppRoutes;
