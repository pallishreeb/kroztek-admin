/** @format */

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
} from "@mui/material";

const LoadingTable = () => {
  const loadingRows = Array.from({ length: 5 }, (_, index) => (
    <TableRow key={index}>
      <TableCell>
        <Skeleton animation="wave" width="80%" />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" width="40%" />
      </TableCell>
    </TableRow>
  ));

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Skeleton animation="wave" width="80%" />
            </TableCell>
            <TableCell>
              <Skeleton animation="wave" width="40%" />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{loadingRows}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default LoadingTable;
