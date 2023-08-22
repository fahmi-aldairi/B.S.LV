import {
  HomeIcon,
  TableCellsIcon,
  ArrowRightOnRectangleIcon,
  CircleStackIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { Home, Users, EditUsers, AddPitches } from "@/pages/dashboard";
import { SignIn } from "@/pages/auth";
import AddUsers from "./pages/dashboard/AddUsers";
import Product from "./pages/dashboard/products";
import AddPartner from "./pages/dashboard/addPartner";
import Partners from "./pages/dashboard/Partners";
import ContactUs from "./pages/dashboard/ContactUs";
import PartnerDetails from "./pages/dashboard/partnerDetails";
import AddProduct from "./pages/dashboard/addProduct";
import ProductDetials from "./pages/dashboard/productDetails";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Home",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "Users",
        path: "/Users",
        element: <Users />,
      },
      {
        icon: <CircleStackIcon {...icon} />,
        name: "Products",
        path: "/products",
        element: <Product />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Partners",
        path: "/Partners",
        element: <Partners />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Contact Us",
        path: "/ContactUs",
        element: <ContactUs />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "Log-Out",
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
  {
    title: "without",
    layout: "dashboard",
    pages: [
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Edit Users",
        path: "/users/edit",
        element: <EditUsers />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Add users",
        path: "/users/add",
        element: <AddUsers />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Add pitch",
        path: "/pitches/add",
        element: <AddPitches />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Add partner",
        path: "/partner/add",
        element: <AddPartner />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Add Product",
        path: "/product/add",
        element: <AddProduct />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "partner details",
        path: "/partner/details/:id",
        element: <PartnerDetails />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "product details",
        path: "/product/details/:id",
        element: <ProductDetials />,
      },
    ],
  },
];

export default routes;
