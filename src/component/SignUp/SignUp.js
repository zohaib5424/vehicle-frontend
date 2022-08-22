import axios from "axios";
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { BaseURL } from "../../config/staging";

const SignUp = (props) => {
  const navigate = useNavigate();
  const notify = (msg) => toast(msg);

  const signUpSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
  });

  const signUpHandle = async (values) => {
    try {
      const response = await axios.post(`${BaseURL}/auth/signup`, values);
      console.log("response ", response.data);
      if (response.status == 200) {
        notify("Successfully login");
        navigate("/");
      }
    } catch (error) {
      console.log("error ", error);
      if (error.response.status === 409) {
        notify("User Already Exists");
      } else {
        notify("Internal Server Error");
      }
    }
  };

  const handleSubmit = (values) => {
    console.log("values", values);
    signUpHandle(values);
  };

  return (
    <div style={{ width: "50%" }} className="container">
      <Formik
        initialValues={{ name: "", email: "" }}
        validationSchema={signUpSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange, values, touched, isValid, errors }) => (
          <Form onSubmit={handleSubmit}>
            <div className="form-outline mb-4">
              <h3>Sign Up</h3>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example2">
                  Name
                </label>
                <input
                  type="text"
                  id="form2Example2"
                  className={`form-control ${
                    touched.name && errors.name ? "is-invalid" : ""
                  }`}
                  name="name"
                  placeholder="Enter name"
                  value={values.name}
                  onChange={handleChange}
                />

                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
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

            <button type="submit" className="btn btn-primary btn-block mb-4">
              Sign Up
            </button>

            <div className="text-center">
              <p>
                {`Already user?  `}
                <strong className="strong">
                  <NavLink to="/" className="">
                    Sign In
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
export default SignUp;
