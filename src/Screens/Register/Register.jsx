import { useState, useEffect, useContext } from "react";

import Loader from "../../Components/Loader";
import swal from "sweetalert";
import {
  Card,
  Col,
  Container,
  Row,
  Form,
  FloatingLabel,
  Button,
} from "react-bootstrap";
import { CardBody, Notification } from "grommet";
import { Link, Redirect } from "react-router-dom";
// import { register } from "../../services/registerService";
import { registerUser } from "../../redux/reducers/auth-slice";
import { useDispatch, useSelector } from "react-redux";

const Register = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.alert.loading);
  const notification = useSelector((state) => state.alert.notification);

  const token = localStorage.getItem("token");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const FormFields = [
    {
      label: "Enter Username",
      value: username,
      setValue: setUsername,
      name: "username",
      type: "text",
      required: true,
    },
    {
      label: "Enter Contact NO.",
      value: number,
      setValue: setNumber,
      name: "number",
      type: "text",
      required: false,
    },
    {
      label: "Enter Email",
      value: email,
      setValue: setEmail,
      name: "email",
      type: "email",
      required: false,
    },
    {
      label: "Enter Password",
      value: password,
      setValue: setPassword,
      name: "password",
      type: "password",
      required: true,
    },
  ];
  const DarkBg = "bg-dark";

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email && !number) {
      alert("Please enter Email or Number");
      return;
    }

    let req = {
      username: username,
      password: password,
      email: email,
      contactNo: number,
    };

    dispatch(registerUser(req));
  };

  if (token) {
    return <Redirect to="/home" />;
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
        <Container className="mt-5">
          <Row>
            <Col lg={{ span: 6, offset: 3 }}>
              <Card className="bg-dark">
                <Card.Header>
                  <Card.Title className="text-center mt-5 pb-3">
                    <h3>Create Your Account</h3>
                  </Card.Title>
                </Card.Header>

                <Card.Body className="mt-2">
                  <Form className={DarkBg} onSubmit={handleSubmit}>
                    {FormFields.map((input, index) => {
                      return (
                        <Col key={index} md={{ span: 10, offset: 1 }}>
                          <FloatingLabel
                            controlId={index}
                            label={input.label}
                            className={`mb-4`}
                          >
                            <Form.Control
                              type={input.type}
                              className={`bg-dark text-white`}
                              placeholder={input.label}
                              value={input.value}
                              onChange={(e) => input.setValue(e.target.value)}
                              required={input.required}
                            />
                          </FloatingLabel>
                        </Col>
                      );
                    })}

                    <Row className="text-center mb-5">
                      <Col>
                        <Link to="/">Already have an account? Login</Link>
                      </Col>
                    </Row>
                    <Card.Footer className="px-5 text-end py-3 ">
                      <Button type={"reset"} variant="light" size="lg">
                        Cancel
                      </Button>{" "}
                      <Button type="submit" variant="primary" size={"lg"}>
                        Register
                      </Button>
                    </Card.Footer>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
};
export default Register;
