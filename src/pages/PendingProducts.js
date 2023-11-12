import React, { useState, useEffect, useContext } from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../context/auth/AuthProvider';
import { getPendingProducts} from "../apis/product"
const PendingProducts = () => {
  const [pendingProducts, setPendingProducts] = useState([]);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const {  token } = authContext;
  useEffect(() => {
    const getData = (token) =>{
        setLoading(true)
    getPendingProducts(token)
      .then((res) =>{
        setPendingProducts(res.data.products)
        setLoading(false)
      })
      
      .catch((error) => console.error('Error fetching pending products', error));
    }

    getData(token)
    }, []); 

    if(loading){
        return <div className='text-center'> Loading... </div>
    }

  return (
    <div style={{ padding: '20px' }}>
    <Typography variant="h4" gutterBottom>
      Pending Products
    </Typography>

   {pendingProducts.length <= 0 &&   <Typography variant="h6" gutterBottom>
     No Pending Products
    </Typography>} 
    <Grid container spacing={2}>
      {pendingProducts?.map((product) => (
        <Grid item xs={12} sm={6} key={product._id}>
          <Card style={{ marginBottom: '20px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {product?.name?.toString()}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Created by {product?.userId?.name} for category{' '}
                {product?.category?.categoryName}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: '10px' }}
                onClick={() => navigate(`/view/product/${product._id}`)}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </div>
  );
};

export default PendingProducts;
