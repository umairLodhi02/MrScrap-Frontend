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
import ScrapCard from "../Components/Cards/ScrapCard";
import FeedBack from "../Screens/Feedback/FeedBack";
import Complain from "./../Screens/Complain/Complain";

const AppRoutes = () => {
  return (
    <>
      <Switch>
        <ProtectedRoute exact path="/home" component={Home}></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/home/:id"
          component={ScrapCard}
        ></ProtectedRoute>

        <ProtectedRoute
          exact
          path="/profile"
          component={Profile}
        ></ProtectedRoute>
        {/* <ProtectedRoute
          exact
          path="/scraps"
          component={Scraps}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/scraps/:id"
          component={ScrapCard}
        ></ProtectedRoute> */}
        <ProtectedRoute
          exact
          path="/check-rates"
          component={Rates}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/give-feedback"
          component={FeedBack}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/give-complain"
          component={Complain}
        ></ProtectedRoute>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/" component={Login}></Route>
      </Switch>
    </>
  );
};

export default AppRoutes;
