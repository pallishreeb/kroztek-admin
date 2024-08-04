import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { getAllOrders, updateOrder, deleteOrder } from '../apis/order';
import imgPlaceholder from '../img/no-image.jpg';
import { IMG_URL } from '../config';
import { AuthContext } from "../context/auth/AuthProvider";
import { toast } from 'react-toastify';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { token } = authContext;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getAllOrders(token);
        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    fetchOrders();
  }, [token]);

  const handleUpdate = async (orderId, updatedData) => {
    try {
      await updateOrder(token, orderId, updatedData);
      setOrders(orders.map(order => (order._id === orderId ? { ...order, ...updatedData } : order)));
      toast.success('Order updated successfully!');
    } catch (error) {
      console.error('Failed to update order:', error);
      toast.error('Failed to update order.');
    }
  };

  const handleDelete = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await deleteOrder(token, orderId);
        setOrders(orders.filter(order => order._id !== orderId));
        toast.success('Order deleted successfully!');
      } catch (error) {
        console.error('Failed to delete order:', error);
        toast.error('Failed to delete order.');
      }
    }
  };

  const getPrice = (features) => {
    const priceFeature = features.find(feature => feature.name.toLowerCase() === "price");
    return priceFeature ? priceFeature.value : "00";
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Admin Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-4 rounded shadow-md">
              <h2 className="text-xl mb-2">Order ID: {order._id}</h2>
              <p>Total Amount: ₹{order.totalAmount}</p>
              <p>Payment Status: {order.paymentStatus}</p>
              <p>Delivery Status: {order.status}</p>
              <p>Delivery Address: {order.streetAddress}, {order.city}, {order.state}, {order.country}, {order.pincode}</p>
              <p>Order Note: {order.orderNotes}</p>
              <div className="mt-2 flex p-2 gap-8">
                <label className="block">
                  <span className="text-gray-700">Delivery Status</span>
                  <select
                    className="form-select mt-1 block w-full"
                    value={order.status}
                    onChange={(e) => handleUpdate(order._id, { status: e.target.value })}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-gray-700">Payment Status</span>
                  <select
                    className="form-select mt-1 block w-full"
                    value={order.paymentStatus}
                    onChange={(e) => handleUpdate(order._id, { paymentStatus: e.target.value })}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </label>
              </div>
              <button
                className="mt-4 bg-red-500 text-white py-1 px-4 rounded"
                onClick={() => handleDelete(order._id)}
              >
                Delete Order
              </button>
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Products:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {order.products.map(({ product, quantity }) => (
                    <div key={product._id} className="flex items-center border p-4 rounded">
                      <Link to={`/edit-product/${product._id}`}>
                      <img 
                        src={product.images[0] ? `${IMG_URL}/images/${product.images[0]}` : imgPlaceholder} 
                        alt={product.name} 
                        className="w-16 h-16 object-cover rounded mr-4"
                      />
                      </Link>
                      <div>
                        <p className="font-semibold">{product.name}</p>
                        <p>Price: ₹{getPrice(product.features)}</p>
                        <p>Quantity: {quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
