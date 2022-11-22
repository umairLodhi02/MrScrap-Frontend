import { Row, Col, Button, Form, FloatingLabel, Modal } from "react-bootstrap";
import swal from "sweetalert";
import Loader from "../../Components/Loader";
import { updateScrap } from "../../services/scrapService";
import { addScrap } from "../../redux/reducers/scrap-slice";
import { useDispatch, useSelector } from "react-redux";
import { Notification } from "grommet";

const AddScrap = (props) => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.auth.session);
  const loading = useSelector((state) => state.alert.loading);
  const notification = useSelector((state) => state.alert.notification);
  const { scrapToEdit, edit, scrap, setScrap, setModalShow } = props;

  const FormFields = [
    {
      label: "Enter Scrap Type",
      value: scrap.type,
      setValue: (val) =>
        setScrap((prevData) => ({
          ...prevData,
          type: val,
        })),
      name: "type",
      type: "text",
      required: true,
    },
    {
      label: "Enter Scrap Quantity",
      value: scrap.quantity,

      setValue: (val) =>
        setScrap((prevData) => ({
          ...prevData,
          quantity: val,
        })),
      name: "quantity",
      type: "number",
      required: true,
    },
  ];

  const handleAdd = () => {
    if (!scrap.type && !scrap.quantity) {
      alert("Please enter scrap or quantity");
      return;
    }

    let req = {
      scrap: {
        quantity: scrap.quantity,
        type: scrap.type,
      },
      userId: session.userId,
    };
    dispatch(addScrap(req, session.token));
    setModalShow(false);
  };

  const handleEdit = async () => {
    let req = {
      scrap: {
        quantity: scrap.quantity,
        type: scrap.type,
      },
    };

    const res = await updateScrap(req, session.accessToken, scrapToEdit);
    console.log(res);
    if (res && res.success) {
      props.setModalShow(false);
      swal(res.message);
      setScrap({
        quantity: "",
        type: "",
      });
    } else if (res && res.message === "Invalid Token") {
    } else {
      swal("Due to some Technical Issue the Server is Down!");
    }
    setModalShow(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (edit) {
      handleEdit();
    } else {
      handleAdd();
    }
  };
  return (
    <>
      {loading && <Loader />}
      {notification && notification.messge && (
        <Notification
          toast
          status={notification.type}
          title={""}
          message={notification.message}
          // onClose={onClose}
        />
      )}
      <Modal show={props.modalShow} onHide={() => props.setModalShow(false)}>
        <Modal.Header closeButton className="bg-dark">
          <Modal.Title className="bg-dark" id="contained-modal-title-vcenter">
            <div>
              <h3
                className="py-3 text-white"
                style={{ fontWeight: 600, fontStyle: "italic" }}
              >
                Add Scrap
              </h3>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <Form onSubmit={handleSubmit}>
            {FormFields.map((input, index) => {
              return (
                <Col key={index} md={{ span: 10, offset: 1 }}>
                  <FloatingLabel
                    controlId={index}
                    label={input.label}
                    className={`mb-4 text-white`}
                  >
                    <Form.Control
                      type={input.type}
                      className={`bg-dark text-white`}
                      placeholder={input.label}
                      value={input.value}
                      onChange={(e) => input.setValue(e.target.value)}
                      required={input.required}
                    />
                  </FloatingLabel>
                </Col>
              );
            })}
            {/* <Card.Footer className="px-5 text-end py-3"> */}
            <Row>
              <Col className="text-end">
                <Button
                  type={"reset"}
                  variant="light"
                  size="lg"
                  onClick={() => {
                    setScrap({ quantity: "", type: "" });
                    setModalShow(false);
                  }}
                >
                  Cancel
                </Button>{" "}
                <Button type="submit" variant="primary" size={"lg"}>
                  {edit ? "Edit" : "Add"}
                </Button>
              </Col>
            </Row>
            {/* </Card.Footer> */}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AddScrap;
