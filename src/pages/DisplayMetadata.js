import React, { useContext, useEffect, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Add, Delete, EditOutlined } from "@mui/icons-material";
import { AuthContext } from "../context/auth/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import { getMetadata, deleteMetadata } from "../apis/metadata";
const DisplayMetadata = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [metadata, setMetadata] = useState([]);
  const { isAuthenticated, token } = authContext;
  const [selectedRows, setselectedRows] = useState([]);
  const columns = [
    { field: "siteName", headerName: "Title", width: 110 },
    { field: "description", headerName: "TagLine", width: 90 },
    { field: "phoneNumber", headerName: "PhoneNumber", width: 130 },
    { field: "email", headerName: "Email", width: 210 },
    {
      field: "logo",
      headerName: "Logo",
      width: 90,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {params.row.logo && (
              <img
                src={params.row.logo}
                style={{
                  height: "45px",
                  width: "45px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                alt="img-thumb"
              />
            )}
          </div>
        );
      },
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 150,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Link
              to={`/metadata/${params.row._id}`}
              style={{
                color: "#green",
              }}
            >
              <EditOutlined />
            </Link>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    !isAuthenticated && navigate("/login");
  }, [isAuthenticated, token]);

  useEffect(() => {
    getMetadata()
      .then((res) => {
        setMetadata(res.data.response);
      })
      .catch((err) => {
        console.log("error in fetching metadata");
        alert("error in fetching metadata");
      });
  }, [token]);

  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) =>
      metadata.find((row) => row._id === id)
    );
    setselectedRows(selectedRowsData);
  };
  const deleteHandler = () => {
    selectedRows.forEach((item) => {
      // console.log("itemToDelete", item._id);
      setMetadata(metadata.filter((row) => row._id !== item._id));
      deleteMetadata(token, item._id)
        .then((res) => {
          alert("Metadata removed");
        })
        .catch((err) => {
          alert("Error in Metadata remove");
          console.log("error in Metadata removeing", err);
        });
    });
  };
  return (
    <div className="container-fluid mt-5">
      <div
        style={{
          background: " #ffffff",
          color: "#525",
          position: "relative",
          padding: "5px 15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "0.9rem",
        }}
      >
        <span style={{ fontWeight: "bolder", fontSize: "1.7rem" }}>
          Metadata
        </span>

        <span style={{ fontWeight: "bolder", fontSize: "1.5rem" }}>
          Add Metadata
          <Link to={`/metadata`}>
            <IconButton size="lg">
              <Add />
            </IconButton>
          </Link>
        </span>
      </div>
      <div style={{ height: 400, width: "100%", background: "#ffffff" }}>
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
          rows={metadata}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          getRowId={(r) => r._id}
          disableRowSelectionOnClick
          onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
        />
      </div>
    </div>
  );
};

export default DisplayMetadata;
