import React from "react";
import add from "./../../assets/Icon/add.svg";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import scan from "../../assets/Icon/scan.svg";
import { useState } from "react";
import { Alarm, CaretDown, PencilSimple, XCircle } from "phosphor-react";
import RequiredLabel from "../CustomCommons/RequiredLabel";
import PhoneInput from "react-phone-input-2";
import "./invoice.css";
import MultipleInput from "../CustomCommons/MultipleInput";
import Select from "react-select";
import DoIcon from "../CustomCommons/DoIcon";
import ItemRow from "./ItemRow";
import CustomSelect from "../CustomCommons/CustomSelect";
import { handleInputs } from "../../utils/HandleInputs";
import { showToast } from "../../utils/ToastHelper";
import axios from "axios";
import { BASE_URL } from "../Const/Url";
import CreatableSelect from "react-select/creatable";
import { useEffect } from "react";
import SelectDropDown from "../CustomCommons/SelectDropDown";
import swal from "sweetalert";
import { customer_list, product_list } from "../Routes/RoutePaths";
import { getMobileStepperUtilityClass } from "@mui/material";
import { useRef } from "react";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import Try from "./Try";
import * as path from "./../Routes/RoutePaths";
import { useHistory } from "react-router-dom";
import Loader from "../CustomCommons/Loader";
const CreateInvoice = () => {
  const mainEmail = "kaarujbangladesh@gmail.com";
  const mainName = "KAARUJ";
  const mainAddress = "House 148, Block- B, Road 5, Basundhara R/A, Dhaka, Bangladesh";
  const mainMobile = "+8801980907892";
  const [isLoading, SetisLoading] = useState(true);

  const print = useRef();
  const [selectedOption, setSelectedOption] = useState(null);
  const [Thumb, setThumb] = useState(null);
  const delivery_charge = {
    0: 80,
    1: 150,
  };
  const deliveryType = [
    { value: 0, label: "Regular" },
    { value: 1, label: "Urgent" },
  ];
  const invoice_choices = [
    { value: 0, label: "Paid" },
    { value: 1, label: "UnPaid" },
    { value: 2, label: "Due" },
  ];

  const delivery_choices = [
    { value: 0, label: "Processing" },
    { value: 1, label: "Recieved" },
    { value: 2, label: "Delivered" },
  ];
  const paymentType = [
    { value: 0, label: "Cash On Delivery" },
    { value: 1, label: "Card" },
    { value: 2, label: "Bank Transfer" },
    { value: 3, label: "Bkash" },
  ];
  const [pS, setPs] = useState(0);

  const [fromCode, setFromCode] = useState("880");
  const [toCode, setToCode] = useState("880");
  const [InvoiceAllData, SetInvoiceAllData] = useState({
    invoice_date: "",
    invoice_due_date: "",
    invoice_bill_from: mainName,
    invoice_bill_to: "",
    invoice_from_mobile: mainMobile.replace("+880", ""),
    invoice_to_mobile: "",
    invoice_from_email: mainEmail,
    invoice_to_email: "",
    invoice_from_address: mainAddress,
    invoice_to_address: "",
    invoice_notes: "",
    invoice_delivery_charge: 0,
  });
  const [invoice_status, setinvoice_status] = useState(0);
  const [Delivery_status, setDelivey_status] = useState(0);
  const [invoice_delivery_type, setinvoice_delivery_type] = useState(0);
  const [invoice_discount_type, setinvoice_discount_type] = useState(0);
  const [invoice_payment_type, setinvoice_payment_type] = useState(0);
  const [invoice_delivery_charge, setinvoice_delivery_charge] = useState(0);
  const [InvoiceBelowData, SetInvoiceBelowData] = useState({
    invoice_vat: 0,
    invoice_tax: 0,
    invoice_due: 0,
    invoice_paid: 0,
    invoice_total: 0,
  });
  // console.log("------------------------------");
  // console.log("invoice_discount_type", invoice_discount_type);
  // console.log("------------------------------");

  const [optional, setOptional] = useState("");
  const [URL, setURL] = useState("");
  const [fileName, setFileName] = useState("");
  const [Items, SetItems] = useState([]);
  const [Signature, SetSignature] = useState(null);
  const [ProductsList, setProductsList] = useState([]);
  const [CustomerList, setCustomerList] = useState([]);
  const [ProductCom, setProductCom] = useState([]);
  const [mainState, setMainState] = useState({});
  const [mainInnerState, setMainInnerState] = useState({});
  const [Found, setFound] = useState(false);
  const [FoundCustomer, setFoundCustomer] = useState(false);

  const fileHandle = (e) => {
    SetSignature(e.target.files[0]);

    setFileName(e.target.files[0].name);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    setURL(reader.result);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setURL(reader.result);
      }
    };
  };
  const handleOptional = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    setOptional(reader.result);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setOptional(reader.result);
      }
    };
  };
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      color: state.selectProps.menuColor,
    }),
  };

  const convertData = (date) => {
    var current = new Date(date);
    return current.toISOString().substring(0, 10);
  };

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const clearData = () => {
    SetInvoiceAllData({
      invoice_date: "",
      invoice_due_date: "",
      invoice_bill_from: "",
      invoice_bill_to: "",
      invoice_from_mobile: "",
      invoice_to_mobile: "",
      invoice_from_address: "",
      invoice_to_address: "",
      invoice_delivery_charge: "",
      invoice_notes: "",
    });
  };
  const validatePhone = (phoneNo) => {
    const bd = /^[0][1][0-9]{9}$/;
    const format = {
      bd: bd,
    };

    if (phoneNo.length <= 0) {
      showToast("error", "Phone Number Can't be empty.");
      return 0;
    } else if (phoneNo.length < 10) {
      showToast("error", "Please,Enter full phone number...");
      return 0;
    } else if (/[a-z]/i.test(phoneNo)) {
      showToast("error", "Invalid PhoneNumber");
      return 0;
    }
  };
  const history = useHistory();
  const ValidateData = () => {
    const bd = /^[1][0-9]{9}$/;

    if (InvoiceAllData["invoice_date"] === "") {
      showToast("error", "Invoice  Date can't be empty..");
      return 0;
    }
    // else if (InvoiceAllData["invoice_due_date"] === "") {
    //   showToast("error", "Due Date can't be empty..");
    //   return 0;
    // }
    else if (!bd.test(InvoiceAllData["invoice_from_mobile"])) {
      showToast("error", "From Mobile : Please Enter Valid phone number");
      return 0;
    } else if (!bd.test(InvoiceAllData["invoice_to_mobile"])) {
      showToast("error", "To Mobile : Please Enter Valid phone number");
      return 0;
    } else if (!Found && InvoiceAllData["invoice_bill_from"] === "") {
      showToast("error", "Bill from  can't be empty..");
      return 0;
    }
    // else if (!Found && InvoiceAllData["invoice_bill_to"] === "") {
    //   showToast("error", "Bill to  can't be empty..");
    //   return 0;
    // }
    else if (!Found && InvoiceAllData["invoice_bill_to"] === "") {
      showToast("error", "Bill to  can't be empty..");
      return 0;
    }

    // else if (InvoiceAllData["invoice_from_mobile"] === "") {
    //   showToast("error", "From mobile  can't be empty..");
    //   return 0;
    // } else if (InvoiceAllData["invoice_to_mobile"] === "") {
    //   showToast("error", "To mobile  can't be empty..");
    //   return 0;
    // }
    // validatePhone(InvoiceAllData["invoice_from_mobile"]);

    // validatePhone(InvoiceAllData["invoice_to_mobile"]);
    if (InvoiceAllData["invoice_from_email"] === "") {
      showToast("error", "From email  can't be empty..");
      return 0;
    } else if (!validateEmail(InvoiceAllData["invoice_from_email"])) {
      showToast("error", "From email  not valid..");
      return 0;
    }

    // else if (!Found && InvoiceAllData["invoice_to_email"] === "") {
    //   showToast("error", "To email can't be empty..");
    //   return 0;
    // }
    else if (Found && !validateEmail(FoundCustomer?.email) === "" && InvoiceAllData["invoice_to_email"].length > 0) {
      showToast("error", "To email  not valid...");
      return 0;
    } else if (!Found && !validateEmail(InvoiceAllData["invoice_to_email"]) && InvoiceAllData["invoice_to_email"].length > 0) {
      showToast("error", "To email  not valid..");
      return 0;
    } else if (InvoiceAllData["invoice_from_address"] === "") {
      showToast("error", "From address  can't be empty..");
      return 0;
    } else if (!Found && InvoiceAllData["invoice_to_address"] === "") {
      showToast("error", "To address  can't be empty..");
      return 0;
    } else if (Object.keys(mainState).length <= 0) {
      showToast("error", "Product Details is empty..");
      return 0;
    }
    function isEmpty(obj) {
      return Object.keys(obj).length === 0;
    }
    // for (let item in mainState) {
    //   // if (mainState[item]["in_price"] === undefined || isNaN(mainState[item]["in_price"])) {
    //   //   showToast("error", `${item}  Price is empty `);
    //   //   return 0;
    //   // } else

    //   if (mainState[item]["in_quantity"] === undefined || isNaN(mainState[item]["in_quantity"])) {
    //     showToast("error", `${item} Quantity is empty `);
    //     return 0;
    //   }

    //   // else if (mainState[item]["in_vat"] === undefined || isNaN(mainState[item]["in_vat"])) {
    //   //   showToast("error", `${item} Vat is empty `);
    //   //   return 0;
    //   // }
    // }

    const allvariants = Object.values(mainState).map((current) => current["variantObj"]);
    console.log("allvariants", allvariants);

    // for (let items in allvariants) {
    //   const itemsList = Object.values(allvariants[items]);
    //   for (let currentitem in itemsList) {
    //   }
    // }
    if (InvoiceAllData["invoice_notes"] === null) {
      showToast("error", "Notes is empty..");
      return 0;
    }
    // if (Signature === null) {
    //   showToast("error", "Signature is empty..");
    //   return 0;
    // }
    postInvoice();
  };

  // };
  const [isSendingInvoiceProudct, setisSendingInvoiceProudct] = useState(false);
  const allvariants = Object.values(mainState).map((current) => current["variantObj"]);
  console.log("allvariants", allvariants);

  const postInvoiceProduct = (invoiceId) => {
    const url = `${BASE_URL}api/v1/sales/invoice-products/`;

    const allvariants = Object.values(mainState).map((current) => current["variantObj"]);
    var count = 0;
    var data = [];
    for (let items in allvariants) {
      const itemsList = Object.values(allvariants[items]);
      for (let currentitem in itemsList) {
        if (parseInt(itemsList[currentitem]["quantity"]) > 0) {
          setisSendingInvoiceProudct(true);

          //if Quantity is more than  0 then post
          console.log(itemsList[currentitem]);
          // const data = new FormData();
          // const total = parseInt(mainState[item]["in_price"]) * parseInt(item["in_quantity"]) + parseInt(item["in_vat"]);
          // console.log("total]",total);

          // data.append("price", parseInt(itemsList[currentitem]["in_price"]));
          // data.append("quantity", parseInt(itemsList[currentitem]["quantity"]));
          // // // data.append("vat", parseInt(mainState[item]["in_vat"]));
          // data.append("total", parseInt(itemsList[currentitem]["total"]));
          // data.append("product", parseInt(itemsList[currentitem]["product"]));
          // data.append("variant", parseInt(itemsList[currentitem]["id"]));
          // data.append("invoice", invoiceId);
          var postinfo = {
            price: parseInt(itemsList[currentitem]["price"]),
            quantity: parseInt(itemsList[currentitem]["quantity"]),
            // // data.append("vat", parseInt(mainState[item]["in_vat"]));
            total: parseInt(itemsList[currentitem]["total"]),
            product: parseInt(itemsList[currentitem]["product"]),
            variant: parseInt(itemsList[currentitem]["id"]),
            invoice: invoiceId,
          };
          data.push(postinfo);

          // setTimeout(
          //   function () {
          //     axios
          //       .post(url, data)
          //       .then((res) => {
          //         if (res.data.status) {
          //           // clearData();
          //           setisSendingInvoiceProudct(false);
          //         }
          //       })
          //       .catch((err) => {
          //         const message = JSON.parse(err.request.response).message;
          //         const errorMsg = JSON.parse(err.request.response).errors;
          //         console.log(errorMsg);
          //         // for (let value of Object.values(errorMsg)) {
          //         //   showToast("error", value[0]);
          //         // }

          //         for (let key in errorMsg) {
          //           showToast("error", `${key} : ${errorMsg[key][0]}`);
          //         }
          //         showToast("error", message);
          //       });
          //     console.log("waitining");

          //     // alert( "one post done");
          //   },
          //   0 //first time no timeout
          //   // count === 0 ? 0 : 1000 //first time no timeout
          // );
        }
        count++;
      }
    }
    axios
      .post(url, { data: data })
      .then((res) => {
        if (res.data.status) {
          // clearData();
        }
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        const errorMsg = JSON.parse(err.request.response).errors;
        console.log(errorMsg);
        // for (let value of Object.values(errorMsg)) {
        //   showToast("error", value[0]);
        // }

        for (let key in errorMsg) {
          showToast("error", `${key} : ${errorMsg[key][0]}`);
        }
        showToast("error", message);
      });
    console.log("data", data);

    // for(let currentItem=0;currentItem<allvariants.length;currentItem++){
    //   Object.values(currentItem).map((innerCurrent)=>{
    //     console.log(innerCurrent)
    //   })
    // }
  };

  console.log("FoundCustomer---------", FoundCustomer);
  console.log("FoundCustomer- address--------", FoundCustomer.address);
  console.log("invoice payment type ", invoice_payment_type);

  const postInvoice = () => {
    const url = `${BASE_URL}api/v1/sales/invoice/`;
    const data = new FormData();
    // const toMobile = `+${toCode} ${InvoiceAllData["invoice_to_mobile"]}`;
    // const fromMobile = `+${fromCode} ${InvoiceAllData["invoice_from_mobile"]}`;
    const current_user = JSON.parse(localStorage.getItem("userData"));
    data.append("invoice_date", InvoiceAllData["invoice_date"] !== "" && convertData(InvoiceAllData["invoice_date"]));
    // data.append("invoice_date", InvoiceAllData["invoice_date"] !== "" && convertData(InvoiceAllData["invoice_date"]));
    data.append("bill_from", InvoiceAllData["invoice_bill_from"]);
    data.append("bill_to", Found ? FoundCustomer.name : InvoiceAllData["invoice_bill_to"]);
    data.append("from_email", InvoiceAllData["invoice_from_email"]);
    data.append("to_email", Found ? FoundCustomer.email : InvoiceAllData["invoice_to_email"]);
    data.append("from_mobile", Found ? FoundCustomer.mobile : `+${fromCode}${InvoiceAllData["invoice_from_mobile"]}`);
    data.append("to_mobile", `+${toCode}${InvoiceAllData["invoice_to_mobile"]}`);
    data.append("from_address", InvoiceAllData["invoice_from_address"]);
    data.append("to_address", Found ? FoundCustomer.address : InvoiceAllData["invoice_to_address"]);
    data.append("delivery_charge", delivery_charge[InvoiceAllData["invoice_delivery_charge"]]);
    data.append("delivery_charge_type", parseInt(InvoiceAllData["invoice_delivery_charge"]));
    // data.append("total_discount", invoice_discount_type === 0 ? getFlatDiscount() : getPercentageDiscount());
    // if (invoice_discount_type === 0) {
    //   data.append("flat_discount", getFlatDiscount());
    // } else {
    //   data.append("percent_discount", getPercentageDiscount());
    // }
    data.append("total_discount", Discount);

    data.append("discount_type", invoice_discount_type);
    data.append(
      "product_list_json",
      JSON.stringify({
        mainstate: mainState,
        maininnerstate: mainInnerState,
      })
    );
    // const [invoice_status, setinvoice_status] = useState(0);
    // const [invoice_delivery_type, setinvoice_delivery_type] = useState(0);
    // const [invoice_payment_type, setinvoice_payment_type] = useState(0);
    // const [invoice_delivery_charge, setinvoice_delivery_charge] = useState(0)
    data.append("payment_status", invoice_status.value);
    data.append("delivery_status", Delivery_status.value);
    data.append("delivery_type", invoice_delivery_type);
    data.append("payment_type", invoice_payment_type);
    // data.append("payment_status", 0);
    data.append("signature", Signature);
    data.append("notes", InvoiceAllData["invoice_notes"]);
    data.append("created_by", current_user.id);
    data.append("total_tax", 0);
    data.append("total_due", parseInt(getDueAmount()));
    data.append("total_paid", paid);
    data.append("total_amount", parseInt(getGrandTotal()));
    data.append("total_vat", 0);

    axios
      .post(url, data)
      .then((res) => {
        if (res.data.status) {
          console.log(res);
          postInvoiceProduct(res.data.data.id);
          // clearData();
          showToast("success", "Invoice Created.");
          history.push(path.invoice_list);
        }
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        const errorMsg = JSON.parse(err.request.response).errors;
        console.log(errorMsg);
        // for (let value of Object.values(errorMsg)) {
        //   showToast("error", value[0]);
        // }

        for (let key in errorMsg) {
          showToast("error", `${key} : ${errorMsg[key][0]}`);
        }
        showToast("error", message);
      });
  };

  const getProductList = () => {
    const url = `${BASE_URL}api/v1/inventory/products/`;

    axios
      .get(url)
      .then((res) => {
        // console.log(res.data.data.results);
        const result = res.data.data.results;
        console.log(result, "-----------");
        const options = result.map((curr) => ({
          label: curr.name,
          value: curr.id,
          price: curr.price,
          discount: curr.discount,
          stock: curr.stock,
          variant: curr.variants,
          thumb: curr.thumb,
        }));

        setProductsList(options);
        SetisLoading(false);
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        // console.log(err.request.response);
      });
  };
  console.log("ProductsList", ProductsList);

  const getCustomerList = () => {
    const url = `${BASE_URL}api/v1/inventory/customer/`;

    axios
      .get(url)
      .then((res) => {
        const result = res.data.data.results;
        setCustomerList(result);
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        // console.log(err.request.response);
      });
  };

  const removeImg = () => {
    swal({
      title: "Are you sure?",
      text: "Once Removed, you will not be able to recover this  file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setURL("");
        setFileName("");
        swal("Poof! Your  file has been Removed!", {
          icon: "success",
        });
      } else {
        swal("Your  file is safe!");
      }
    });
  };

  const handleMultiInputChange = (newValue, actionMeta) => {
    console.log(actionMeta);
    const newVal = actionMeta?.option?.label;
    setProductCom(newValue);
    console.log("actionMeta.action", actionMeta);
    if (actionMeta.action === "select-option") {
      let variants = actionMeta.option.variant.map((curr) => ({
        id: curr.id,
        name: curr.variant,
        price: curr.price,
        stock: curr.stock,
        product: curr.product,
        quantity: -1,
        total: 0,
      }));
      const variantsObj = {};
      actionMeta.option.variant.map(
        (curr) =>
          (variantsObj[curr.variant] = {
            id: curr.id,
            name: curr.variant,
            price: curr.price,
            stock: curr.stock,
            product: curr.product,
            quantity: -1,
            total: 0,
          })
      );
      setMainState({
        ...mainState,
        [newVal]: {
          id: actionMeta.option.value,
          variant: variants,
          variantObj: variantsObj,
          price: parseInt(actionMeta.option.price),
          stock: parseInt(actionMeta.option.stock),
          thumb: actionMeta.option.thumb,
          discount: parseInt(actionMeta.option.discount),
        },
      });
    }
    if (actionMeta.action === "remove-value") {
      delete mainState[actionMeta.removedValue.label];
      setMainState({ ...mainState });
    }
  };

  const handleInnerVariant = (currentName, value) => {
    console.log("currentName", currentName);
    console.log("value", value);
    setMainInnerState({
      ...mainInnerState,
      [currentName]: value,
    });
  };

  console.log("mainInnerState", mainInnerState);
  useEffect(() => {
    getProductList();
    getCustomerList();
  }, []);

  useEffect(() => {
    // ProductsList['stock']<
  }, []);
  console.log("mainState", mainState);
  const HandleNewProductsInputValue = (e, product_name) => {
    let name = e.target.name;
    let value = parseInt(e.target.value);
    // if (name === "in_quantity") {
    //   let stock = ProductsList.filter((current) => current.label === product_name)[0]["stock"];
    //   if (parseInt(stock) < parseInt(value)) {
    //     showToast("error", `${product_name} Max Stock = ${stock}`);
    //     setMainState({ ...mainState, [product_name]: { ...mainState[product_name], [name]: "" } });
    //   }
    // }

    setMainState({
      ...mainState,
      [product_name]: { ...mainState[product_name], [name]: value },
    });
  };

  useEffect(() => {
    Object.keys(ProductsList).map((curr, index) => {
      setMainState({
        ...mainState,
        [curr]: { ...mainState[curr], in_price: ProductsList[index]["price"] },
      });
    });
  }, []);
  const toPhoneHandle = (e) => {
    let value = `+${toCode}${e.target.value}`;

    handleInputs(e, SetInvoiceAllData);
    Object.values(CustomerList).map((curr) => {
      console.log("curr.mobile", curr.mobile);
      console.log("value", value);
      if (curr.mobile === value) {
        setFound(true);
        setFoundCustomer(curr);
        showToast("success", "Found Customer");
      } else {
        setFound(false);
      }
    });
  };
  const VariantThead = () => {
    return (
      <>
        {Object.keys(mainInnerState).length > 0 && (
          <thead style={{ border: "1.5px solid #E0E0E0" }}>
            <tr className="px-3" style={{ height: "45px" }}>
              <th className="minWidthForInvoiceCreateTable ps-4" style={{ width: "349px", textAlign: "start" }}>
                Variant
              </th>
              <th className="minWidthForInvoiceCreateTable  py-3" style={{ width: "150px", textAlign: "center" }}>
                Price
              </th>

              <th className="minWidthForInvoiceCreateTable  py-3" style={{ width: "150px", textAlign: "center" }}>
                In Stock
              </th>
              <th className="minWidthForInvoiceCreateTable py-3" style={{ width: "150px", textAlign: "center" }}>
                Quantity
              </th>

              <th className="minWidthForInvoiceCreateTable py-3" style={{ width: "150px", textAlign: "center" }}>
                Total
              </th>
            </tr>
          </thead>
        )}
      </>
    );
  };
  const [paid, setpaid] = useState(0);
  const [Discount, setDiscount] = useState(0);
  const getTotal = (curr, innerCur) => {
    return Object.keys(mainState).length > 0 && mainState !== undefined && mainState[curr] !== undefined && mainState[curr]["variant"]["total"];
  };
  // const getSubTotal = () => {
  //   // let basePrice = mainState[]
  //   // const allarray = Object.values(mainState).map(
  //   //   (curr) => curr.variant !== undefined && curr.variant.map((variants) => parseInt(variants.total)).reduce((a, b) => a + b, 0)

  //   // );
  //   var allarray = [];
  //   for (let product in mainState) {
  //     let basePrice = parseInt(mainState[product]);
  //     allarray = product.variant !== undefined && product.variant.map((variants) => basePrice + parseInt(variants.total)).reduce((a, b) => a + b, 0);
  //   }

  //   var sum = 0;
  //   for (let i in allarray) {
  //     sum += parseInt(allarray[i]);
  //   }
  //   return sum;
  // };

  // const getSubTotal = () => {
  //   const allarray = Object.values(mainState).map(
  //     (curr) => curr.variant !== undefined && curr.variant.map((variants) => parseInt(variants.total)).reduce((a, b) => a + b, 0)
  //   );

  //   var sum = 0;
  //   for (let i in allarray) {
  //     sum += parseInt(allarray[i]);
  //   }
  //   return sum;
  // };
  const getAllVariantName = () => {
    var res = mainInnerState !== undefined && [].concat(...Object.values(mainInnerState).map((a) => a.map((b) => b.label)));
    return res;
  };
  console.log("getAllVariantName", getAllVariantName());

  const getSubTotal = () => {
    const allarray = Object.values(mainState).map(
      (curr) =>
        curr.variant !== undefined &&
        curr.variant.map((variants) => (getAllVariantName().includes(variants.name) ? parseInt(variants.total) : 0)).reduce((a, b) => a + b, 0)
    );

    var sum = 0;
    for (let i in allarray) {
      sum += parseInt(allarray[i]);
    }
    return sum;
  };
  const getDiscountOrMainPrice = (curr, innerCur) => {
    return parseInt(mainState[curr] !== undefined && (mainState[curr].discount === 0 ? mainState[curr].price : mainState[curr].discount));
  };
  const getBasePlusVariant = (curr, innerCur) => {
    return getDiscountOrMainPrice(curr, innerCur) + parseInt(innerCur.price);
  };
  const getFlatDiscount = () => {
    return Discount;
  };

  const getDeliveryCharge = () => {
    return invoice_payment_type === 0 ? delivery_charge[invoice_delivery_charge] : 0;
  };
  const getPercentageDiscount = () => {
    let total = getSubTotal() + getDeliveryCharge();
    return parseInt((Discount / 100) * total);
  };

  const getGrandTotal = () => {
    const discountCalc = invoice_discount_type === 0 || invoice_discount_type === "0" ? getFlatDiscount() : getPercentageDiscount();
    const grand = getSubTotal() + getDeliveryCharge() - discountCalc;
    return grand < 0 ? 0 : parseInt(grand);
  };

  const getDueAmount = () => {
    const due = getGrandTotal() - paid;
    return due < 0 ? 0 : due;
  };
  const handlePrint = useReactToPrint({
    content: () => print.current,
    documentTitle: "emp-data",
    bodyClass: "dis",
  });
  const handlePrint2 = () => {
    if (
      InvoiceAllData["invoice_from_email"] !== "" ||
      InvoiceAllData["invoice_to_email"] ||
      InvoiceAllData["invoice_bill_to"] ||
      InvoiceAllData["invoice_bill_form"]
    ) {
      handlePrint();
    } else {
      swal("Empty Data,Please fill the form");
    }
  };

  // console.log(Found, "--------found------");
  // console.log(InvoiceAllData, "--------InvoiceAllData found------");

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="categorey-parent">
        <div className="bg-white cat-child ">
          <div className="d-flex align-items-center" style={{ padding: "20px 24px ", border: "0.5px solid #E0E0E0" }}>
            <h3 style={{ fontSize: "23px", marginTop: "6px", marginLeft: "12px" }}>Invoice Details</h3>
          </div>
          {/* -----------product form---------- */}
          <div className="product-main createInvoiceInputContainer">
            <div className="row">
              <div className="col-12 col-md-6">
                {/* <RequiredLabel text="Invoice Number" /> */}
                <p>Invoice Number</p>

                <InputGroup className="mb-3">
                  <Form.Control
                    disabled
                    aria-label="Username"
                    placeholder="This will be generated automatically."
                    aria-describedby="basic-addon1"
                    style={{ backgroundColor: "#FAFAFA" }}
                  />
                </InputGroup>
              </div>
              <div className="col-12 col-md-6">
                <p>Barcode</p>
                <InputGroup className="mb-3">
                  <Form.Control
                    disabled
                    placeholder="This will be generated automatically"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    style={{ backgroundColor: "#FAFAFA" }}
                  />
                </InputGroup>
              </div>

              <div className="col-12 col-md-6">
                <RequiredLabel text="Invoice Date" />
                <div className="position-relative">
                  <InputGroup className="mb-3">
                    <Form.Control
                      type="date"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      style={{ backgroundColor: "#FAFAFA" }}
                      placeholder="Select a date"
                      name="invoice_date"
                      value={InvoiceAllData["invoice_date"]}
                      onChange={(e) => handleInputs(e, SetInvoiceAllData)}
                    />
                  </InputGroup>
                  {/* <div className="calenderContainer">
                    <CalendarBlank size={20} />
                  </div> */}
                </div>
              </div>
              <div className="col-12 col-md-6 ">
                <RequiredLabel text={"Delivery Type"} />
                <div className="" style={{ height: "47px" }}>
                  <Form.Select
                    size="lg"
                    placeholder="---Select---"
                    onChange={(e) => setinvoice_delivery_type(e.target.value)}
                    style={{
                      backgroundColor: "#FAFAFA",
                      fontSize: "16px",
                      height: "47px",
                      borderRadius: "8px",
                      color: "#828282",
                    }}
                  >
                    <option value={0}>Reguler</option>
                    <option value={1}>Urgent</option>
                  </Form.Select>
                </div>
              </div>

              {/* <div className="col-12 col-md-6 ">
                <RequiredLabel text="Due Date" />

                <div className="position-relative ">
                  <InputGroup className="mb-3">
                    <Form.Control
                      type="date"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      style={{ backgroundColor: "#FAFAFA" }}
                      placeholder="Select a date"
                      name="invoice_due_date"
                      value={InvoiceAllData["invoice_due_date"]}
                      onChange={(e) => handleInputs(e, SetInvoiceAllData)}
                    />
                  </InputGroup>
             
                </div>
              </div> */}

              <div className="col-12 col-md-6">
                <RequiredLabel text="From Mobile" />
                {/* <p></p> */}

                <div className="d-flex phoneContainer ">
                  <PhoneInput inputClass="phoneinput" disableDropdown onChange={(e) => setFromCode(e)} country={"bd"} />
                  {/* <PhoneInput inputClass="phoneinput" disableDropdown onChange={(e) => setFromCode(e)} enableSearch={true} country={"bd"} /> */}
                  <div className="w-100">
                    <Form.Control
                      aria-label="Input number"
                      placeholder="Input number"
                      aria-describedby="basic-addon1"
                      style={{ backgroundColor: "#FAFAFA" }}
                      className="phone_insert_input"
                      name="invoice_from_mobile"
                      value={InvoiceAllData["invoice_from_mobile"]}
                      onChange={(e) => handleInputs(e, SetInvoiceAllData)}
                    />
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6 mb-3">
                <RequiredLabel text="To Mobile" />

                <div className="d-flex phoneContainer ">
                  <PhoneInput inputClass="phoneinput" disableDropdown onChange={(e) => setToCode(e)} enableSearch={true} country={"bd"} />
                  {/* <PhoneInput inputClass="phoneinput"  onChange={(e) => setToCode(e)} enableSearch={true} country={"bd"} /> */}
                  <div className="w-100">
                    <Form.Control
                      aria-label="Input number"
                      placeholder="Input number"
                      aria-describedby="basic-addon1"
                      style={{ backgroundColor: "#FAFAFA" }}
                      className="phone_insert_input"
                      name="invoice_to_mobile"
                      value={InvoiceAllData["invoice_to_mobile"]}
                      onChange={(e) => toPhoneHandle(e)}
                    />
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6 mt-3">
                <RequiredLabel text="Bill From" />

                <InputGroup className="mb-3">
                  <Form.Control
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    style={{ backgroundColor: "#FAFAFA" }}
                    name="invoice_bill_from"
                    value={InvoiceAllData["invoice_bill_from"]}
                    onChange={(e) => handleInputs(e, SetInvoiceAllData)}
                  />
                </InputGroup>
              </div>

              <div className="col-12 col-md-6 mt-3">
                <RequiredLabel text="Bill To" />

                <InputGroup className="mb-3">
                  <Form.Control
                    name="invoice_bill_to"
                    value={Found ? FoundCustomer.name : InvoiceAllData["invoice_bill_to"]}
                    onChange={(e) => handleInputs(e, SetInvoiceAllData)}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    style={{ backgroundColor: "#FAFAFA" }}
                  />
                </InputGroup>
              </div>

              {/* new  */}

              <div className="col-12 col-md-6">
                <RequiredLabel text={"Payment Type"} />
                <div className="mb-3">
                  <Form.Select
                    size="lg"
                    placeholder="---Select---"
                    onChange={(e) => {
                      setinvoice_payment_type(e.target.value);
                    }}
                    style={{
                      backgroundColor: "#FAFAFA",
                      fontSize: "16px",
                      height: "47px",
                      borderRadius: "8px",
                      color: "#828282",
                    }}
                  >
                    {paymentType.map((curr) => {
                      return <option value={curr.value}>{curr.label}</option>;
                    })}
                  </Form.Select>
                </div>
                {/* <div className="cus" style={{ backgroundColor: "#FAFAFA" }}>
                  <Select
                    placeholder="---Select---"
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={paymentType}
                    menuColor={"#828282"}
                    styles={customStyles}
                  />
                </div> */}
              </div>
              <div className="col-12 col-md-6">
                <RequiredLabel text={"Delivery Charge"} />
                <div className="mb-3">
                  <Form.Select
                    size="lg"
                    placeholder="---Select---"
                    onChange={(e) => setinvoice_delivery_charge(e.target.value)}
                    style={{
                      backgroundColor: "#FAFAFA",
                      fontSize: "16px",
                      height: "47px",
                      borderRadius: "8px",
                      color: "#828282",
                    }}
                  >
                    <option value={0}>Inside Dhaka : 80/-</option>
                    <option value={1}>Outside Dhaka : 150/-</option>
                  </Form.Select>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <RequiredLabel text="From Email" />

                <InputGroup className="mb-3">
                  <Form.Control
                    aria-label="Username"
                    type="email"
                    aria-describedby="basic-addon1"
                    style={{ backgroundColor: "#FAFAFA" }}
                    name="invoice_from_email"
                    value={InvoiceAllData["invoice_from_email"]}
                    onChange={(e) => handleInputs(e, SetInvoiceAllData)}
                  />
                </InputGroup>
              </div>

              <div className="col-12 col-md-6 ">
                {/* <RequiredLabel text="To Email" /> */}
                <p>To Email</p>

                <InputGroup className="mb-3">
                  <Form.Control
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    style={{ backgroundColor: "#FAFAFA" }}
                    name="invoice_to_email"
                    type="email"
                    value={Found ? FoundCustomer.email : InvoiceAllData["invoice_to_email"]}
                    onChange={(e) => handleInputs(e, SetInvoiceAllData)}
                  />
                </InputGroup>
              </div>

              <div className="col-12 col-md-6">
                <RequiredLabel text="From Address" />

                <InputGroup className="mb-3 addressInput">
                  <Form.Control
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    style={{ backgroundColor: "#FAFAFA" }}
                    name="invoice_from_address"
                    value={InvoiceAllData["invoice_from_address"]}
                    onChange={(e) => handleInputs(e, SetInvoiceAllData)}
                  />
                </InputGroup>
              </div>

              <div className="col-12 col-md-6">
                <RequiredLabel text="To Address" />

                <InputGroup className="mb-3 addressInput">
                  <Form.Control
                    aria-label="Username"
                    name="invoice_to_address"
                    value={Found ? FoundCustomer.address : InvoiceAllData["invoice_to_address"]}
                    onChange={(e) => (Found ? setFoundCustomer({ ...FoundCustomer, address: e.target.value }) : handleInputs(e, SetInvoiceAllData))}
                    aria-describedby="basic-addon1"
                    style={{ backgroundColor: "#FAFAFA" }}
                  />
                </InputGroup>
              </div>

              <div className="col-12 col-md-6">
                <RequiredLabel text={"Discount Type"} />
                <div className="mb-3" style={{ height: "47px" }}>
                  <Form.Select
                    size="lg"
                    placeholder="---Select---"
                    onChange={(e) => setinvoice_discount_type(e.target.value)}
                    style={{
                      backgroundColor: "#FAFAFA",
                      fontSize: "16px",
                      height: "47px",
                      borderRadius: "8px",
                      color: "#828282",
                    }}
                    value={invoice_discount_type}
                  >
                    <option value={0}>Flat </option>
                    <option value={1}>Percentage</option>
                  </Form.Select>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ====================attribute=================== */}
        <div className="invoice-b my-4 bg-white cat-child" style={{ borderTop: "0.5px solid #E0E0E0" }}>
          <h4 className=" my-2 mb-4 padding-main-head">Product Details</h4>
          <div className="border-p"></div>
          <div className="padding-main">
            <div className="main-select">
              {/* <CreatableSelect
                isMulti
                styles={{ height: "65px" }}
                options={ProductsList}
                placeholder="Enter a choice value"
                onChange={handleMultiInputChange}
              /> */}
              <Select
                // styles={styles}
                isMulti
                placeholder="---Select---"
                isClearable
                // defaultValue={selectedOption}
                onChange={handleMultiInputChange}
                options={ProductsList}
              />
            </div>

            {/* </div> */}
            {/* </div> */}
            <div className="mt-3">
              <div
                className="rounded"
                style={{
                  background: "#FAFAFA",
                  display: "block",
                  overflowX: "hidden",
                  width: "100%",
                }}
              >
                <table className="item-tables table_my2">
                  <tbody>
                    {/* //Here-------------------------- */}
                    {Object.keys(mainState).map((curr, index) => {
                      console.log("curr---------", curr);
                      console.log("curr---------var", mainState[curr]["variant"]);

                      return (
                        <>
                          {mainState[curr]["variant"].length > 0 ? (
                            <>
                              <div className="mt-4  px-2" style={{ background: " rgba(245, 245, 245, 0.36)", border: "none", height: "119px" }}>
                                <div className="row py-3 my-3" style={{ height: "45px" }}>
                                  <div className="col-2 minWidthForInvoiceCreateTable ps-4" style={{ textAlign: "start" }}>
                                    <p>Product</p>
                                  </div>
                                  <div className="col-4 minWidthForInvoiceCreateTable  py-1" style={{ textAlign: "center" }}>
                                    Total Stock
                                  </div>
                                  <div className="col-5 minWidthForInvoiceCreateTable  py-1" style={{ textAlign: "center" }}>
                                    Variants
                                  </div>
                                </div>
                                <div className="row  " style={{ height: "45px" }}>
                                  <div className="col-2 ps-4 py-1 d-flex align-items-center">
                                    <p className="text-capitalize">{curr}</p>
                                    <img
                                      width={50}
                                      style={{ margin: "6px 0px !important", border: "0.2px solid #bcb0b0" }}
                                      height={50}
                                      src={!isLoading && mainState[curr]["thumb"]}
                                      alt="failed"
                                      className="ms-3 shadow-sm"
                                    />
                                    {console.log(" mainState[curr][thumb", mainState[curr]["thumb"])}
                                  </div>
                                  <div className="col-4 py-1">
                                    <p className="text-capitalize text-center d-flex align-items-center justify-content-center">
                                      {Number(mainState[curr]["stock"])}
                                      {/* {Number(mainState[curr]["stock"]) - Number(pS)} */}
                                    </p>
                                  </div>
                                  <div className="col-5 text-center   py-1 pe-2">
                                    <div className="" style={{ marginTop: "-10px" }}>
                                      {/* <div className="" style={{ marginTop: "-10px" }}> */}
                                      <Select
                                        styles={{
                                          height: "45px",
                                          background: "black",
                                        }}
                                        isMulti
                                        placeholder="-Select Variants-"
                                        isClearable
                                        onChange={(value) => {
                                          handleInnerVariant(curr, value);
                                        }}
                                        options={
                                          mainState[curr]["variant"] !== undefined &&
                                          Object.values(mainState[curr]["variant"]).map((curr) => ({
                                            label: curr.name,
                                            value: curr.id,
                                            price: curr.price,
                                            stock: curr.stock,
                                            quantity: 1,
                                          }))
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <table className="mapTable shadow-sm ms-2">
                                <thead
                                  className="mt-4"
                                  style={{
                                    background: " rgba(245, 245, 245, 0.36)",
                                  }}
                                ></thead>
                                <tbody className="innerTbody w-100">
                                  {mainInnerState !== undefined &&
                                    mainInnerState[curr] !== undefined &&
                                    mainInnerState[curr].map((innerCur, index) => {
                                      return (
                                        <>
                                          {index === 0 && <VariantThead />}

                                          <tbody>
                                            <tr className="border-invoice" style={{ height: "45px" }}>
                                              <td className="ps-4 py-3">
                                                <p className="text-capitalize">{innerCur.label}</p>
                                                {/* <input className="invoiceCreateBigInputs" value={name} type="text" /> */}
                                              </td>
                                              <td className="text-center   py-3" style={{ minWidth: "300px" }}>
                                                <input
                                                  name="in_price"
                                                  // onChange={(e) => HandleNewProductsInputValue(e, curr)}
                                                  value={getBasePlusVariant(curr, innerCur)}
                                                  className="invoiceCreateSmallInputs"
                                                  placeholder="00.00"
                                                  type="text"
                                                />
                                              </td>
                                              <td className="text-center   py-3">
                                                <input
                                                  name="in_price"
                                                  // onChange={(e) => HandleNewProductsInputValue(e, curr)}
                                                  value={Number(innerCur.stock)}
                                                  className="invoiceCreateSmallInputs"
                                                  placeholder="00.00"
                                                  type="text"
                                                />
                                                {/* {console.log(mainState[curr]["variantObj"][innerCur],'------vvv----------')} */}
                                              </td>
                                              <td className="text-center   py-3">
                                                <input
                                                  name="in_quantity"
                                                  onChange={(e) => {
                                                    // HandleNewProductsInputValue(e, innerCur);
                                                    const productName = curr;
                                                    if (e.target.value < 0) {
                                                      setPs(0);
                                                    } else {
                                                      setPs(e.target.value);
                                                    }

                                                    // console.log(productName);
                                                    // console.log("innerCurr", innerCur);
                                                    // console.log("mainState[curr]", mainState[curr]);
                                                    // console.log("mainState[productName]", mainState[productName]);
                                                    // console.log("mainState[productName]['variants']", mainState[productName]["variant"]);
                                                    // console.log("mainState[productName]['variantObj']", mainState[productName]["variantObj"]);
                                                    // console.log(
                                                    //   'mainState[productName]["variantObj"][innerCur.label]',
                                                    //   mainState[productName]["variantObj"][innerCur.label]
                                                    // );
                                                    console.log("=======================");
                                                    console.log(
                                                      "mainState[productName]['variants'][index]",
                                                      mainState[productName]["variant"][index]
                                                    );
                                                    console.log(
                                                      "mainState[productName]['variants'][index]",
                                                      mainState[productName]["variant"][index]["quantity"]
                                                    );
                                                    console.log("=======================");

                                                    setMainState((prevInputs) => {
                                                      const copiedObjects = Object.assign({}, mainState); // Shallow copy
                                                      console.log("copiedObjects", copiedObjects);
                                                      // copiedObjects["Blankets"]["variant"][index]['quantity'] = 12; // Assign new value
                                                      const keyOfVariant = Object.keys(copiedObjects[productName]["variant"]).filter(
                                                        (curr) => copiedObjects[productName]["variant"][curr]["name"] === innerCur.label
                                                      );
                                                      const variantName = innerCur.label;
                                                      console.log("innercur", innerCur);
                                                      if (parseInt(e.target.value) < 0) {
                                                        copiedObjects[productName]["variant"][keyOfVariant]["quantity"] = 0;
                                                        copiedObjects[productName]["variantObj"][variantName]["quantity"] = 0;
                                                      } else if (parseInt(e.target.value) > innerCur.stock) {
                                                        showToast("error", `Max Stock : ${innerCur.stock}`);
                                                        copiedObjects[productName]["variant"][keyOfVariant]["quantity"] = 0;
                                                        copiedObjects[productName]["variantObj"][variantName]["quantity"] = 0;
                                                        copiedObjects[productName]["variant"][keyOfVariant]["quantity"] = innerCur.stock;
                                                        copiedObjects[productName]["variantObj"][variantName]["quantity"] = innerCur.stock;
                                                      } else {
                                                        copiedObjects[productName]["variant"][keyOfVariant]["quantity"] = e.target.value;
                                                        copiedObjects[productName]["variantObj"][variantName]["quantity"] = e.target.value;
                                                      }

                                                      let checkDiscountPrice =
                                                        parseInt(copiedObjects[productName]["discount"]) === 0
                                                          ? parseInt(copiedObjects[productName]["price"])
                                                          : parseInt(copiedObjects[productName]["discount"]);
                                                      console.log("checkDiscountPrice", checkDiscountPrice);
                                                      const baseAndVariant =
                                                        parseInt(copiedObjects[productName]["variant"][keyOfVariant]["price"]) + checkDiscountPrice;
                                                      copiedObjects[productName]["variant"][keyOfVariant]["total"] =
                                                        parseInt(copiedObjects[productName]["variant"][keyOfVariant]["quantity"]) * baseAndVariant;

                                                      const baseAndVariantObj =
                                                        parseInt(copiedObjects[productName]["variantObj"][variantName]["price"]) + checkDiscountPrice;
                                                      console.log("baseAndVariantObj price--", baseAndVariantObj);
                                                      copiedObjects[productName]["variantObj"][variantName]["total"] =
                                                        parseInt(copiedObjects[productName]["variantObj"][variantName]["quantity"]) *
                                                        baseAndVariantObj;

                                                      return copiedObjects; // Return copied object
                                                    });
                                                  }}
                                                  className="invoiceCreateSmallInputs"
                                                  placeholder="00.00"
                                                  type="number"
                                                  value={
                                                    (mainState === undefined &&
                                                      mainState[curr] === undefined &&
                                                      mainState[curr]["variantObj"] === undefined &&
                                                      mainState[curr]["variantObj"][innerCur.label] === undefined &&
                                                      mainState[curr]["variantObj"][innerCur.label]["quantity"] === undefined) ||
                                                    mainState[curr]["variantObj"][innerCur.label]["quantity"] === "-1" ||
                                                    mainState[curr]["variantObj"][innerCur.label]["quantity"] === -1
                                                      ? 0
                                                      : mainState[curr]["variantObj"][innerCur.label]["quantity"]
                                                  }
                                                />
                                              </td>
                                              <td className="text-center py-3 ">
                                                <input
                                                  // name="in_total"
                                                  value={
                                                    (mainState === undefined && mainState[curr] === undefined) ||
                                                    isNaN(mainState[curr]["variantObj"][innerCur.label]["total"])
                                                      ? 0
                                                      : mainState[curr]["variantObj"][innerCur.label]["total"]
                                                  }
                                                  className="invoiceCreateSmallInputs"
                                                  placeholder="00.00"
                                                  type="text"
                                                />
                                              </td>{" "}
                                            </tr>
                                          </tbody>
                                        </>
                                      );
                                      // return <h2>{innerCurr.label}</h2>;
                                    })}
                                </tbody>

                                {/* <VariantTable /> */}
                              </table>
                            </>
                          ) : (
                            <div>No variant</div>
                          )}
                        </>
                      );
                    })}
                  </tbody>
                </table>

                <div className="d-flex flex-column flex-md-row mt-4 justify-content-between mx-4">
                  <div>
                    <h6>Total Item : {Object?.keys(mainState)?.length}</h6>
                  </div>
                  <div>
                    <div
                      className="d-flex justify-content-between "
                      style={{
                        color: "#212121",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      <p>Sub Total :</p>
                      <p className="ms-3 ">
                        <input
                          className="ms-3 invoiceInpCss"
                          type="text"
                          value={isNaN(getSubTotal()) ? 0 : getSubTotal()}

                          // value={Object.values(mainState)
                          // .map((curr) => curr.in_price * curr.in_quantity + curr.in_vat)
                          // .reduce((a, b) => a + b, 0)}
                        />
                      </p>
                    </div>

                    <div className="d-flex justify-content-between cl">
                      <p>Delivery Charge : </p>
                      <p className="ms-3 ">
                        <input
                          className="ms-3 invoiceInpCss"
                          type="text"
                          // onChange={(e) => console.log(e.target.value)}
                          value={invoice_payment_type === 0 || invoice_payment_type === "0" ? delivery_charge[invoice_delivery_charge] : 0}
                          // value={getDeliveryCharge()}
                        />
                      </p>
                    </div>

                    <div className="d-flex justify-content-between pl pt-2">
                      <p>Paid amount :</p>
                      <p className="ms-3 ">
                        <input
                          className="ms-3 invoiceInpCss paid_input_css"
                          name="invoice_paid"
                          type="text"
                          value={paid}
                          onChange={(e) => setpaid(e.target.value)}
                        />
                      </p>
                    </div>

                    <div className="d-flex justify-content-between pl pt-2">
                      <p>Discount {invoice_discount_type === "0" || invoice_discount_type === 0 ? "" : "%"} :</p>
                      <p className="ms-3 ">
                        <input
                          className="ms-3 invoiceInpCss paid_input_css"
                          name="invoice_paid"
                          type="text"
                          value={Discount}
                          onChange={(e) => setDiscount(e.target.value)}
                        />
                      </p>
                    </div>
                    <div className="d-flex justify-content-between cl">
                      <p>Due amount :</p>
                      <p className="ms-3 ">
                        <input className="ms-3 invoiceInpCss" type="text" name="invoice_due" value={isNaN(getDueAmount()) ? 0 : getDueAmount()} />
                      </p>{" "}
                    </div>
                    <div
                      className="d-flex justify-content-between"
                      style={{
                        color: "#212121",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      <p>Total amount :</p>
                      <p className="ms-3 ">
                        <input className="ms-3 invoiceInpCss" type="text" value={isNaN(getGrandTotal()) ? 0 : getGrandTotal()} />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div
          className="product-main my-4 bg-white cat-child mt-3"
          style={{ borderTop: "0.5px solid #E0E0E0" }}
        ></div> */}

        {/* ====================attribute=================== */}
        <div className="product-main my-4 bg-white cat-child" style={{ borderTop: "0.5px solid #E0E0E0" }}>
          <div>
            <p>Payment Status</p>
            {/* <Select
              placeholder="---Select---"
              defaultValue={InvoiceAllData['invoice_status']}
              onChange={setinvoi}
              options={options1}
            /> */}
            <SelectDropDown options={invoice_choices} setSelectedOptionCategory={setinvoice_status} />
            {
              // console.log(,'---------------option----------')
            }

            <p className="mt-4">Delivery Status</p>

            <SelectDropDown options={delivery_choices} setSelectedOptionCategory={setDelivey_status} />

            {/* notes */}
            <div className="mt-3 d-flex align-content-center">
              <PencilSimple size={12} weight="light" className="mt-0 pe-1" />{" "}
              <p style={{ color: "#333333" }} className="mb-2">
                Notes
              </p>
            </div>
            <Form.Control
              as="textarea"
              placeholder=""
              className="mb-3"
              name="invoice_notes"
              value={InvoiceAllData["invoice_notes"]}
              onChange={(e) => handleInputs(e, SetInvoiceAllData)}
              style={{
                height: "100px",
                resize: "none",
                backgroundColor: "#FAFAFA",
              }}
            />
          </div>

          <div className="row d-flex justify-content-between"></div>
        </div>
        {/* <div className="product-main my-4 bg-white cat-child" style={{ borderTop: "0.5px solid #E0E0E0" }}>
          <RequiredLabel text={"Author Signature"} />
          <div className="row">
            <div
              className=" browse-main d-flex align-items-center col-lg-4 col-12 col-md-6"
              style={{
                height: "55px",
                border: "1px solid #E0E0E0",
                borderRadius: "7px",
                overflowX: "hidden",
              }}
            >
              {fileName === "" ? (
                <p className="my-2 ms-2" style={{ color: "#4F4F4F" }}>
                  No File Choosen
                </p>
              ) : (
                <p className="my-2 ms-2" style={{ color: "#4F4F4F" }}>
                  {fileName}
                </p>
              )}

              <div className="file-up">
                <input type="file" onChange={(e) => fileHandle(e)} accept="image/*" />
                <p>Browse</p>
              </div>
            </div>
            {URL && (
              <div className="my-2">
                <img height={90} width={90} src={URL} alt="" /> <br />
                <button onClick={removeImg} className="remove-btn btn btn-small mt-1  rounded" style={{ border: "1px solid gray !important" }}>
                  Remove
                </button>
              </div>
            )}
          </div>
        </div> */}
        <div className="padding-btn-head mb-4 d-flex justify-content-end  bg-white cat-child" style={{ border: "0.5px solid #E0E0E0" }}>
          <div className="" style={{ marginLeft: "-10px" }}>
            <button
              className={`btn rounded border align-items-center me-2 mt-2 ${!mainState} && 'd-none'}`}
              disabled={!InvoiceAllData}
              onClick={handlePrint2}
            >
              <DoIcon className="doc" /> Preview PDF
            </button>

            {/* <button onClick={postInvoiceProduct} className="btn rounded border me-2 mt-2"> */}
            <button onClick={ValidateData} className="btn rounded border me-2 mt-2">
              Save Invoice
            </button>
            <button className="btn rounded border me-2 mt-2" onClick={() => history.push(path.invoice_list)}>
              Cancel
            </button>
            {InvoiceAllData["invoice_to_email"] !== "" && !Found && validateEmail(InvoiceAllData["invoice_to_email"]) && (
              <button className="btn rounded border text-white mt-2" style={{ background: "black" }}>
                Save & Send PDF
              </button>
            )}

            {Found && FoundCustomer?.email !== "" && validateEmail(FoundCustomer?.email) && (
              <button className="btn rounded border text-white mt-2" style={{ background: "black" }}>
                Save & Send PDF
              </button>
            )}
            <div className="d-none">
              <Try
                print={print}
                status={invoice_payment_type}
                Found={Found}
                InvoiceAllData={InvoiceAllData}
                FoundCustomer={FoundCustomer}
                mainState={mainState}
                invStatus={invoice_status}
              ></Try>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateInvoice;
