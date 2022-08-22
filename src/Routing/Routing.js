import { useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
} from "react-router-dom";

import SignIn from "../component/SignIn/SignIn";
import SignUp from "../component/SignUp/SignUp";

import Home from "../component/Home/Home";
import Categories from "../component/Categories/Categories";
import Cars from "../component/Cars/Cars";

const Routing = () => {
  const [myPath, setMyPath] = useState("");

  const getLoggedUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : {};
  };

  function RequireAuth() {
    const location = useLocation();
    const user = getLoggedUser();
    if (user.token) {
      return <Outlet />;
    }

    return <Navigate to="/" state={{ from: location }} />;
  }
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route index element={<Home />} /> */}
        <Route path="*" element={<Navigate to="/" replace />} />

        <Route
          path="/"
          element={<SignIn myPath={myPath} setMyPath={setMyPath} />}
        />

        <Route
          path="signup"
          element={<SignUp myPath={myPath} setMyPath={setMyPath} />}
        />

        <Route element={<RequireAuth />}>
          <Route path="home" element={<Home />} />
          <Route path="cars" element={<Cars />} />
          <Route path="categories" element={<Categories />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
