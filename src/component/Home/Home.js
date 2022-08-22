import { useEffect, useState } from "react";

import axios from "axios";

import NavigationBar from "../NavigationBar/NavigationBar";

import Table from "../Table/Table";

import { BaseURL } from "../../config/staging";
import "../../assests/css/Home.css";

const Home = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  let user = localStorage.getItem("user");
  let token = JSON.parse(user).token;

  const fetchData = async () => {
    const response = await axios.get(`${BaseURL}/categories`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response?.status === 200 && response?.data?.categories?.length > 0) {
      setData(response?.data?.categories);
      console.log("category data", data);
      console.log(loading);
      setLoading(false);
    } else {
      setLoading(true);
    }
  };
  useEffect(() => {
    fetchData();
  }, [loading]);

  return (
    <div>
      <NavigationBar></NavigationBar>
      <div style={{ width: "50%", marginLeft: "10%" }}>
        {loading ? (
          <p>Loading</p>
        ) : (
          <>
            {data?.map((item, index) => (
              <div key={index}>
                <h3>{item.name}</h3>
                <Table data={item.categoryCars} fetchData={fetchData} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
export default Home;
