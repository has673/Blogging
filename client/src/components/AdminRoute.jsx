import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFailure } from "../redux/slices/userslice";
import axios from "axios";
import { Outlet, Navigate } from "react-router-dom";
import { ClipLoader } from 'react-spinners';

const AdminRoute = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const loading = useSelector((state) => state.user.loading);

  useEffect(() => {
    const authcheck = async () => {
      try {
        const res = await axios.get("http://localhost:3000/admin/admin-auth");
        if (res.data.ok && currentUser.role === "Admin") {
          dispatch(loginSuccess(res.data.currentUser)); // Assuming the response contains currentUser
        } else {
          dispatch(loginFailure());
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        dispatch(loginFailure());
      }
    };

    if (!currentUser) authcheck(); // Check authentication if currentUser is not available
  }, [currentUser, dispatch]);

  if (loading) {
    return <ClipLoader />;
  }

  // If user is authenticated and has admin role, render the child routes
  if (currentUser && currentUser.role === "Admin") {
    return <Outlet />;
  }

  // If user is not authenticated or does not have admin role, redirect to login page
  return <Navigate to="/login" />;
};

export default AdminRoute;

