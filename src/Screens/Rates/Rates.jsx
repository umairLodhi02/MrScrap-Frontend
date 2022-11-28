import { Col, Container, Row } from "react-bootstrap";
import CustomTable from "../../Components/CustomTable/CustomTable";
import { SCRAP_CATEGORIES } from "../../constants/ScrapCategories";

const Rates = () => {
  const columns = [
    { header: "Id", property: "id" },
    { header: "Name", property: "name" },
    { header: "Rate (pkr)", property: "rate" },
  ];
  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <div className="table-resposive">
              <CustomTable
                mainHeading={"Your Scraps"}
                addModal={false}
                list={SCRAP_CATEGORIES}
                columns={columns}
                actionButtons={false}
                ratesTable={true}
                pageSize={5}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Rates;
