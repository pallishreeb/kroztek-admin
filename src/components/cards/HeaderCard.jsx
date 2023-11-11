/** @format */

import React from "react";
import {
  ElectricalServices,
  ListAltOutlined,
  Category
} from "@mui/icons-material";
import InventoryIcon from '@mui/icons-material/Inventory';
import {Link} from "react-router-dom"
const HeaderCard = ({ statistics }) => {
  const data = [
    {
      title: "Categories",
      img: <ListAltOutlined sx={{ height: "50px", width: "50px" }} />,
      value: statistics?.categories,
      path:"/categories"
    },
    {
      title: "Sub-Categories",
      img: <Category sx={{ height: "50px", width: "50px" }} />,
      value: statistics?.subcategories,
      path:"/subcategories"
    },
    {
      title: "Products",
      img: <InventoryIcon sx={{ height: "50px", width: "50px" }} />,
      value: statistics?.Products,
      path:"/products"
    },
    {
      title: "Services",
      img: <ElectricalServices sx={{ height: "50px", width: "50px" }} />,
      value: statistics?.services,
      path:"/services"
    },

  ];
  return (
    <div class="row ">
      {data.map((item) => (
   
        <div class="col-sm-6 col-md-3 col-lg-3 mt-3 " key={item.title}>
          <div class="card" style={{ color: "#005BAB", border: "1px solid #005BAB" }}>
            
          <Link to={`${item.path}`}>
            <div
              class="card-body d-flex"
              style={{ justifyContent: "space-evenly", alignItems: "center" }}
            >
              {item.img}
              <p
                className="d-grid"
                style={{
                  fontSize: "1.3rem",
                  lineHeight: "1",
                  fontWeight: "600",
                  gap: "10px",
                }}
              >
                {item.value}
                <small>{item.title}</small>
              </p>
            </div>
            </Link>
          </div>
        </div>
     
      ))}
    </div>
  );
};

export default HeaderCard;
