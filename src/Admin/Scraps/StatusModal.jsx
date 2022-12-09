import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { SCRAP_STATUS } from "../../constants/ScrapCategories";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeScrapStatus } from "../../redux/reducers/scrap-slice";
import emailjs from "@emailjs/browser";
import { alertActions } from "../../redux/reducers/alert-slice";
const StatusModal = ({ modalShow, setModalShow, scrap, setScrap, session }) => {
  const [status, setStatus] = useState(scrap.status);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!status) {
      alert("Status cannot be empty");
      return;
    } else if (
      scrap.status &&
      scrap.status.toLowerCase().trim() === status.toLowerCase().trim()
    ) {
      alert(
        "Scraps Status is same as Current Status. Please Select another Status"
      );
      return;
    } else {
      if (
        window.confirm(
          `Are you sure you want to change Scrap Status to "${status}"?`
        )
      ) {
        let formData = {
          to_name: scrap._id,
          changed_status: status,
          current_status: scrap.status,
          description: scrap.description,
          quantity: scrap.quantity,
          price: scrap.price,
          address: scrap.address,
        };
        dispatch(changeScrapStatus({ status }, session.token, scrap._id)).then(
          (res) => {
            if (res && res.success) {
              emailjs
                .send(
                  "service_o2knqee",
                  "template_6mqbe9q",
                  {
                    from_name: "Mr scrap",
                    to_name: `${res.data.scrap.userName}`,
                    to_email: `${res.data.scrap.userEmail}`,
                    changed_status: `${scrap.status}`,
                    current_status: `${status}`,
                    description: `${scrap.description}`,
                    quantity: `${scrap.quantity}`,
                    price: `${scrap.price}`,
                    address: `${scrap.address}`,
                  },
                  "zSXgxFKgZlxrbNMeS"
                )
                .then((result) => {
                  console.log(result);
                  alert("User is notified through an Email");
                  window.location.reload(false);
                });
            }
          }
        );

        setModalShow(false);
      } else {
        return;
      }
    }
  };

  return (
    <Modal show={modalShow} centered={true} onHide={() => setModalShow(false)}>
      <Modal.Header closeButton className="bg-dark">
        <Modal.Title className="bg-dark" id="contained-modal-title-vcenter">
          <div>
            <h3
              className="py-3 text-white"
              style={{ fontWeight: 600, fontStyle: "italic" }}
            >
              Change Scrap Status
            </h3>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark">
        <Form onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="floatingSelect"
            label="Select Category"
            className="text-white"
          >
            <Form.Select
              aria-label="Floating label select example "
              className="bg-dark text-white mb-4"
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            >
              <option value={""}>Select Status</option>
              {SCRAP_STATUS.map((cat) => {
                return (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
            </Form.Select>
          </FloatingLabel>

          <Button type={"reset"} variant="secondary" className="me-3" size="lg">
            Cancel
          </Button>
          <Button type={"submit"} variant="primary" size="lg">
            Change
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default StatusModal;
