import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Listcomponent from "../components/Listcomponent";
import Addcomponent from "../component/Addcomponent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Listcomponent />} />
        <Route path="/add" element={<Addcomponent />} />
      </Routes>
    </Router>
  );
}

export default App;
