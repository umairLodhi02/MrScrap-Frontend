import { Container, Row, Col } from "react-bootstrap";
import CustomTextArea from "../../Components/TextArea";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { giveFeedBack } from "./../../redux/reducers/auth-slice";
import Loader from "../../Components/Loader";
import { Notification } from "grommet";

const FeedBack = () => {
  const [feedback, setFeedback] = useState("");
  const session = useSelector((state) => state.auth.session);
  const loading = useSelector((state) => state.alert.loading);
  const notification = useSelector((state) => state.alert.notification);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback) {
      alert("Please write some message!!");
      return;
    } else {
      let req = {
        text: feedback,
      };
      dispatch(giveFeedBack(req, session.token));
      setFeedback("");
    }
  };
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
          <Col md={{ span: 6, offset: 3 }}>
            <CustomTextArea
              inputValue={feedback}
              setInputValue={(val) => setFeedback(val)}
              handleSubmit={handleSubmit}
              heading={"Give Feedback"}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FeedBack;
