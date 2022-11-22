import { Layer, Box, Spinner, Text } from "grommet";
const Loader = ({ text }) => {
  return (
    <div
      style={{
        position: "fixed",
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
        margin: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "999999",
        backgroundColor: "rgb(0, 0, 0, 0.6)",
        gap: "1rem",
      }}
    >
      <Spinner size="medium" />
      <Text>{text ? text : "Loading..."}</Text>
    </div>
  );
};

export default Loader;
