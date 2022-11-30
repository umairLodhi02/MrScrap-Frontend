import { Card, Container, Row, Col, Table } from "react-bootstrap";
import Loader from "./../../Components/Loader";
import { useEffect, useState, useContext } from "react";
import { getScraps } from "../../services/scrapService";
import userContext from "../../contexts/userContext";
import CustomPagination from "./../../Components/CustomPagination";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { authActions } from "./../../redux/reducers/auth-slice";
import CustomTable from "../../Components/CustomTable/CustomTable";
import { getScrapsListByUserID } from "../../redux/reducers/scrap-slice";
import Geocode from "react-geocode";

const Home = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const session = useSelector((state) => state.auth.session);
  const loading = useSelector((state) => state.alert.loading);
  Geocode.setApiKey("AIzaSyC0-r9vXk5Zbs8Ipua8X2lMvfW8xHOaRvM");

  let scrapsListByUserId = useSelector(
    (state) => state.scrap.scrapsListByUserId
  );

  const columns = [
    // { header: "Sr. NO#", property: "id" },
    { header: "Name", property: "name" },
    { header: "Action", property: "action" },
  ];

  useEffect(() => {
    if (navigator && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        Geocode.fromLatLng(
          position.coords.latitude,
          position.coords.longitude
        ).then(
          (response) => {
            const address = response.results[0].formatted_address;
            dispatch(
              authActions.setSession({
                address: address,
              })
            );
          },
          (error) => {
            console.error(error);
          }
        );
      });
    }
    // fetchScraps();
    dispatch(getScrapsListByUserID(token, session.userId));
  }, []);
  return (
    <>
      {loading && <Loader />}
      <Container className="mt-5">
        <Row>
          <Col lg={{ span: 10, offset: 1 }}>
            <CustomTable
              mainHeading={"Your Scraps"}
              addModal={true}
              list={scrapsListByUserId}
              columns={columns}
              actionButtons={true}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Home;
