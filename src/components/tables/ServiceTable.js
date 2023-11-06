/** @format */

import React, { useContext, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import LoadingTable from "./Loading";
import {
  Delete,
  EditOutlined,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";
import { ServiceContext } from "../../context/ServiceProvider";
import { Link } from "react-router-dom";
import {
  IconButton,
  Tooltip,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { APP_URL, IMG_URL } from "../../config";
import { toast } from "react-toastify";
import { editStatus } from "../../apis/service";

export default function ServiceTable({ token }) {
  const serviceContext = useContext(ServiceContext);
  const { deleteSinglePost, loading, products, setProducts, getAllPosts } = serviceContext;
  const [selectedRows, setselectedRows] = useState([]);

  const handleToggle = (status, id) => {
    editStatus(id, token, !status)
      .then((response) => {
        if (response.status !== 200) {
          toast.error("Error in updating status");
        } else {
          getAllPosts(token);
          toast.success("Status updated");
        }
      })
      .catch((error) => {
        // Handle any network error
        console.error("Error:", error);
      });
  };

  const columns = [
    {
      field: "rank",
      headerName: "Rank",
      width: 80,

      renderCell: (params) => {
        return <span>{params.row?.rank}</span>;
      },
    },
    {
      field: "Image",
      headerName: "Image",
      width: 120,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {params.row?.images?.length > 0 && (
              <img
                src={`${IMG_URL}/images/${params.row?.images[0]}`}
                style={{
                  height: "45px",
                  width: "45px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  margin: "20px",
                }}
                alt="img-thumb"
              />
            )}
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <span>{params.row.name}</span>
          </div>
        );
      },
    },
    {
      field: "category",
      headerName: "Category",
      width: 180,

      renderCell: (params) => {
        return <span>{params.row.category.categoryName}</span>;
      },
    },
    {
      field: "subcategory",
      headerName: "SubCategory",
      width: 180,
      renderCell: (params) => {
        return <span>{params.row.subcategory?.subcategoryName}</span>;
      },
    },
    {
      field: "documents",
      headerName: "Document",
      width: 200,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <p>{params.row?.documents[0]}</p>
          </div>
        );
      },
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 40,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Link
              to={`/edit-service/${params.row._id}`}
              style={{
                color: "#green",
              }}
            >
              <EditOutlined />
            </Link>
            {/* <DeleteOutline
            sx={{
              color:"red"
            }}
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            /> */}
          </div>
        );
      },
    },
    {
      field: "view",
      headerName: "view",
      width: 40,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Link
              to={`${APP_URL}/post/${params.row._id}`}
              style={{
                color: "#green",
              }}
            >
              <RemoveRedEyeOutlined />
            </Link>
          </div>
        );
      },
    },
    {
      field: "isActive",
      headerName: "Active",
      width: 80, // Adjust the width as needed
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <ToggleButtonGroup
              value={params.row?.isActive}
              exclusive
              onChange={() =>
                handleToggle(params.row?.isActive, params.row?._id)
              }
              size="small"
            >
              {params.row.isActive === true ? (
                <ToggleButton
                  value={true}
                  style={{ backgroundColor: "greenyellow" }}
                >
                  On
                </ToggleButton>
              ) : (
                <ToggleButton
                  value={false}
                  style={{ backgroundColor: "red", color: "#fff" }}
                >
                  Off
                </ToggleButton>
              )}
            </ToggleButtonGroup>
          </div>
        );
      },
    },
  ];

  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) =>
      products.find((row) => row._id === id)
    );
    setselectedRows(selectedRowsData);
  };
  const deleteHandler = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmed) {
      selectedRows.forEach((item) => {
        setProducts(products.filter((row) => row._id !== item._id));
        deleteSinglePost(token, item._id);
      });
    }
  };
  if (loading) {
    return <LoadingTable />;
  }
  return (
    <div style={{ height: "600px", width: "100%", background: "#ffffff" }}>
      {selectedRows.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Tooltip title="Delete" onClick={() => deleteHandler()}>
            <IconButton size="lg">
              <Delete />
            </IconButton>
          </Tooltip>
        </div>
      )}
      <DataGrid
        getRowId={(r) => r._id}
        rows={products}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        rowHeight={80}
        onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
      />
    </div>
  );
}
