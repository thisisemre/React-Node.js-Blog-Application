import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({element}) {
  const auth = localStorage.getItem("user");
  return auth ? element : <Navigate to="/login" />;
}

export default PrivateRoute;