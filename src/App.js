import Home from "./components/home/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="*" element={<div>not found</div>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
