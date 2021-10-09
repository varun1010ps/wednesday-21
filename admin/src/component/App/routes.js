import AdminLogin from "../AdminLogin/AdminLogin";
import Dashboard from "../Dashboard/Dashboard";
const routes = [
    { path: '/', compName: {AdminLogin} },
    { path: 'dashboard', compName: {Dashboard} }
  ];

export default routes;