import React, { useEffect, useContext, useState } from "react";
import { HeaderCard } from "../components";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth/AuthProvider";
// import { PostContext } from "../context/PostProvider"
import { getStatisticsData } from "../apis/product";
const Home = () => {
  const navigate = useNavigate();
  const [statistics, setStatistics] = useState(null);
  const authContext = useContext(AuthContext);
  const { isAuthenticated, token } = authContext;
  // const postContext = useContext(PostContext);
  // const { getAllPosts, products } = postContext;
  useEffect(() => {
    !isAuthenticated && navigate("/login");
  }, [isAuthenticated, token]);

  useEffect(() => {
    getStatisticsData(token)
      .then((res) => {
        // console.log("statistic response", res.data)
        setStatistics(res.data);
      })
      .catch((error) => {
        console.log("Error", error?.message || "");
      });
  }, []);
  return (
    <div
      className="container mx-2 pt-2  panel"
      style={{
        position: "relative",
      }}
    >
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12 col-xs-7">
          <div
            style={{
              borderBottom: "2px solid #005BAB",
              padding: "0.9rem 1.3rem",
              fontSize: "2rem",
              fontWeight: "bolder",
              color: "#005BAB",
            }}
          >
            Dashboard
          </div>
        </div>
        <HeaderCard statistics={statistics} />
      </div>
    </div>
  );
};

export default Home;
