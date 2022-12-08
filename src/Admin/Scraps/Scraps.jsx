import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../../Components/CustomTable/CustomTable";
import Loader from "../../Components/Loader";
import { getAllScrapsList } from "../../redux/reducers/scrap-slice";

const Scraps = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  let allScrapsList = useSelector((state) => state.scrap.allScrapsList);
  const loading = useSelector((state) => state.alert.loading);

  const columns = [
    { header: "Quantity", property: "quantity" },
    { header: "Type", property: "type" },
  ];

  useEffect(() => {
    console.log(loading);
    dispatch(getAllScrapsList(token));
  }, []);

  return (
    <>
      {loading && <Loader />}
      <Container className={"mt-5"}>
        <Row>
          <Col lg={{ span: 10, offset: 1 }}>
            {/* {allScrapsList &&
              allScrapsList.map((scrap) => {
                return (
                  <ScrapCard
                    description={scrap.description}
                    price={scrap.price}
                    quantity={scrap.quantity}
                  />
                );
              })} */}
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
