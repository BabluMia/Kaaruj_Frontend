export const has_permissions = (permission_name) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const is_superuser = userData.is_superuser;
  if (is_superuser) return true;
  let permissions = userData.permissions.map((curr) => curr.name);
  console.log("permissions",permissions)
  return permissions.includes(permission_name); //true or false returns
};

export const test_has_permissions = (permission_name) => {
  var test = [];
  return test.includes(permission_name);
};

export const can_add_group = "Can add group";
export const can_change_group = "Can change group";
export const can_delete_group = "Can delete group";
export const can_view_group = "Can view group";
export const can_add_invoice = "Can add invoice";
export const can_change_invoice = "Can change invoice";
export const can_delete_invoice = "Can delete invoice";
export const can_view_invoice = "Can view invoice";
export const can_add_role = "Can add role";
export const can_change_role = "Can change role";
export const can_delete_role = "Can delete role";
export const can_view_role = "Can view role";
export const can_add_user = "Can add user";
export const can_change_user = "Can change user";
export const can_delete_user = "Can delete user";
export const can_view_user = "Can view user";
export const can_add_attributes = "Can add attributes";
export const can_change_attributes = "Can change attributes";
export const can_delete_attributes = "Can delete attributes";
export const can_view_attributes = "Can view attributes";
export const can_add_category = "Can add category";
export const can_change_category = "Can change category";
export const can_delete_category = "Can delete category";
export const can_view_category = "Can view category";
export const can_add_customer = "Can add customer";
export const can_change_customer = "Can change customer";
export const can_delete_customer = "Can delete customer";
export const can_view_customer = "Can view customer";
export const can_add_products = "Can add products";
export const can_change_products = "Can change products";
export const can_delete_products = "Can delete products";
export const can_view_products = "Can view products";
export const can_add_notifications = "Can add notifications";
export const can_change_notifications = "Can change notifications";
export const can_delete_notifications = "Can delete notifications";
export const can_view_notifications = "Can view notifications";
export const can_delete_report = "Can delete dailyreport";
export const can_view_report = "Can view dailyreport";


// Can delete daily report