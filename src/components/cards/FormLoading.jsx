/** @format */

import React from "react";
import { Grid, Skeleton } from "@mui/material";

const FormLoading = () => {
  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Skeleton variant="text" width="100%" height={56} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Skeleton variant="text" width="100%" height={56} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="text" width="100%" height={56} />
        </Grid>
      </Grid>
    </form>
  );
};

export default FormLoading;
