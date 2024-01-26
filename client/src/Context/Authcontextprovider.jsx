import React, { useState } from "react";
import { authcontext } from "./Authcontext";

const Authcontextprovider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <authcontext.Provider value={{ user, setUser }}>
      {children}
    </authcontext.Provider>
  );
};

export default Authcontextprovider;
