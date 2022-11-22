import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import userContext from "./../contexts/userContext";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./../redux/reducers/auth-slice";
import Loader from "./Loader";
const Menu = ({ history, nav, list }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.alert.loading);
  // const { logout } = useContext(userContext);
  const [mobMenu, setMobMenu] = useState(false);
  return (
    <>
      {loading && <Loader />}
      {nav && (
        <nav className="menu_mob">
          <button className="toggler" onClick={() => setMobMenu(!mobMenu)}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </button>
          <ul className={`navList ${mobMenu && "show"}`}>
            <button
              className="closeButton"
              onClick={() => setMobMenu(!mobMenu)}
            ></button>

            {list.map((li, index) => {
              return (
                <li className="navItem" key={index}>
                  <Link to={li.href} onClick={() => setMobMenu(false)}>
                    {li.label}
                  </Link>
                </li>
              );
            })}
            <button
              className="logout"
              onClick={() => {
                dispatch(authActions.logout());
                window.location.reload(false);
              }}
            >
              logout
            </button>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Menu;
