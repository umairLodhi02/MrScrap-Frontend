import { Container, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getUsersList } from "../../redux/reducers/admin-slice";
import CustomTable from "../../Components/CustomTable/CustomTable";
const Users = () => {
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.admin.usersList);
  const session = useSelector((state) => state.auth.session);
  const columns = [
    { header: "Username", property: "username" },
    { header: "Email", property: "email" },
    { header: "Contact No.", property: "contactNo" },
  ];
  useEffect(() => {
    dispatch(getUsersList(session.token));
  }, []);
  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col md={"10"} className="m-auto">
            <CustomTable
              columns={columns}
              list={usersList}
              actionButtons={false}
              mainHeading={"Users List"}
              userList={true}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Users;
