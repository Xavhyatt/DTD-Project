import Dashboard from "./views/Dashboard.jsx";
import Icons from "./views/Keywords.jsx";
import Notifications from "./views/Notifications.jsx";
import TableList from "./views/TableList.jsx";
import Typography from "./views/Reports.jsx";
import UserProfile from "./views/UserProfile.jsx";

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
  },

  {
    path: "/user-profile",
    name: "User Profile",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin"
  }

  

];
export default routes;
