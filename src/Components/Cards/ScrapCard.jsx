import { Card, Row, Col } from "react-bootstrap";
import { Box, Text } from "grommet";
const ScrapCard = ({ description, quantity, category, location, price }) => {
  return (
    <>
      <Card className="bg-dark">
        <Card.Body>
          <Row>
            <Col md={8}>
              <Row>
                <Col className="description" md={12}>
                  <p>{description}</p>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Row>
                    <Col className="category" md={6}>
                      <p>Quantity:</p>
                    </Col>
                    <Col md={6}>
                      <p>{quantity ? `${quantity}kg` : "N/A"}</p>
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <Row>
                    <Col className="category" md={6}>
                      <p>Price:</p>
                    </Col>
                    <Col md={6}>
                      <p>{price ? `${quantity} pkr` : "N/A"}</p>
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <Row>
                    <Col className="category" md={6}>
                      <p>Category:</p>
                    </Col>
                    <Col md={6}>
                      <p>{category ? `${category}` : "N/A"}</p>
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <Row>
                    <Col className="price" md={6}>
                      <p>Location:</p>
                    </Col>
                    <Col className="price" md={6}>
                      <p>{location ? `${location}` : "N/A"}</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            {/* <Col md={4}>
              <Box
                pad="small"
                gap="small"
                width="medium"
                background={"dark-4"}
                round="small"
                align="center"
                justify="center"
              >
                <p>Contact Details</p>
                <p>03057723360</p>
              </Box>
            </Col> */}
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default ScrapCard;
