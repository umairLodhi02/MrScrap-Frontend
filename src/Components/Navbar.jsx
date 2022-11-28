import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Anchor, Box, Header, Nav, ResponsiveContext } from "grommet";
import Menu from "./Menu";
import { useContext } from "react";
import userContext from "./../contexts/userContext";
import { useDispatch } from "react-redux";
import { authActions } from "./../redux/reducers/auth-slice";
const Navbar = (props) => {
  const dispatch = useDispatch();
  const MenuList = [
    { href: "/scraps", label: "Scraps", className: "a" },
    { href: "/check-rates", label: "Check Rates", className: "a" },
    { href: "/profile", label: "Profile", className: "a" },
  ];
  return (
    <div className="bg-dark">
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
              to={"/home"}
              style={{ fontStyle: "italic", fontWeight: "600" }}
            >
              Mr. Scrap
            </Link>
          </Box>
          <ResponsiveContext.Consumer>
            {(responsive) =>
              responsive === "small" ? (
                <Menu list={MenuList} nav={true} />
              ) : (
                <Nav direction="row" className="menu">
                  {MenuList.map((menu, index) => {
                    return (
                      <Link
                        key={index}
                        to={menu.href}
                        className={menu.className}
                      >
                        {menu.label}
                      </Link>
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
                </Nav>
              )
            }
          </ResponsiveContext.Consumer>
        </Header>
      </Container>
    </div>
  );
};

export default Navbar;
