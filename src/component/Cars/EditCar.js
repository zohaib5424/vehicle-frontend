import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { BaseURL } from "../../config/staging";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import editImg from "../../assests/icons/edit.svg";
import "../../assests/css/Home.css";

function EditCar(props) {
  const [show, setShow] = useState(false);
  const [carId, setCarId] = useState(props?.data?.carId);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log("car edit data", props?.data);
  const { data } = props?.data;
  const navigate = useNavigate();
  const notify = (msg) => toast(msg);

  const editCarSchema = Yup.object().shape({
    model: Yup.string().required("car model is required"),
    color: Yup.string().required("car color is required"),
    make: Yup.string().required("car make is required"),
    price: Yup.string().required("car price is required"),
    registration: Yup.string().required("car registration city is required"),
  });

  let user = localStorage.getItem("user");
  let token = JSON.parse(user).token;

  const editCar = async (values) => {
    if (carId !== undefined && carId !== null) {
      const response = await axios.put(`${BaseURL}/cars/${carId}`, values, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response?.status === 200) {
        console.log("edit cars response", response?.data?.message);
        notify("Edit Car Successfully");
        navigate("/home");
      }
    }
  };

  return (
    <>
      <img src={editImg} width="28px" onClick={handleShow} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Car</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Formik
            initialValues={{
              model: data?.model || "",
              color: data?.color || "",
              make: data?.make || "",
              price: data?.price || "",
              registration: data?.registration || "",
            }}
            enableReinitialize
            validationSchema={editCarSchema}
            onSubmit={(values, { resetForm }) => {
              editCar(values);
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
                  <h3>Car</h3>
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
                  Edit Car
                </button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditCar;
