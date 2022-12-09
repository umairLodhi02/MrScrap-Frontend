import {
  Table,
  Button,
  Card,
  Row,
  Col,
  Modal,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import CustomPagination from "../CustomPagination";
import { useDispatch, useSelector } from "react-redux";
import { deleteScrapByUser } from "../../redux/reducers/scrap-slice";
import Loader from "./../Loader";
import { Notification } from "grommet";
import { Link } from "react-router-dom";
import AddScrap from "./AddScrap";
import StatusModal from "../../Admin/Scraps/StatusModal";
const CustomTable = ({
  list,
  columns,
  actionButtons,
  mainHeading,
  addModal,
  ratesTable,
  pageSize,
  admin,
}) => {
  const notification = useSelector((state) => state.alert.notification);
  const loading = useSelector((state) => state.alert.loading);
  const session = useSelector((state) => state.auth.session);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(pageSize ? pageSize : 3);
  const [modal, setModal] = useState(false);
  const [scrapToEdit, setScrapToEdit] = useState({});
  const [edit, setEdit] = useState(false);
  const [statusModal, setStatusModal] = useState(false);

  let [scrap, setScrap] = useState({
    description: "",
    quantity: "",
    category: "",
    price: 0,
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords =
    list && list.slice(indexOfFirstRecord, indexOfLastRecord);

  const nPages = list && Math.ceil(list.length / recordsPerPage);

  const handleEdit = (item) => {
    setScrapToEdit(item);

    setScrap((prevData) => ({
      ...prevData,
      quantity: item.quantity,
      description: item.description,
      category: item.category,
      price: item.price,
    }));

    if (!admin) {
      setModal(true);
      setEdit(true);
    } else {
      setStatusModal(true);
    }
  };
  const handleAdd = () => {
    setModal(true);
    setEdit(false);
    setScrapToEdit({});
  };

  const handleDelete = (item) => {
    dispatch(deleteScrapByUser(token, item._id));
  };

  const handleScrap = (values) => {
    console.log(values);
    setScrapToEdit((prevData) => ({
      ...prevData,
      ...values,
    }));
  };

  return (
    <>
      {loading && <Loader />}
      {notification && notification.message && (
        <Notification
          toast
          status={notification.type}
          title={""}
          message={notification.message}
          // onClose={onClose}
        />
      )}
      <Card className="bg-dark position-relative">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <div>{mainHeading && <h3>{mainHeading}</h3>}</div>

          {addModal && (
            <Button size="lg" variant="primary" onClick={handleAdd}>
              Add Scrap
            </Button>
          )}
        </Card.Header>

        <Card.Body className="">
          {currentRecords && currentRecords.length === 0 ? (
            <div className="my-3 text-center">
              <h3>No Scraps Found</h3>
            </div>
          ) : (
            <>
              <Table responsive striped bordered hover variant="dark" size="md">
                <thead>
                  <tr>
                    {columns &&
                      columns.map((c, index) => {
                        return <th key={index}>{c.header}</th>;
                      })}
                  </tr>
                </thead>

                <tbody>
                  {!ratesTable &&
                    currentRecords &&
                    currentRecords.map((row, index) => {
                      return (
                        <tr key={index}>
                          {/* <td>{row.quantity}</td>
                          <td>{row.type}</td> */}

                          <td>
                            <Link
                              to={`${
                                session.isAdmin
                                  ? `/view-scraps/${row._id}`
                                  : `/home/${row._id}`
                              }`}
                              className="description"
                            >
                              {row.description ? row.description : "N/A"}
                            </Link>
                          </td>
                          {admin && <td>{row.status ? row.status : "N/A"}</td>}
                          {admin && (
                            <td>
                              <Button
                                variant="link"
                                onClick={() => handleEdit(row)}
                              >
                                Change Status
                              </Button>
                            </td>
                          )}
                          {addModal && actionButtons && (
                            <td>
                              <Button
                                variant="link"
                                onClick={() => handleEdit(row)}
                              >
                                Edit
                              </Button>

                              {"/"}

                              <Button
                                variant="link"
                                onClick={() => handleDelete(row)}
                              >
                                Delete
                              </Button>
                            </td>
                          )}
                        </tr>
                      );
                    })}

                  {ratesTable &&
                    currentRecords &&
                    currentRecords.map((row, index) => {
                      return (
                        <tr key={index}>
                          {Object.keys(row).map((field) => {
                            return <td>{row[field]}</td>;
                          })}
                          {/* <td>{row.quantity}</td>
                          <td>{row.type}</td>
                          {addModal && actionButtons && (
                            <td>
                              <Button
                                variant="link"
                                onClick={() => handleEdit(row)}
                              >
                                Edit
                              </Button>

                              {"/"}

                              <Button
                                variant="link"
                                onClick={() => handleDelete(row)}
                              >
                                Delete
                              </Button>
                            </td> */}
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </>
          )}
        </Card.Body>

        <Card.Footer className="d-flex justify-content-end align-item-end ">
          {currentRecords && (
            <CustomPagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </Card.Footer>
      </Card>

      {addModal && actionButtons && (
        <AddScrap
          modalShow={modal}
          setModalShow={setModal}
          scrapToEdit={scrapToEdit}
          // handleScrap={handleScrap}
          edit={edit}
          setEdit={setEdit}
          scrap={scrap}
          setScrap={setScrap}
          token={token}
          scrapList={[...list]}
        ></AddScrap>
      )}

      {admin && (
        <StatusModal
          modalShow={statusModal}
          setModalShow={setStatusModal}
          scrap={scrapToEdit}
          setScrap={setScrapToEdit}
          session={session}
        />
      )}
    </>
  );
};

export default CustomTable;
