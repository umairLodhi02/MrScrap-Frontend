import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteComplainUser } from "../../redux/reducers/auth-slice";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import CustomTextArea from "../TextArea";

const CustomAccordion = ({ item, admin, usersList }) => {
  const session = useSelector((state) => state.auth.session);
  const dispatct = useDispatch();

  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState(false);

  const handleDelete = () => {
    dispatct(deleteComplainUser(session.token, item._id));
  };

  const handleResponse = () => {
    const data = usersList.filter((user) => user._id === item.userId);
    if (data) {
      const user = data[0];
      if (user) {
        emailjs
          .send(
            "service_o2knqee",
            "template_8eiuvzn",
            {
              from_name: "Mr scrap",
              to_name: `${user.username}`,
              to_email: `${user.email}`,
              complainId: `${item._id}`,
              complainSubject: `${item.subject}`,
              complainDescription: `${item.description}`,
              message: `${message}`,
            },
            "zSXgxFKgZlxrbNMeS"
          )
          .then((result) => {
            console.log(result);
            alert("User is notified through an Email");
            setMessage("");
            setModal(false);
          });
      }
    }
  };

  return (
    <>
      <div className="custom-accordion-item mb-3">
        <button
          className="custom-accordion-title p-3 d-flex justify-content-between"
          onClick={() => setIsActive(!isActive)}
        >
          <h4>{item.subject}</h4>
          <h4>{isActive ? "-" : "+"}</h4>
        </button>
        <div className={`line ${isActive && "show"}`}></div>
        {/* {isActive && ( */}
        <div
          className={`custom-accordion-content  ${
            isActive && "mt-3 px-3 pt-3 pb-3 show"
          }`}
        >
          <p>{item.description}</p>
          <div className="status d-flex justify-content-between">
            <p className="text-info">Status: </p>
            <p className="badge bg-warning">
              {item.status ? item.status : "N/A"}
            </p>
          </div>

          <div className="text-end">
            {admin ? (
              <Button variant="info" onClick={() => setModal(item.userId)}>
                Respond
              </Button>
            ) : (
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            )}
          </div>
        </div>
        {/* )} */}
      </div>

      <Modal show={modal} centered={true} onHide={() => setModal(false)}>
        <Modal.Header closeButton className="bg-dark">
          <Modal.Title className="bg-dark" id="contained-modal-title-vcenter">
            <div>
              <h3
                className="py-3 text-white"
                style={{ fontWeight: 600, fontStyle: "italic" }}
              >
                Send Complain Response
              </h3>
            </div>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="bg-dark">
          <CustomTextArea
            inputValue={message}
            setInputValue={(e) => setMessage(e)}
            handleSubmit={handleResponse}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CustomAccordion;
