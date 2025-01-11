import { BrowserRouter, Routes, Route } from "react-router-dom";

import CreateCar from "./pages/CreateCar";
import EditCar from "./pages/EditCar";
import CreateMission from "./pages/CreateMission";
import Home from "./pages/Home";
import CarsTab from "./pages/CarsTab";
import CarsUser from "./pages/CarsUser";
import EditMission from "./pages/EditMission";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";


function App() {

  return (<BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cars-user" element={<CarsUser />} />
      <Route path="/cars" element={<CarsTab />} />
      <Route path="create" element={<CreateCar />} />
      <Route path="edit/:id" element={<EditCar />} />
      <Route path="mission/create" element={<CreateMission />} />
      <Route path="mission/edit/:id" element={<EditMission />} />
    </Routes>
  </BrowserRouter>);
}

export default App;