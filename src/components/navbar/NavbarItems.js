import {
  BellRinging,
  ChartBar,
  Cube,
  HouseLine,
  ShoppingCart,
  Users,
  User,
} from "phosphor-react";
import { add_category } from "../Routes/RoutePaths";
import * as path from "../Routes/RoutePaths";

export const Navbar_items = {
  Dashboard: {
    main: "Dashboard",
    to: "/",
    icon: HouseLine,
  },

  Notification: {
    main: "Notification",
    to: path.notification,
    icon: BellRinging,
  },
  Reports: {
    main: "Reports",
    // to: path.reports,
    icon: ChartBar,
    sublinks: [
      {
        name: "Report",
        to: path.reports,
      },
      {
        name: "Daily Reports",
        to: path.sales_report,
      },
    ],
  },
  Customers: {
    main: "Customers",
    // to: path.customer_list,
    icon: User,
    sublinks: [
      {
        name: "Customer List",
        to: path.customer_list,
      },
      {
        name: "Bulk Import",
        to: path.customer_bulk_import,
      },
    ],
  },

  Inventory: {
    main: "Inventory",
    icon: Cube,

    sublinks: [
      {
        name: "Add Category",
        to: path.add_category,
      },
      {
        name: "Category List",
        to: path.category_list,
      },
      {
        name: "Add Product",
        to: path.add_product,
      },
      {
        name: "Product List",
        to: path.product_list,
      },
      // {
      //   name: "Product View",
      //   to: path.product_view,
      // },
      {
        name: "Attribute",
        to: path.add_attribute,
      },
      {
        name: "Bulk Import",
        to: path.bulk_import,
      },
    ],
  },
  Sales: {
    main: "Sales",
    icon: ShoppingCart,

    sublinks: [
      {
        name: "Create Invoice",
        to: path.create_invoice,
      },

      {
        name: "Invoice List",
        to: path.invoice_list,
      },
      // {
      //   name: "View Invoice",
      //   to: path.view_invoice,
      // },
    ],
  },
  User: {
    main: "User",
    icon: Users,

    sublinks: [
      {
        name: "Add User",
        to: path.add_user,
      },
      {
        name: "Add Role",
        to: path.add_role,
      },
      {
        name: "Add Group",
        to: path.add_group,
      },
      {
        name: "Users List",
        to: path.user_list,
      },
    ],
  },
};
