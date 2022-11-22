import { Table, Button, Card } from "react-bootstrap";
import { useState } from "react";
import CustomPagination from "../CustomPagination";
import AddScrap from "../../Screens/Scraps/AddScrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteScrapByUser } from "../../redux/reducers/scrap-slice";
import Loader from "./../Loader";
import { Notification } from "grommet";

const CustomTable = ({
  list,
  columns,
  actionButtons,
  mainHeading,
  addModal,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const notification = useSelector((state) => state.alert.notification);
  const loading = useSelector((state) => state.alert.loading);

  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [recordsPerPage] = useState(3);
  const [modal, setModal] = useState(false);
  const [scrapToEdit, setScrapToEdit] = useState("");
  const [scrap, setScrap] = useState({
    type: "",
    quantity: "",
  });
  const [edit, setEdit] = useState(false);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords =
    list && list.slice(indexOfFirstRecord, indexOfLastRecord);

  const nPages = list && Math.ceil(list.length / recordsPerPage);

  const handleEdit = (item) => {
    setScrapToEdit(item._id);
    setModal(true);
    setEdit(true);
  };
  const handleAdd = () => {
    setModal(true);
    setEdit(false);
    setScrapToEdit("");
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
                {currentRecords &&
                  currentRecords.map((row, index) => {
                    return (
                      <tr key={index}>
                        {/* <td>{++index}</td> */}
                        <td>{row.quantity}</td>
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
                          </td>
                        )}
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
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
          handleScrap={handleScrap}
          edit={edit}
          setEdit={setEdit}
          scrap={scrap}
          setScrap={setScrap}
        ></AddScrap>
      )}
    </>
  );
};

export default CustomTable;
