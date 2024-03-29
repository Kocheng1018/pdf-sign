import { Outlet } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./layout/navBar";
import HomePage from "@/pages/index";
import SignNewFile from "@/pages/signNewFile";

function App(): JSX.Element {

  const defaultLayout = (
    <div id="App" className="h-full w-full min-w-[800px] grid grid-rows-[60px_1fr]">
      <NavBar />
      <Outlet></Outlet>
    </div>
  );
  return (
    <Router basename="/pdf-sign/">
      <Routes>
        <Route element={defaultLayout}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/signnewfile" element={<SignNewFile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
