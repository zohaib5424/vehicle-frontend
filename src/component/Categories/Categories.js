import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { BaseURL } from "../../config/staging";
import NavigationBar from "../NavigationBar/NavigationBar";
const Categories = (props) => {
  const [enterName, setEnterName] = useState("");

  const navigate = useNavigate();
  const notify = (msg) => toast(msg);

  const enterNameHandle = (event) => {
    setEnterName(event.target.value);
  };

  let user = localStorage.getItem("user");
  let token = JSON.parse(user).token;

  const addCategoryHandle = async (data) => {
    try {
      const response = await axios.post(`${BaseURL}/categories/add`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("response ", response?.data);
      if (response?.data?.success) {
        notify("Successfully Category Added");
        setEnterName("");
        navigate("/cars");
      }
    } catch (error) {
      console.log("error ", error);
    }
  };

  return (
    <div>
      <NavigationBar></NavigationBar>
      <div style={{ width: "50%", marginBottom: "80px" }} className="container">
        <h3>Category</h3>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="name"
            className="form-control"
            placeholder="Enter Category name"
            value={enterName}
            onChange={enterNameHandle}
          />
        </div>

        <div className="d-grid">
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginTop: "20px" }}
            onClick={() => {
              addCategoryHandle({
                name: enterName,
              });
            }}
          >
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
};
export default Categories;
