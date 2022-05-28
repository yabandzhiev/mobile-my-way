import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Layouts/Header/Header";
import AuthLayout from "./components/Layouts/AuthLayout/AuthLayout";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Catalog from "./components/Catalog/Catalog";

import AuthRouteGuard from "./common/RoutesGuard/AuthRouteGuard";
import ErrorPage from "./components/ErrorPage/ErrorPage";

function App() {
  return (
    <Routes>
      <Route element={<AuthRouteGuard />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>
      <Route path="/" element={<Header />}>
        <Route index element={<Catalog />} />
        <Route path="/*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
