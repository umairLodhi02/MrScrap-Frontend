import { useState, useEffect, useContext } from "react";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Form,
  FormField,
  MaskedInput,
  TextInput,
  Notification,
} from "grommet";

import { Row, Col, Alert, Container } from "react-bootstrap";
// import { login } from "../../services/loginService";
import Loader from "../../Components/Loader";
import swal from "sweetalert";
import userContext from "./../../contexts/userContext";
import { Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/reducers/auth-slice";
import { alertActions } from "./../../redux/reducers/alert-slice";
const Login = (props) => {
  const session = useSelector((state) => state.auth.session);
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [password, setPassword] = useState("");

  const loading = useSelector((state) => state.alert.loading);
  const notification = useSelector((state) => state.alert.notification);

  const [showNumber, setShowNumber] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    console.log("errr");
  }, [showNumber]);

  const handleSubmit = (event) => {
    console.log(email, password, contactNo);
    let req;
    if (contactNo) {
      req = {
        user: {
          contactNo: contactNo,
          password: password,
        },
        loginType: "number",
      };
    } else if (email) {
      req = {
        user: {
          email: email,
          password: password,
        },
        loginType: "email",
      };
    }

    dispatch(loginUser(req));
  };

  if (session.token && !session.isAdmin) {
    return <Redirect to="/home" />;
  } else if (session.token && session.isAdmin) {
    return <Redirect to="/dashboard" />;
  } else
    return (
      <>
        {loading && <Loader />}
        {notification && notification.message && (
          <Notification
            toast
            status={notification.type}
            title={""}
            message={notification.message}
          />
        )}
        <Box align="center" justify="center" fill pad={""}>
          <Card pad={"large"} background="dark-1">
            <CardHeader
              style={{
                fontSize: "30px",
                textDecoration: "underline",
                fontStyle: "italic",
              }}
              justify="center"
              pad={"medium"}
            >
              Login
            </CardHeader>

            <CardBody pad={"medium"}>
              <Form
                onReset={() => {
                  setPassword("");
                  setEmail("");
                  setContactNo("");
                }}
                onSubmit={handleSubmit}
              >
                {showNumber ? (
                  <FormField label="Phone Number" name="number">
                    <TextInput
                      type={"text"}
                      required
                      name="number"
                      value={contactNo}
                      onChange={(event) => {
                        console.log(event.target.value);
                        setContactNo(event.target.value);
                      }}
                    />
                  </FormField>
                ) : (
                  <FormField label="Email" name="email" required>
                    <MaskedInput
                      name="email"
                      type={"email"}
                      mask={[
                        { regexp: /^[\w\-_.]+$/, placeholder: "example" },
                        { fixed: "@" },
                        { regexp: /^[\w]+$/, placeholder: "my" },
                        { fixed: "." },
                        { regexp: /^[\w]+$/, placeholder: "com" },
                      ]}
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </FormField>
                )}

                <FormField label="Password" name="password">
                  <TextInput
                    type={"password"}
                    name="password"
                    value={password}
                    required
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </FormField>

                {showNumber ? (
                  <Button
                    style={{
                      textDecoration: "underline",
                      color: "#9999ff",
                      marginTop: "1rem",
                      marginBottom: "1rem",
                    }}
                    label="Login using Email"
                    plain
                    onClick={() => {
                      setEmail("");
                      setShowNumber(false);
                    }}
                  />
                ) : (
                  <Button
                    style={{
                      textDecoration: "underline",
                      color: "#9999ff",
                      marginTop: "1rem",
                      marginBottom: "1rem",
                    }}
                    label="Login using Phone Number"
                    plain
                    onClick={() => {
                      setContactNo("");
                      setShowNumber(true);
                    }}
                  />
                )}

                <Box
                  direction="row"
                  justify="end"
                  gap="10px"
                  margin={{ top: "medium" }}
                  pad="medium"
                >
                  <Button label="Cancel" type="reset" size={"large"} />
                  <Button type="submit" label="Login" primary size={"large"} />
                </Box>
              </Form>
            </CardBody>

            <CardFooter align="center" justify="center">
              <Row className="text-center mb-5">
                <Col>
                  <Link to="/register">Don't have an account? Register</Link>
                </Col>
              </Row>
            </CardFooter>
          </Card>
        </Box>
      </>
    );
};
export default Login;
