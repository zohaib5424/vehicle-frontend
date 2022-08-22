import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { BaseURL } from "../../config/staging";

const SignIn = (props) => {
  const navigate = useNavigate();
  const notify = (msg) => toast(msg);

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const signInHandle = async (values) => {
    try {
      const response = await axios.post(`${BaseURL}/auth/signIn`, values);
      console.log("response ", response?.data);
      if (response.status === 200) {
        notify("Successfully login");
        let user = {
          token: response?.data?.accessToken || "",
          email: response?.data?.user?.email || "",
          userId: response?.data?.user?.userId || "",
          name: response?.data?.user?.name || "",
        };
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/home");
      }
    } catch (error) {
      console.log("error ", error);
      if (error.response.status === 401) {
        notify("Email or Password Incorrect");
      } else if (error.response.status === 400) {
        notify("User not Exists");
      } else {
        notify("Internal Server Error");
      }
    }
  };
  const handleSubmit = (values) => {
    console.log("values", values);
    signInHandle(values);
  };

  return (
    <div style={{ width: "50%" }} className="container">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange, values, touched, isValid, errors }) => (
          <Form onSubmit={handleSubmit}>
            <div className="form-outline mb-4">
              <h3>Sign In</h3>
              <label className="form-label" htmlFor="form2Example1">
                Email address
              </label>

              <input
                type="email"
                id="form2Example1"
                className={`form-control ${
                  touched.email && errors.email ? "is-invalid" : ""
                }`}
                name="email"
                placeholder="Enter email"
                value={values.email}
                onChange={handleChange}
              />

              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="form2Example2">
                Password
              </label>
              <input
                type="password"
                id="form2Example2"
                className={`form-control ${
                  touched.password && errors.password ? "is-invalid" : ""
                }`}
                name="password"
                placeholder="Enter password"
                value={values.password}
                onChange={handleChange}
              />

              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-4">
              Sign in
            </button>

            <div className="text-center">
              <p>
                {`Not a member?  `}
                <strong className="strong">
                  <NavLink to="/signup" className="">
                    Sign Up
                  </NavLink>
                </strong>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default SignIn;
