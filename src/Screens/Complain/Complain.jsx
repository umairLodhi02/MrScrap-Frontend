import { Container, Row, Col, Form, Button, Accordion } from "react-bootstrap";
import CustomTextArea from "../../Components/TextArea";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  giveComplain,
  fetchComplainsUser,
} from "./../../redux/reducers/auth-slice";
import Loader from "../../Components/Loader";
import { Notification } from "grommet";
import CustomAccordion from "../../Components/CustomAccordion/CustomAccordion";

const Complain = () => {
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const userComplainsList = useSelector(
    (state) => state.auth.userComplainsList
  );
  const [complainForm, setComplainForm] = useState(false);
  const session = useSelector((state) => state.auth.session);
  const loading = useSelector((state) => state.alert.loading);
  const notification = useSelector((state) => state.alert.notification);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject && !description) {
      alert("Please Enter All Fields!!");
      return;
    } else if (!subject) {
      alert("Please Enter Subject of your Complain!");
      return;
    } else if (!description) {
      alert("Please Enter Description of your Complain!");
      return;
    } else {
      let req = {
        subject: subject,
        description: description,
      };
      dispatch(giveComplain(req, session.token));
      setDescription("");
      setSubject("");
    }
  };
  useEffect(() => {
    dispatch(fetchComplainsUser(session.token));
  }, []);

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
        {!complainForm && (
          <Row className="mb-4">
            <Col md={{ span: 6, offset: 3 }}>
              <Button
                variant="primary"
                size="lg"
                onClick={() => setComplainForm(true)}
              >
                Add Complain
              </Button>
            </Col>
          </Row>
        )}
        {complainForm && (
          <Row className="mb-4">
            <Col md={{ span: 6, offset: 3 }}>
              <Button
                variant="link"
                size="lg"
                onClick={() => setComplainForm(false)}
              >
                Back to Complains List
              </Button>
            </Col>
          </Row>
        )}
        {!complainForm && (
          <Row>
            {console.log(userComplainsList)}
            <Col md={{ span: 6, offset: 3 }}>
              <div className="custom-accordion">
                {userComplainsList &&
                  userComplainsList.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        {" "}
                        <CustomAccordion item={item} />
                      </React.Fragment>
                    );
                  })}
              </div>
            </Col>
          </Row>
        )}
        {complainForm && (
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={handleSubmit}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Enter Subject</Form.Label>
                  <Form.Control
                    className="bg-secondary text-white"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Write your message here..."
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Enter Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    className="bg-secondary text-white"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Write your message here..."
                  />
                </Form.Group>
                <Button type={"submit"} variant={"primary"} size="lg">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default Complain;
