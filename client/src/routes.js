import Dashboard from "./views/Dashboard.jsx";
import Icons from "./views/Keywords.jsx";
import Typography from "./views/Reports.jsx";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Threat Words",
    icon: "tim-icons icon-atom",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/reports",
    name: "Reports",
    icon: "tim-icons icon-align-center",
    component: Typography,
    layout: "/admin"
  }
];
export default routes;
