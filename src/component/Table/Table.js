import React, { useState } from "react";

import axios from "axios";
import { BaseURL } from "../../config/staging";

import deleteImg from "../../assests/icons/delete.svg";

import EditCar from "../Cars/EditCar";

const Table = (props) => {
  const [carId, setCarId] = useState();

  const { data } = props;
  let user = localStorage.getItem("user");
  let token = JSON.parse(user).token;

  const deleteCar = async () => {
    if (carId !== undefined && carId !== null) {
      console.log("delete");
      console.log(carId);

      const response = await axios.delete(`${BaseURL}/cars/${carId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response?.status === 200) {
        console.log("delete cars response", response?.data?.message);
        props?.fetchData();
      }
    }
  };
  return (
    <div>
      <div className="table-wrapper my-3">
        <table className="booking-table ">
          <thead>
            <tr>
              <th scope="col">Sr.</th>
              <th scope="col">Make</th>
              <th scope="col">Model</th>
              <th scope="col">Color</th>
              <th scope="col">Price</th>
              <th scope="col">Registration</th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data?.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: index === data?.length - 1 ? "0" : "",
                  }}
                >
                  <td scope="row">{index + 1}</td>

                  <td>{item?.make || ""}</td>

                  <td>{item?.model || ""}</td>

                  <td>{item?.color || ""}</td>
                  <td>{item?.price || ""}</td>

                  <td>{item?.registration || ""}</td>

                  <div
                    style={{
                      margin: "13px 12px 0px 0px",
                      cursor: "pointer",
                    }}
                  >
                    <EditCar data={item} />

                    <img
                      src={deleteImg}
                      width="28px"
                      data-toggle="modal"
                      data-target=".bd-example-modal-xl"
                      onClick={() => {
                        setCarId(item?.carId);
                        deleteCar();
                      }}
                    />
                  </div>
                </tr>
              ))
            ) : (
              <h4>No Cars added</h4>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
