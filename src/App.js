import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Home></Home>}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
