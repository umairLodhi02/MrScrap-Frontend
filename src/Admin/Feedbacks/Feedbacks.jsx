import { Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  getFeedbacksList,
  getUsersList,
} from "../../redux/reducers/admin-slice";
import "./styles.css";
import FeedBack from "./Feedback";

const Feedbacks = () => {
  const feedbacksList = useSelector((state) => state.admin.feedbacksList);
  const usersList = useSelector((state) => state.admin.usersList);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [newArray, setNewArray] = useState([]);

  useEffect(() => {
    dispatch(getFeedbacksList(token));
    dispatch(getUsersList(token));
    let tempArr = [];
    if (usersList && feedbacksList) {
      usersList.map((user) => {
        let userObj = {
          _id: user._id,
          username: user.username,
          profileImg: user.profileImgUrl,
          feedbacks: [],
        };

        feedbacksList.map((feedback) => {
          if (user._id === feedback.userId) {
            userObj.feedbacks.push(feedback);
          }
        });

        return tempArr.push(userObj);
      });

      setNewArray(tempArr);
    }
  }, []);

  console.log(feedbacksList, usersList, newArray);
  return (
    <Container className="mt-4">
      <Row>
        <Col md={"12"}>
          <Card className="bg-dark p-5">
            <Card.Header>
              <Card.Title>
                <h3>Feedbacks</h3>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="feedbacks_container">
                {newArray ? (
                  <>
                    {newArray.map((user) => {
                      return <FeedBack user={user} />;
                    })}
                  </>
                ) : (
                  <>
                    <div className="notfound">
                      <h3>Not found</h3>
                    </div>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Feedbacks;
