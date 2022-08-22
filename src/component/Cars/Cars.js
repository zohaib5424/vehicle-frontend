import axios from "axios";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { BaseURL } from "../../config/staging";
import NavigationBar from "../NavigationBar/NavigationBar";

const Cars = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const notify = (msg) => toast(msg);

  const addCarSchema = Yup.object().shape({
    model: Yup.string().required("car model is required"),
    color: Yup.string().required("car color is required"),
    make: Yup.string().required("car make is required"),
    price: Yup.string().required("car price is required"),
    registration: Yup.string().required("car registration city is required"),
    categoryName: Yup.string().required("category category is required"),
  });

  let user = localStorage.getItem("user");
  let token = JSON.parse(user).token;

  const fetchCategories = async () => {
    const response = await axios.get(`${BaseURL}/categories`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response?.status === 200) {
      if (response?.data?.categories?.length > 0) {
        response?.data?.categories?.unshift({
          cId: -1,
          name: "Select Category",
        });
        setData(response?.data?.categories);
        console.log("category data", data);
        setLoading(false);
      } else {
        setLoading(true);
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [loading]);

  const addCarHandle = async (data) => {
    try {
      const response = await axios.post(`${BaseURL}/cars/add`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("response ", response.data);
      if (response?.data?.success) {
        notify("Successfully Car Added");
        navigate("/home");
      } else {
        notify("Please Select Category");
      }
    } catch (error) {
      console.log("error ", error);
      notify("Please Select Category");
    }
  };

  return (
    <div>
      <NavigationBar></NavigationBar>
      {loading && data.length === 0 ? (
        <p>Loading</p>
      ) : (
        <div
          style={{ width: "50%", marginBottom: "20px" }}
          className="container"
        >
          <Formik
            initialValues={{
              model: "",
              color: "",
              make: "",
              price: "",
              registration: "",
              categoryName: "",
            }}
            validationSchema={addCarSchema}
            onSubmit={(values, { resetForm }) => {
              addCarHandle(values);
              resetForm({ values: "" });
            }}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              touched,
              isValid,
              errors,
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                  <h3>Categories</h3>

                  <select
                    name="categoryName"
                    value={values.categoryName}
                    onChange={handleChange}
                    style={{
                      width: "30%",
                      height: "30px",
                      marginBottom: "50px",
                    }}
                  >
                    {data?.length > 0 &&
                      data?.map((el) => (
                        <option value={el?.name}>{el?.name}</option>
                      ))}
                  </select>
                  {errors.categoryName && (
                    <div className="invalid-feedback">
                      {errors.categoryName}
                    </div>
                  )}

                  <h3>Cars</h3>
                  <br />

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example2">
                      Model
                    </label>
                    <input
                      type="text"
                      id="form2Example2"
                      className={`form-control ${
                        touched.model && errors.model ? "is-invalid" : ""
                      }`}
                      name="model"
                      placeholder="Enter model"
                      value={values.model}
                      onChange={handleChange}
                    />

                    {errors.model && (
                      <div className="invalid-feedback">{errors.model}</div>
                    )}
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example2">
                      Color
                    </label>
                    <input
                      type="text"
                      id="form2Example2"
                      className={`form-control ${
                        touched.color && errors.color ? "is-invalid" : ""
                      }`}
                      name="color"
                      placeholder="Enter color"
                      value={values.color}
                      onChange={handleChange}
                    />

                    {errors.color && (
                      <div className="invalid-feedback">{errors.color}</div>
                    )}
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example2">
                      Make
                    </label>
                    <input
                      type="text"
                      id="form2Example2"
                      className={`form-control ${
                        touched.make && errors.make ? "is-invalid" : ""
                      }`}
                      name="make"
                      placeholder="Enter make"
                      value={values.make}
                      onChange={handleChange}
                    />

                    {errors.make && (
                      <div className="invalid-feedback">{errors.make}</div>
                    )}
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example2">
                      Price
                    </label>
                    <input
                      type="text"
                      id="form2Example2"
                      className={`form-control ${
                        touched.price && errors.price ? "is-invalid" : ""
                      }`}
                      name="price"
                      placeholder="Enter price"
                      value={values.price}
                      onChange={handleChange}
                    />

                    {errors.price && (
                      <div className="invalid-feedback">{errors.price}</div>
                    )}
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example2">
                      Registration City
                    </label>
                    <input
                      type="text"
                      id="form2Example2"
                      className={`form-control ${
                        touched.registration && errors.registration
                          ? "is-invalid"
                          : ""
                      }`}
                      name="registration"
                      placeholder="Enter registration"
                      value={values.registration}
                      onChange={handleChange}
                    />

                    {errors.registration && (
                      <div className="invalid-feedback">
                        {errors.registration}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4"
                >
                  Add Car
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};
export default Cars;
