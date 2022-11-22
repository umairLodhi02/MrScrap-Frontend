import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import { Avatar, Box } from "grommet";
import { useContext, useState, useEffect } from "react";
import userContext from "./../../contexts/userContext";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader";
import { updateProfile } from "../../services/registerService";
import storage from "../../contexts/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/reducers/auth-slice";
import { getFirstLetter } from "./../../services/commonServices";

const Profile = (props) => {
  const session = useSelector((state) => state.auth.session);
  const dispatch = useDispatch();
  const [percent, setPercent] = useState(0);
  const [email, setEmail] = useState(session.email);
  const [number, setNumber] = useState(session.contactNo);
  const [userProfileImg, setUserProfileImg] = useState("");
  //   const [password, setPassword] = useState(session.password);
  const [username, setUsername] = useState(session.username);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const firstLetters =
    session && session.username && getFirstLetter(session.username);
  const FormFields = [
    {
      label: "Enter Username",
      value: username,
      setValue: setUsername,
      name: "username",
      type: "text",
      required: true,
    },
    {
      label: "Enter Contact NO.",
      value: number,
      setValue: setNumber,
      name: "number",
      type: "text",
      required: false,
    },
    {
      label: "Enter Email",
      value: email,
      setValue: setEmail,
      name: "email",
      type: "email",
      required: false,
    },
    {
      label: "Select Profile Picture",
      value: userProfileImg,
      setValue: setUserProfileImg,
      name: "userProfileImg",
      type: "file",
      required: false,
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!userProfileImg) {
      // alert("Please choose a file first!");
      handleApi("");
    } else {
      const img = await uploadImage();
      console.log(img);
      handleApi(img);
    }
    setLoading(false);
  };

  const uploadImage = async () => {
    const storageRef = ref(
      storage,
      `/ProfileImages/${userProfileImg.name}-${session.userId}`
    );
    const uploadTask = uploadBytesResumable(storageRef, userProfileImg);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err)
    );
    await uploadTask;

    return await getDownloadURL(uploadTask.snapshot.ref);
  };
  const handleApi = (profileImgUrl) => {
    if (!email && !number) {
      alert("Please enter Email or Number");
      return;
    } else {
      setLoading(true);

      let req = {
        username: username,
        email: email,
        contactNo: number,
        profileImgUrl: profileImgUrl ? profileImgUrl : session.profileImgUrl,
      };
      dispatch(updateUser(req, session.token, session.userId)).then((code) => {
        if (code === 200) {
          setShowForm(false);
        } else {
          setShowForm(true);
        }
      });
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Container className={"mt-5"}>
        <Row>
          {!showForm && (
            <Col lg={{ span: 6, offset: 3 }}>
              <Card className="bg-dark">
                <Card.Header>
                  <Box justify="center" align="center">
                    {session && session.profileImgUrl ? (
                      <Avatar src={session.profileImgUrl} size="2xl" />
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
                      {session.username.toUpperCase()}
                    </h3>
                  </div>

                  <div>
                    <p className="card-text py-3" style={{ fontSize: "20px" }}>
                      {session.email}
                    </p>
                  </div>

                  <div>
                    <p className="card-text py-3" style={{ fontSize: "20px" }}>
                      {session.contactNo}
                    </p>
                  </div>
                </Card.Body>
                <Card.Footer className="text-end">
                  <Button
                    variant="outline-light"
                    size="lg"
                    onClick={() => setShowForm(true)}
                  >
                    Edit
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          )}
          {showForm && (
            <Col lg={{ span: 6, offset: 3 }}>
              <Card className="bg-dark text-center">
                <Card.Header>
                  <h3
                    className="py-3"
                    style={{ fontWeight: 600, fontStyle: "italic" }}
                  >
                    Edit Profile
                  </h3>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    {FormFields.map((input, index) => {
                      return (
                        <Col key={index} md={{ span: 10, offset: 1 }}>
                          {input.type !== "file" ? (
                            <FloatingLabel
                              controlId={index}
                              label={input.label}
                              className={`mb-4`}
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
                          ) : (
                            <Form.Group className="mb-3 text-start">
                              <Form.Label className="">Select Image</Form.Label>
                              <Form.Control
                                type={input.type}
                                className={`bg-dark text-white`}
                                placeholder={input.label}
                                onChange={(e) =>
                                  input.setValue(e.target.files[0])
                                }
                                required={input.required}
                              />
                              <p>{percent} "% done"</p>
                            </Form.Group>
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
                          onClick={() => setShowForm(false)}
                        >
                          Cancel
                        </Button>{" "}
                        <Button type="submit" variant="primary" size={"lg"}>
                          Save
                        </Button>
                      </Col>
                    </Row>
                    {/* </Card.Footer> */}
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};
export default Profile;
