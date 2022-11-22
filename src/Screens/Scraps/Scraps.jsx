import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import Loader from "../../Components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllScrapsList } from "./../../redux/reducers/scrap-slice";
import CustomTable from "../../Components/CustomTable/CustomTable";

const Scraps = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const allScrapsList = useSelector((state) => state.scrap.allScrapsList);
  const loading = useSelector((state) => state.alert.loading);

  const columns = [
    { header: "Quantity", property: "quantity" },
    { header: "Type", property: "type" },
  ];

  useEffect(() => {
    console.log(allScrapsList);
    dispatch(getAllScrapsList(token));
  }, []);

  return (
    <>
      {loading && <Loader />}
      <Container className={"mt-5"}>
        <Row>
          <Col lg={{ span: 10, offset: 1 }}>
            <CustomTable
              columns={columns}
              list={allScrapsList}
              actionButtons={false}
              addModal={false}
              mainHeading={"All Scraps"}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Scraps;
