import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "../widgets/Layout/Layout";

function App() {
  return (
    <>
      <Router>
        <Layout/>
      </Router>
    </>
  );
}

export default App;
