import "bootstrap/dist/css/bootstrap.min.css";
// import './App.css';
import "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import SignIn from "./component/SignIn/SignIn";
import SignUp from "./component/SignUp/SignUp";
import Cars from "./component/Cars/Cars";
import Categories from "./component/Categories/Categories";
import Home from "./component/Home/Home";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  const [token, setToken] = useState(localStorage.getItem("token"));

  const loginSetHandler = (login) => {
    setIsLogin(login);
  };
  const setTokenHandler = (value) => {
    setToken(value);
  };

  return (
    <div style={{ verticalAlign: "middle" }}>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <SignIn
                onLoginSet={loginSetHandler}
                onSetToken={setTokenHandler}
              />
            }
          />
          <Route exact path="/SignUp" element={<SignUp />} />

          {isLogin ? (
            <>
              <Route exact path="Home" element={<Home token={token} />} />
              <Route exact path="Cars" element={<Cars token={token} />} />
              <Route
                exact
                path="Categories"
                element={<Categories token={token} />}
              />
            </>
          ) : (
            <>
              <Route
                exact
                path="/"
                element={
                  <SignIn
                    onLoginSet={loginSetHandler}
                    onSetToken={setTokenHandler}
                  />
                }
              />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
