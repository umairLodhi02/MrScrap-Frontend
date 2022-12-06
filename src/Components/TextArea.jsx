import { Form, Button } from "react-bootstrap";
const CustomTextArea = ({
  heading,
  inputValue,
  setInputValue,
  handleSubmit,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>{heading}</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          className="bg-secondary text-white"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Write your message here..."
        />
      </Form.Group>
      <Button type="submit">Submit form</Button>
    </Form>
  );
};

export default CustomTextArea;
