import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthProvider from "./context/auth/AuthProvider";
import PostProvider from './context/PostProvider';
import ServiceProvider from './context/ServiceProvider';
import CategoryProvider from './context/CategoryProvider';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <PostProvider>
        <ServiceProvider>
      <CategoryProvider>
          <App />
      </CategoryProvider>            
      </ServiceProvider>
      </PostProvider>
    </AuthProvider> 
  </React.StrictMode>
);


