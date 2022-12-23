import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import Page404 from "../errorPages/Page404";
import ForgetPassword from "../forgetpass/ForgetPassword";
import ResetPassword from "../resetpass/ResetPassword";
import AddCategory from "../inventory/category/AddCategory";
import CategoryList from "../inventory/category/CategoryList";
import AddProduct from "../inventory/product/AddNewProduct";
import Attribute from "../inventory/product/Attribute";
import BulkImport from "../inventory/product/BulkImport";
import ProductList from "../inventory/product/ProductList";
import ViewProduct from "../inventory/product/ViewProduct";
import CreateInvoice from "../invoice/CreateInvoice";
import InvoiceList from "../invoice/InvoiceList";
import ViewInvoice from "../invoice/ViewInvoice";
import Login from "../login/Login";
import Notification from "../notification/Notification";
import Reports from "../Reports/Reports";
import AddGroup from "../user/AddGroup";
import AddRole from "../user/AddRole";
import AddUser from "../user/AddUser";
import UserList from "../user/UserList";
import ViewUser from "../user/ViewUser";
import CustomerList from "../customers/CustomerList";
import * as path from './RoutePaths'
import { User } from "phosphor-react";
import DailySalesReport from "../Reports/DailySalesReport";
import UserProfile from "../user/UserProfile";
import EditCategory from "../inventory/category/EditCategory";
import EditInvoice from "../invoice/EditInvoice";
import EditProduct from "../inventory/product/EditProduct";
import EditUser from "../user/EditUser";
import EditCustomer from "../customers/EditCustomer";
import CustomerView from "../customers/CustomerView";
import AddCustomer from "../customers/AddCustomer";
import CustomerBulk from "../customers/CustomerBulk";

const RoutesFile = ({setHideToolbar}) => {
  return (
    <div>
      {/* <Router> */}
      <Switch>
        <Route exact path={path.add_category}>
          <AddCategory />
        </Route>
        <Route exact path={path.category_list}>
          <CategoryList />
        </Route>
        <Route exact path={'/inventory/edit-category/:id'}>
          <EditCategory/>
        </Route>
        <Route exact path={path.add_product}>
          <AddProduct />
        </Route>
        <Route exact path={'/inventory/edit-product/:id'}>
          <EditProduct/>
        </Route>
        <Route exact path={path.product_list}>
          <ProductList />
        </Route>
        <Route exact path={'/inventory/product-view/:id'}>
          <ViewProduct />
        </Route>
        <Route exact path={path.add_attribute}>
          <Attribute />
        </Route>
        <Route exact path={path.bulk_import}>
          <BulkImport />
        </Route>
        <Route exact path={path.user_list}>
          <UserList />
        </Route>
        <Route exact path={path.add_user}>
          <AddUser />
        </Route>
        <Route exact path={path.add_role}>
          <AddRole />
        </Route>
        <Route exact path={path.add_group}>
          <AddGroup />
        </Route>
        <Route exact path={'/user/user-View/:id'}>
          <ViewUser />
        </Route>
        <Route exact path={'/user/edit-user/:id'}>
          <EditUser/>
        </Route>
        <Route exact path={'/user-profile'}>
          <UserProfile/>
        </Route>
        
        <Route exact path={path.notification}>
          <Notification />
        </Route>
        <Route exact path={path.create_invoice}>
          <CreateInvoice />
        </Route>

        <Route exact path={path.invoice_list}>
          <InvoiceList />
        </Route>
        <Route exact path={'/sales/view-invoice/:id'}>
          <ViewInvoice />
        </Route>
        <Route exact path={'/sales/edit-invoice/:id'}>
          <EditInvoice/>
        </Route>
        <Route exact path={path.customer_list}>
          <CustomerList/>
        </Route>
        <Route exact path={path.add_customer}>
          <AddCustomer/>
        </Route>
        <Route exact path={path.customer_bulk_import}>
          <CustomerBulk/>
        </Route>
        <Route exact path={'/customer/customer-view/:id'}>
          <CustomerView/>
        </Route>
        <Route exact path={`/customer/edit-customer/:id`}>
          <EditCustomer/>
        </Route>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route exact path={path.reports}>
          <Reports />
        </Route>
        <Route exact path={path.sales_report}>
          <DailySalesReport/>
        </Route>
        <Route exact path="/login">
          <Login  setHideToolbar={setHideToolbar}/>
        </Route>
        <Route exact path="/forget-password">
          <ForgetPassword setHideToolbar={setHideToolbar}/>
        </Route>
        <Route exact path="/reset-password">
          <ResetPassword setHideToolbar={setHideToolbar} />
        </Route>
        <Route>
          <Page404 setHideToolbar={setHideToolbar} />
        </Route>
      </Switch>
      {/* </Router> */}
    </div>
  );
};

export default RoutesFile;
