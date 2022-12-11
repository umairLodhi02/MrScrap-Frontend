import { Avatar, Box } from "grommet";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import { getFirstLetter } from "../../services/commonServices";

const UserCard = () => {
  const params = useParams();
  const [user, setUser] = useState({});
  const usersList = useSelector((state) => state.admin.usersList);

  const [notFound, setNotFound] = useState(false);
  let firstLetters = "";
  useEffect(() => {
    const data =
      usersList && usersList.filter((user) => user._id === params.userId);
    console.log(data);

    if (data && data.length !== 0) {
      const u = data[0];
      firstLetters = u && u.username && getFirstLetter(u.username);
      setUser(u);
    }
  }, []);

  if (params && !params.userId) {
    return <Redirect to={"view-users"} />;
  }

  console.log(user);

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={{ span: 6 }} className="m-auto">
          <Card className="bg-dark">
            {!user ? (
              <>
                <Row>
                  <Col md={{ span: 12 }} className="pt-5 pb-5 text-center">
                    <h5>Not Found</h5>
                  </Col>
                </Row>
              </>
            ) : (
              <>
                <Card.Header>
                  <Box justify="center" align="center">
                    {user && user.profileImgUrl ? (
                      <Avatar src={user.profileImgUrl} size="2xl" />
                    ) : (
                      <Avatar background="dark-2">{firstLetters}</Avatar>
                    )}
                  </Box>
                </Card.Header>
                <Card.Body className="text-center">
                  <div>
                    <h3
                      className="py-3"
                      style={{ fontWeight: 600, fontStyle: "italic" }}
                    >
                      {user && user.username}
                    </h3>
                  </div>

                  <div>
                    <p className="card-text py-3" style={{ fontSize: "20px" }}>
                      {user && user.email}
                    </p>
                  </div>

                  <div>
                    <p className="card-text py-3" style={{ fontSize: "20px" }}>
                      {user && user.contactNo}
                    </p>
                  </div>
                </Card.Body>
                <Card.Footer className="text-end py-4">
                  <Link
                    to={`/view-users/${user._id}/scraps`}
                    variant="outline-light"
                    size="lg"
                  >
                    View Scraps
                  </Link>
                </Card.Footer>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserCard;
