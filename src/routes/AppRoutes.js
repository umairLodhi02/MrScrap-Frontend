import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Register from "./../Screens/Register/Register";
import Login from "../Screens/Login/Login";
import Dashboard from "../Admin/Dashboard/Dashboard";
import Users from "../Admin/Users/User";
import Scraps from "../Admin/Scraps/Scraps";
import ProtectedRoute from "./ProtectedRoutes";
import Profile from "../Screens/Profile/Profile";
import Rates from "../Screens/Rates/Rates";
import ScrapCard from "../Components/Cards/ScrapCard";
import FeedBack from "../Screens/Feedback/FeedBack";
import Complain from "../Screens/Complain/Complain";
import Home from "../Screens/Home/Home";
import AdminProtectedRoute from "./AdminRoutes";

const AppRoutes = () => {
  return (
    <>
      <Switch>
        {/* USER ROUTES */}
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

        {/* ADMIN ROUTES */}
        <AdminProtectedRoute exact path="/dashboard" component={Dashboard} />
        <AdminProtectedRoute exact path="/view-users" component={Users} />
        <AdminProtectedRoute exact path="/view-scraps" component={Scraps} />
        <AdminProtectedRoute
          exact
          path="/view-scraps/:id"
          component={ScrapCard}
        />

        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/" component={Login}></Route>
        {/* <Route exact path="*" component={notfound}></Route> */}
      </Switch>
    </>
  );
};

export default AppRoutes;
