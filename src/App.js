import { Grommet, dark } from "grommet";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Grommet theme={dark} full>
      <AppRoutes />
    </Grommet>
  );
}

export default App;
