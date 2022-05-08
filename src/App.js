import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Layouts/Header";
import AuthLayout from "./components/Layouts/AuthLayout";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Catalog from "./components/Catalog";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="/" element={<Header />}>
        <Route index element={<Catalog />} />
      </Route>
    </Routes>
  );
}

export default App;
