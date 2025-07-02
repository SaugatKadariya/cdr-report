import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CdrAustralia from "./components/CdrAustralia";
import CdrReport from "./components/CdrReport";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CdrReport />} />
        <Route path="/report" element={<CdrAustralia />} />
      </Routes>
    </Router>
  );
}

export default App;
