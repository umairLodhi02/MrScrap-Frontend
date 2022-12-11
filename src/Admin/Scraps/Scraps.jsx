import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../../Components/CustomTable/CustomTable";
import Loader from "../../Components/Loader";
import { getAllScrapsList } from "../../redux/reducers/scrap-slice";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Scraps = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  let allScrapsList = useSelector((state) => state.scrap.allScrapsList);

  const loading = useSelector((state) => state.alert.loading);
  const [filteredList, setFilteredList] = useState([]);
  const params = useParams();

  const columns = [
    { header: "Name", property: "name" },
    { header: "Status", property: "status" },
    { header: "Action", property: "action" },
  ];

  useEffect(() => {
    dispatch(getAllScrapsList(token));
    if (params.userId) {
      let list = allScrapsList.filter((u) => u.userId === params.userId);
      setFilteredList(list);
    } else {
      setFilteredList(allScrapsList);
    }
  }, [params]);

  return (
    <>
      {loading && <Loader />}
      <Container className={"mt-5"}>
        <Row>
          <Col lg={{ span: 10, offset: 1 }}>
            <CustomTable
              columns={columns}
              list={filteredList}
              actionButtons={false}
              addModal={false}
              mainHeading={"All Scraps"}
              changeStatus={true}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Scraps;
