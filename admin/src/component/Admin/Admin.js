import React from "react";
import AdminNav from "../AdminNav/AdminNav";

import requireAuth from '../RequireAuth/RequireAuth';


const Admin = ({ children }) => {
  return (
    <div className="Admin">
    <AdminNav/>
      {children}
    </div>
  );
};

export default requireAuth(Admin);