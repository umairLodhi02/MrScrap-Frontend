import React from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CustomAccordion from "../../Components/CustomAccordion/CustomAccordion";
import {
  getComplainsList,
  getUsersList,
} from "../../redux/reducers/admin-slice";
const Complains = () => {
  const complainsList = useSelector((state) => state.admin.complainsList);
  const usersList = useSelector((state) => state.admin.usersList);

  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComplainsList(token));
    dispatch(getUsersList(token));
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        {console.log(complainsList)}
        <Col md={{ span: 10 }} className="m-auto">
          <div className="custom-accordion">
            {complainsList &&
              complainsList.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    {" "}
                    <CustomAccordion
                      admin={true}
                      item={item}
                      usersList={usersList}
                    />
                  </React.Fragment>
                );
              })}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Complains;
