import { Header, Box, ResponsiveContext, Nav } from "grommet";
import { useState } from "react";
import { Button, Container, Offcanvas } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../../redux/reducers/auth-slice";
import "./sidebar.css";
const Sidebar = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const MenuList = [
    // { href: "/scraps", label: "Scraps", className: "a" },
    { href: "/view-users", label: "Users", className: "a" },
    { href: "/view-scraps", label: "Scraps", className: "a" },
    { href: "/check-rates", label: "Check Rates", className: "a" },
    { href: "/profile", label: "Profile", className: "a" },
    { href: "/view-feedback", label: "Feedbacks", className: "a" },
    { href: "/view-Complain", label: "Complains", className: "a" },
  ];
  return (
    <div class="bg-dark menu_container">
      <Container>
        <Header pad="medium">
          <Box
            style={{
              borderBottomLeftRadius: "5px",
              borderBottomRightRadius: "5px",
            }}
            direction="row"
            align="center"
            gap="small"
          >
            <Link
              className="h3"
              to={"/dashboard"}
              style={{
                fontStyle: "italic",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              Mr. Scrap
            </Link>
          </Box>
          <Box
            style={{
              borderBottomLeftRadius: "5px",
              borderBottomRightRadius: "5px",
            }}
            direction="row"
            align="center"
            gap="small"
          >
            <div className="menu_admin">
              <button className="toggler" onClick={handleShow}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </button>
            </div>
          </Box>
        </Header>
      </Container>
      <div className={`admin_list_wrapper ${show && "admin_show"}`}>
        <button className="closeButton" onClick={handleClose}></button>
        <ul className={`admin_menu_list px-5 py-4 `}>
          {MenuList.map((li, index) => {
            return (
              <li key={index} className="py-3">
                <Link to={li.href} className="a">
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
      </div>
    </div>
  );
};

export default Sidebar;
