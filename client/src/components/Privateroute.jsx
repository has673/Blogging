// import React, { useContext, useEffect } from "react";
// import { authcontext } from "../Context/Authcontext";
// import { Outlet, Navigate } from "react-router-dom";
// import axios from "axios";

// const Privateroute = () => {
//   const { user, setUser } = useContext(authcontext);

//   useEffect(() => {
//     const authCheck = async () => {
//       try {
//         // Send a request to your backend to check authentication
//         const res = await axios.get("http://localhost:3000/auth/checksignin", {
//           withCredentials: true, // Include credentials (cookies) in the request
//         });

//         if (res.data.ok) {
//           setUser({ ...user, isAuthenticated: true });
//         } else {
//           setUser({ ...user, isAuthenticated: false });
//         }
//       } catch (error) {
//         console.error("Error checking authentication:", error);
//         setUser({ ...user, isAuthenticated: false });
//       }
//     };

//     if (user) {
//       authCheck();
//     }
//   }, [user, setUser]);

//   // Redirect to login if not authenticated
//   if (user && !user.isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   // Render the outlet if authenticated
//   return <Outlet />;
// };

// export default Privateroute;





import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";

const Privateroute = () => {
  useEffect(() => {
    const authCheck = async () => {
      try {
        // Send a request to your backend to check authentication
        const res = await axios.get("http://localhost:3000/auth/checksignin", {
          withCredentials: true, // Include credentials (cookies) in the request
        });

        if (res.data.ok) {
          // Assuming you have userId stored in a cookie
          const userId = getCookie("userId");

          // Check if userId exists in the cookie
          if (userId) {
            // Authentication successful, set a flag or additional information if needed
            localStorage.setItem("isAuthenticated", "true");
          } else {
            localStorage.removeItem("isAuthenticated");
          }
        } else {
          localStorage.removeItem("isAuthenticated");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        localStorage.removeItem("isAuthenticated");
      }
    };

    authCheck();
  }, []);

  // Redirect to login if not authenticated
  if (localStorage.getItem("isAuthenticated") !== "true") {
    return <Navigate to="/login" />;
  }

  // Render the outlet if authenticated
  return <Outlet />;
};

export default Privateroute;

// Helper function to get a cookie by name
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookiePair = cookies[i].split("=");
    if (cookiePair[0] === name) {
      return cookiePair[1];
    }
  }
  return null;
}
