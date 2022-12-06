import { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteComplainUser } from "../../redux/reducers/auth-slice";
const CustomAccordion = ({ item }) => {
  const [isActive, setIsActive] = useState(false);
  const session = useSelector((state) => state.auth.session);
  const dispatct = useDispatch();
  const handleDelete = () => {
    dispatct(deleteComplainUser(session.token, item._id));
  };
  return (
    <div className="custom-accordion-item mb-3 ">
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
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default CustomAccordion;
