import { Card, Row, Col, Container, Overlay, Tooltip } from "react-bootstrap";
import { Box, Text } from "grommet";
import Geocode from "react-geocode";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const ScrapCard = () => {
  const userScrapsList = useSelector((state) => state.scrap.userScrapsList);
  const allScrapsList = useSelector((state) => state.scrap.allScrapsList);

  const params = useParams();
  const location = useLocation();
  console.log(location, allScrapsList);
  const [scrap, setScrap] = useState({});
  const [notFound, setNotFound] = useState(false);
  const target = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    let filteredScrapList = [];
    if (location.pathname.includes("view-scraps")) {
      filteredScrapList = allScrapsList.filter(
        (scrap) => scrap._id === params.id
      );
    } else {
      filteredScrapList = userScrapsList.filter(
        (scrap) => scrap._id === params.id
      );
    }

    if (filteredScrapList.length === 0) {
      setNotFound(true);
    } else {
      const scrapCpy = filteredScrapList[0];
      console.log(scrapCpy);

      setScrap(scrapCpy);
    }
  }, []);

  return (
    <>
      <Container className="mt-5">
        <Row className="">
          <Col md={{ span: 10 }} className="m-auto">
            <Card className="bg-dark px-3 pt-5">
              <Card.Body>
                {notFound ? (
                  <Row>
                    <Col md={{ span: 12 }} className="pt-5 pb-5 text-center">
                      <h5>Not Found</h5>
                    </Col>
                  </Row>
                ) : (
                  <Row>
                    <Col md={12}>
                      <Row className="mb-5">
                        <Col className="description" md={12}>
                          <p className="h3">{scrap.description}</p>
                        </Col>
                      </Row>
                      <Row className="">
                        <Col md={6}>
                          <Row className="mb-5">
                            <Col className="category" md={6}>
                              <p>Quantity:</p>
                            </Col>
                            <Col md={6}>
                              <p>
                                {scrap.quantity ? `${scrap.quantity}kg` : "N/A"}
                              </p>
                            </Col>
                          </Row>
                        </Col>
                        <Col md={6}>
                          <Row className="mb-5">
                            <Col className="category" md={6}>
                              <p>Price:</p>
                            </Col>
                            <Col md={6}>
                              <p>
                                {scrap.price ? `${scrap.price} pkr` : "N/A"}
                              </p>
                            </Col>
                          </Row>
                        </Col>
                        <Col md={6}>
                          <Row className="mb-5">
                            <Col className="category" md={6}>
                              <p>Category:</p>
                            </Col>
                            <Col md={6}>
                              <p>
                                {scrap.category ? `${scrap.category}` : "N/A"}
                              </p>
                            </Col>
                          </Row>
                        </Col>
                        <Col md={6}>
                          <Row className="mb-5">
                            <Col className="category" md={6}>
                              <p>Status:</p>
                            </Col>
                            <Col md={6}>
                              <p>{scrap.status ? `${scrap.status}` : "N/A"}</p>
                            </Col>
                          </Row>
                        </Col>
                        <Col md={6}>
                          <Row className="mb-5">
                            <Col className="price" md={6}>
                              <p>Location:</p>
                            </Col>
                            <Col className="price" md={6}>
                              <p
                                ref={target}
                                onClick={() => setShow(!show)}
                                className="btn-link"
                              >
                                {scrap.address
                                  ? `${scrap.address.slice(0, 20) + "..."}`
                                  : "N/A"}
                              </p>
                              <Overlay
                                target={target.current}
                                show={show}
                                placement="bottom"
                                className={""}
                              >
                                {(props) => (
                                  <Tooltip id="overlay-example" {...props}>
                                    {scrap.address}
                                  </Tooltip>
                                )}
                              </Overlay>
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
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ScrapCard;
