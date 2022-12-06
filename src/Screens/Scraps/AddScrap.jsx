import { Row, Col, Button, Form, FloatingLabel, Modal } from "react-bootstrap";
import swal from "sweetalert";
import Loader from "../../Components/Loader";
import { addScrap, updateScrap } from "../../redux/reducers/scrap-slice";
import { useDispatch, useSelector } from "react-redux";
import { Notification } from "grommet";
import { useEffect } from "react";
import {
  calculatePrice,
  SCRAP_CATEGORIES,
} from "./../../constants/ScrapCategories";

const AddScrap = (props) => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.auth.session);
  const loading = useSelector((state) => state.alert.loading);
  const notification = useSelector((state) => state.alert.notification);
  const { scrapToEdit, edit, scrap, setScrap, setModalShow } = props;

  const FormFields = [
    {
      label: "Enter Scrap Description",
      value: scrap.description,
      setValue: (val) =>
        setScrap((prevData) => ({
          ...prevData,
          description: val,
        })),
      name: "type",
      type: "text",
      required: true,
    },
    {
      label: "Select Category",
      value: scrap.category,
      setValue: (val) => {
        setScrap((prevData) => ({
          ...prevData,
          category: val,
        }));
        if (scrap.quantity) {
          let price = calculatePrice(scrap.quantity, val);
          setScrap((prevData) => ({
            ...prevData,
            price: price,
          }));
        }
      },
      name: "quantity",
      type: "select",
      required: true,
    },
    {
      label: "Enter Scrap Quantity",
      value: scrap.quantity,
      setValue: (val) => {
        setScrap((prevData) => ({
          ...prevData,
          quantity: val,
        }));
        if (!scrap.category) {
          alert("Please select Category");
          return;
        } else {
          let price = calculatePrice(val, scrap.category);
          setScrap((prevData) => ({
            ...prevData,
            price: price,
          }));
        }
      },
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
        address: session.address,
        description: scrap.description,
        category: scrap.category,
        price: scrap.price,
      },
    };
    dispatch(addScrap(req, session.token));
    setModalShow(false);
  };

  const handleEdit = async () => {
    let req = {
      scrap: {
        quantity: scrap.quantity,
        address: session.address,
        category: scrap.category,
        description: scrap.description,
        price: scrap.price,
      },
    };

    dispatch(updateScrap(req, props.token, scrapToEdit, props.scrapList));
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

  useEffect(() => {
    if (scrap && scrap.category && scrap.quantity) {
      let pr = calculatePrice(scrap.quantity, scrap.category);
      console.log(pr);
      setScrap((prevData) => ({
        ...prevData,
        price: pr,
      }));
    }
  }, []);
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
                  {input.type === "select" ? (
                    <FloatingLabel
                      controlId="floatingSelect"
                      label="Select Category"
                      className="text-white"
                    >
                      <Form.Select
                        aria-label="Floating label select example "
                        className="bg-dark text-white mb-4"
                        onChange={(e) => input.setValue(e.target.value)}
                        value={input.value}
                      >
                        <option value={""}>Select Category</option>
                        {SCRAP_CATEGORIES.map((cat) => {
                          return (
                            <option key={cat.id} value={cat.name}>
                              {cat.name}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </FloatingLabel>
                  ) : (
                    <>
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
                      {input.name === "quantity" && (
                        <p className="text-white">Price: {scrap.price}</p>
                      )}
                    </>
                  )}
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
                    setScrap({
                      quantity: "",
                      description: "",
                      price: 0,
                      category: "",
                    });
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
