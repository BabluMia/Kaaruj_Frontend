import React from "react";
import { useHistory, useParams } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import scan from "../../assets/Icon/scan.svg";
import { useState } from "react";
import { CaretDown, PencilSimple, XCircle } from "phosphor-react";
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
import { useEffect } from "react";
import * as path from "../Routes/RoutePaths";
import CreatableSelect from "react-select/creatable";
import swal from "sweetalert";
import UseData from "../Const/UseData";
import Try from "./Try";
import { useRef } from "react";
import SelectDropDownForInvoice from "../CustomCommons/SelectDropDownForInvoice";
import { useReactToPrint } from "react-to-print";
import Loader from "../CustomCommons/Loader";
import { toast } from "react-toastify";

const EditInvoice = () => {
  const { id } = useParams();
  const [sInvoice, setSInvoice] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [Thumb, setThumb] = useState(null);
  const [CustomerList, setCustomerList] = useState([]);
  const [isLoading, SetisLoading] = useState(true);

  const delivery_charge = {
    0: 80,
    1: 150,
  };
  const options1 = [
    { value: 0, label: "Regular" },
    { value: 1, label: "Urgent" },
  ];

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
  console.log(delivery_choices);
  const paymentType = [
    { value: 0, label: "Cash On Delivery" },
    { value: 1, label: "Card" },
    { value: 2, label: "Bank Transfer" },
    { value: 3, label: "Bkash" },
  ];

  const deliverypriceChoices = {
    0: "Inside Dhaka : 80/-",
    1: "Outside Dhaka : 150/-",
  };
  const deliveryPrice_options = [
    { value: 0, label: "Inside Dhaka : 80/-" },
    { value: 1, label: "Outside Dhaka : 150/-" },
  ];

  const history = useHistory();

  const [InvoiceAllData, SetInvoiceAllData] = useState({
    invoice_date: sInvoice.invoice_date,
    invoice_due_date: sInvoice.due_date,
    invoice_bill_from: sInvoice.bill_from,
    invoice_bill_to: sInvoice.bill_to,
    invoice_from_mobile: sInvoice.from_mobile,
    invoice_to_mobile: sInvoice.to_mobile,
    invoice_from_address: sInvoice.from_address,
    invoice_to_address: sInvoice.to_address,
    invoice_delivery_charge: sInvoice.delivery_charge,
    invoice_notes: sInvoice.notes,
    invoice_to_email: "type",
    invoice_from_email: "type",
    invoice_number: "#INV01221",
    invoice_barcode: "12121212121",
  });

  const [fromCode, setFromCode] = useState("880");
  const [toCode, setToCode] = useState("880");
  const [mainState, setMainState] = useState({});
  const [mainInnerState, setMainInnerState] = useState({});
  const [pS, setPs] = useState(0);

  const [optional, setOptional] = useState("");
  const [URL, setURL] = useState("");
  const [fileName, setFileName] = useState("");
  const [Items, SetItems] = useState([]);
  const [Signature, SetSignature] = useState(null);
  const [Found, setFound] = useState(false);
  const [FoundCustomer, setFoundCustomer] = useState(false);
  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
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
  console.log(InvoiceAllData["invoice_date"]);
  console.log(InvoiceAllData["invoice_due_date"]);
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
  console.log("found-----------", Found);
  console.log("found-----------", FoundCustomer);
  const [ProductsList, setProductsList] = useState([]);
  const getProductList = () => {
    const url = `${BASE_URL}api/v1/inventory/products/`;

    axios
      .get(url)
      .then((res) => {
        // console.log(res.data.data.results);
        const result = res.data.data.results;
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
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        // console.log(err.request.response);
      });
  };
  console.log("ProductsList", ProductsList);

  // console.log(InvoiceAllData["invoice_date"]);
  const getInvoice = () => {
    let url = `${BASE_URL}api/v1/sales/invoice/${id}`;
    axios
      .get(url, url)
      .then((res) => {
        if (res.data.status) {
          // showToast("success", "Invoice Created.");
          SetisLoading(false);
          setSInvoice(res.data.data);
          console.log("===================");
          console.log(res.data.data);
          console.log("===================");

          SetInvoiceAllData({
            invoice_date: res.data.data.invoice_date,
            invoice_due_date: res.data.data.due_date,
            invoice_bill_from: res.data.data.bill_from,
            invoice_bill_to: res.data.data.bill_to,
            invoice_from_mobile: res.data.data.from_mobile !== undefined && res.data.data.from_mobile.replace("+880", ""),
            invoice_to_mobile: res.data.data.to_mobile !== undefined && res.data.data.to_mobile.replace("+880", ""),
            invoice_from_address: res.data.data.from_address,
            invoice_to_address: res.data.data.to_address,
            invoice_delivery_charge: res.data.data.delivery_charge,
            invoice_delivery_status: res.data.data.delivery_status,
            invoice_payment_status: res.data.data.payment_status,
            invoice_notes: res.data.data.notes,
            invoice_to_email: res.data?.data?.to_email ? res.data?.data?.to_email : "To Email",
            invoice_from_email: res.data?.data?.from_email ? res.data?.data?.from_email : "From Email",
            invoice_number: res?.data?.data?.number,
            invoice_barcode: res?.data?.data?.barcode_text,
          });
          SetSignature(res.data?.data?.signature);
          setURL(res.data?.data?.signature);
          setpaid(res.data?.data?.total_paid);
          setDiscount(res.data?.data?.total_discount);
          setinvoice_discount_type(res.data?.data?.discount_type);
          setinvoice_payment_type(res.data?.data?.payment_type);
          setMainState(res.data.data.product_list_json.mainstate);
          setMainInnerState(res.data.data.product_list_json.maininnerstate);
          setinvoice_delivery_type(res.data?.data?.delivery_type);
          // res.data?.data?.discount_type === 0 ? setDiscount(res.data?.data?.flat_discount) : setDiscount(res.data?.data?.percent_discount);
          setDelivrey_status(res.data?.data?.delivery_status);
          setinvoice_status(res.data?.data?.payment_status);
          setinvoice_delivery_charge(res.data?.data?.delivery_charge_type);
          console.log(res.data.data.product_list_json);
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
  useEffect(() => {
    getInvoice();
    getProductList();
  }, []);

  console.log("mainInnerState", mainInnerState);
  const getMainDefaultValues = () => {
    return (
      !isLoading &&
      Object.keys(mainState).map((curr, index) => ({
        value: index,
        label: curr,
      }))
    );
  };
  const getMainOptions = () => {
    // const defaultVals = getMainDefaultValues();
    const onlyDefaultLabels = Object.keys(mainInnerState);
    console.log("onlydr", onlyDefaultLabels);
    console.log("onlydr", ProductsList);
    //     const peopleAvailable = people
    // .filter(people => people.available)    /* filter available people */
    // .map(person => person.name)
    // var optionss = []
    // for (let i = 0; i < ProductsList.length; i++) {
    //   for (let j in onlyDefaultLabels) {
    //     if (ProductsList[i].label !== onlyDefaultLabels[j]) {
    //       console.log(onlyDefaultLabels[j],"--1212");
    //       console.log(ProductsList[i].label,"--1212");
    //       optionss.push(ProductsList[i])
    //     }
    //   }
    // } /* map each person to name */
    // console.log("options here",optionss)

    // const filterdata = ProductsList.filter((curr) => onlyDefaultLabels.indexOf(curr.label) < -1);

    // const filterdata = ProductsList.filter((curr) => !(onlyDefaultLabels).includes(curr.label));
    const filterdata = ProductsList.filter((o) => !onlyDefaultLabels.includes(o.label));
    return filterdata;
    // return ProductsList.filter((data) => !defaultVals.indexOf(data.label) > -1);
  };

  const [invoice_status, setinvoice_status] = useState(0);
  const [Delivery_status, setDelivrey_status] = useState(0);
  const [invoice_delivery_type, setinvoice_delivery_type] = useState(0);
  const [invoice_payment_type, setinvoice_payment_type] = useState(0);
  const [invoice_delivery_charge, setinvoice_delivery_charge] = useState(0);
  const [invoice_discount_type, setinvoice_discount_type] = useState(0);

  const [InvoiceBelowData, SetInvoiceBelowData] = useState({
    invoice_vat: 0,
    invoice_tax: 0,
    invoice_due: 0,
    invoice_paid: 0,
    invoice_total: 0,
  });
  const ValidateData = () => {
    const bd = /^[1][0-9]{9}$/;
    if (InvoiceAllData["invoice_date"] === "") {
      showToast("error", "Issue  Date can't be empty..");
      return 0;
    }
    //  else if (InvoiceAllData["invoice_due_date"] === "") {
    //   showToast("error", "Due Date can't be empty..");
    //   return 0;
    // }
    else if (!bd.test(InvoiceAllData["invoice_from_mobile"]?.replace("+880", ""))) {
      showToast("error", "From Mobile : Please Enter Valid phone number");
      return 0;
    } else if (!bd.test(InvoiceAllData["invoice_to_mobile"]?.replace("+880", ""))) {
      showToast("error", "To Mobile : Please Enter Valid phone number");
      return 0;
    } else if (!Found && InvoiceAllData["invoice_bill_from"] === "") {
      showToast("error", "Bill from  can't be empty..");
      return 0;
    } else if (!Found && InvoiceAllData["invoice_bill_to"] === "") {
      showToast("error", "Bill to  can't be empty..");
      return 0;
    } else if (!Found && InvoiceAllData["invoice_bill_to"] === "") {
      showToast("error", "Bill to  can't be empty..");
      return 0;
    }

    if (InvoiceAllData["invoice_from_email"] === "") {
      showToast("error", "From email  can't be empty..");
      return 0;
    } else if (!validateEmail(InvoiceAllData["invoice_from_email"])) {
      showToast("error", "From email  not valid..");
      return 0;
    }
    //  else if (!Found && InvoiceAllData["invoice_to_email"] === "") {
    //   showToast("error", "To email can't be empty..");
    //   return 0;
    // }
    else if (Found && !validateEmail(FoundCustomer?.email) === "" && InvoiceAllData["invoice_to_email"].length > 0) {
      showToast("error", "To email  not valid...");
      return 0;
    } else if (!Found && !validateEmail(InvoiceAllData["invoice_to_email"]) && InvoiceAllData["invoice_to_email"].length > 0) {
      showToast("error", "To email  not valid..");
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

    if (InvoiceAllData["invoice_notes"] === null) {
      showToast("error", "Notes is empty..");
      return 0;
    }

    postInvoice();
  };

  const allvariants = Object.values(mainState).map((current) => current["variantObj"]);
  console.log("allvariants----------", allvariants);

  const postInvoiceAPi = (invoiceProductId, data) => {
    const URLINvoice = `${BASE_URL}api/v1/sales/invoice-products/${invoiceProductId}/`;

    axios
      .patch(URLINvoice, data)
      .then((res) => {
        if (res.data.status) {
          // clearData();
        }
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        const errorMsg = JSON.parse(err.request.response).errors;
        for (let key in errorMsg) {
          showToast("error", `${key} : ${errorMsg[key][0]}`);
        }
        showToast("error", message);
      });
  };
  const getInvoiceIdAndPost = async (invoiceid, variant_name, data) => {
    const invoiceGetID = `${BASE_URL}api/v1/sales/invoice-product-id/`;
    const dataProduct = new FormData();
    dataProduct.append("invoice", invoiceid);
    dataProduct.append("variant", variant_name);
    await axios
      .post(invoiceGetID, dataProduct)
      .then((res) => {
        if (res.data.status) {
          console.log("res", res);
          postInvoiceAPi(res.data.data.id, data);
        }
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        const errorMsg = JSON.parse(err.request.response).errors;
        for (let key in errorMsg) {
          showToast("error", `${key} : ${errorMsg[key][0]}`);
        }
        showToast("error", message);
      });
  };
  const postInvoiceProduct = (invoiceProductId) => {
    const allvariants = Object.values(mainState).map((current) => current["variantObj"]);
    console.log("allvariants", allvariants);
    var count = 0;

    for (let items in allvariants) {
      var dataForUpdate = []
      const itemsList = Object.values(allvariants[items]);
      for (let currentitem in itemsList) {
        if (parseInt(itemsList[currentitem]["quantity"]) > 0) {
          // if (parseInt(itemsList[currentitem]["quantity"]) > 0 && isSendingInvoiceProudct !== false) {
          //if Quantity is more than  0 then post{
          //if no quantity added then no need to do anything
          const data = new FormData();
          console.log(parseInt(itemsList[currentitem]["quantity"]), "------------qunatity-");
          data.append("price", parseInt(itemsList[currentitem]["in_price"]));
          data.append("quantity", parseInt(itemsList[currentitem]["quantity"]));
          // // data.append("vat", parse  Int(mainState[item]["in_vat"]));
          data.append("total", parseInt(itemsList[currentitem]["total"]));
          data.append("product", parseInt(itemsList[currentitem]["product"]));
          data.append("variant", parseInt(itemsList[currentitem]["id"]));
          data.append("invoice", invoiceProductId);

          let variant_name = itemsList[currentitem]["name"];
          setTimeout(
            function () {
              // alert("sending pathc");
              getInvoiceIdAndPost(invoiceProductId, variant_name, data);
            },
            count === 0 ? 0 : 3000 //first time no timeout
          );
        }
        count++;
      }
    }

    // for(let currentItem=0;currentItem<allvariants.length;currentItem++){
    //   Object.values(currentItem).map((innerCurrent)=>{
    //     console.log(innerCurrent)
    //   })
    // }
  };

  const postInvoice = () => {
    const url = `${BASE_URL}api/v1/sales/invoice/${id}/`;
    const data = new FormData();
    const toMobile = `+${toCode}${InvoiceAllData["invoice_to_mobile"]}`;
    const fromMobile = `+${toCode}${InvoiceAllData["invoice_from_mobile"]}`;

    const current_user = JSON.parse(localStorage.getItem("userData"));
    data.append("invoice_date", InvoiceAllData["invoice_date"] !== "" && convertData(InvoiceAllData["invoice_date"]));
    // data.append("due_date", InvoiceAllData["invoice_due_date"] !== "" && convertData(InvoiceAllData["invoice_due_date"]));
    data.append("bill_from", InvoiceAllData["invoice_bill_from"]);
    data.append("bill_to", InvoiceAllData["invoice_bill_to"]);
    data.append("from_mobile", fromMobile);
    data.append("to_mobile", toMobile);
    data.append("from_address", InvoiceAllData["invoice_from_address"]);
    data.append("to_address", Found ? FoundCustomer.address : InvoiceAllData["invoice_to_address"]);
    data.append("delivery_charge", delivery_charge[invoice_delivery_charge]);

    data.append("delivery_charge_type", parseInt(invoice_delivery_charge));
    data.append("delivery_status", Delivery_status);
    data.append("delivery_type", invoice_delivery_type);
    data.append("discount_type", invoice_discount_type);
    data.append("total_discount", Discount);

    // if (invoice_discount_type === 0) {
    //   data.append("flat_discount", getFlatDiscount());
    // } else {
    //   data.append("percent_discount", getPercentageDiscount());
    // }
    data.append("payment_type", invoice_payment_type);
    data.append("payment_type", invoice_payment_type);
    data.append("payment_status", invoice_status);
    data.append("total_due", parseInt(getDueAmount()));
    data.append("total_paid", paid);
    data.append("total_amount", parseInt(getGrandTotal()));
    data.append("total_vat", 0);
    data.append("notes", InvoiceAllData["invoice_notes"]);
    data.append("created_by", current_user.id);
    data.append("total_discount", Discount);

    data.append("discount_type", invoice_discount_type);
    data.append(
      "product_list_json",
      JSON.stringify({
        mainstate: mainState,
        maininnerstate: mainInnerState,
      })
    );

    axios
      .patch(url, data)
      .then((res) => {
        if (res.data.status) {
          postInvoiceProduct(res.data.data.id);

          showToast("success", "Invoice Updated.");
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

  console.log("mainstate", mainState);

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
  const print = useRef();
  console.log("mainState", mainState);
  const HandleNewProductsInputValue = (e, product_name) => {
    let name = e.target.name;
    let value = parseInt(e.target.value);
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
    getCustomerList();
  }, []);
  const toPhoneHandle = (e) => {
    let value = `+${toCode}${e.target.value}`;

    handleInputs(e, SetInvoiceAllData);
    Object.values(CustomerList).map((curr) => {
      console.log("curr.mobile", curr.mobile);
      console.log("value", value);
      if (curr.mobile === value) {
        showToast("success", "Found");
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
    // return Object.keys(mainState).length > 0 && mainState !== undefined && mainState[curr] !== undefined && mainState[curr]["variant"]["total"];
  };

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

  const getFlatDiscount = () => {
    return Discount;
  };
  const getDeliveryCharge = () => {
    return invoice_payment_type === 0 || invoice_payment_type === "0" ? delivery_charge[invoice_delivery_charge] : 0;
  };
  const getPercentageDiscount = () => {
    let total = getSubTotal() + getDeliveryCharge();
    return parseInt((Discount / 100) * total);
  };

  const getDueAmount = () => {
    const due = getGrandTotal() - paid;
    return due < 0 ? 0 : due;
  };
  const getBasePlusVariant = (curr, innerCur) => {
    return parseInt(mainState[curr] !== undefined && mainState[curr].price) + parseInt(innerCur.price);
  };

  const getGrandTotal = () => {
    const discountCalc = invoice_discount_type === 0 || invoice_discount_type === "0" ? getFlatDiscount() : getPercentageDiscount();
    const grand = getSubTotal() + getDeliveryCharge() - paid - discountCalc;
    return grand < 0 ? 0 : parseInt(grand);
  };
  const handleInnerVariant = (currentName, value) => {
    console.log("value-- currentName", currentName);
    console.log("value---", value);
    setMainInnerState({
      ...mainInnerState,
      [currentName]: value,
    });
  };
  const handleMultiInputChange = (newValue, actionMeta) => {
    console.log("actionMeta main", actionMeta);
    const newVal = actionMeta?.option?.label;
    // setProductCom(newValue);
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
          price: actionMeta.option.price,
          stock: actionMeta.option.stock,
          thumb: actionMeta.option.thumb,
        },
      });
    }
    if (actionMeta.action === "remove-value") {
      delete mainState[actionMeta.removedValue.label];
      setMainState({ ...mainState });
    }
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
      swal("error");
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="categorey-parent">
      <div className="bg-white cat-child ">
        <div className="d-flex align-items-center" style={{ padding: "20px 24px ", border: "0.5px solid #E0E0E0" }}>
          <h3 style={{ fontSize: "23px", marginTop: "6px", marginLeft: "12px" }}>Invoice Details</h3>
        </div>
        {/* -----------product form---------- */}
        <div className="product-main createInvoiceInputContainer">
          <div className="row">
            <div className="col-12 col-md-6">
              <RequiredLabel text="Invoice Number" />

              <InputGroup className="mb-3">
                <Form.Control
                  disabled
                  aria-label="Username"
                  placeholder="Inv00014"
                  value={InvoiceAllData?.invoice_number}
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
                  value={InvoiceAllData?.invoice_barcode}
                  aria-describedby="basic-addon1"
                  style={{ backgroundColor: "#FAFAFA" }}
                />
              </InputGroup>
            </div>

            <div className="col-12 col-md-6">
              <RequiredLabel text="Invoice Date" />
              <div className="position-relative">
                <InputGroup className="">
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
            {/* 
            <div className="col-12 col-md-6 ">
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

            <div className="col-12 col-md-6">
              <RequiredLabel text="From Mobile" />

              <div className="d-flex phoneContainer ">
                <PhoneInput inputClass="phoneinput" onChange={(e) => setFromCode(e)} enableSearch={true} country={"bd"} />
                <div className="w-100">
                  <Form.Control
                    aria-label="Input number"
                    placeholder="Input number"
                    aria-describedby="basic-addon1"
                    style={{ backgroundColor: "#FAFAFA" }}
                    className="phone_insert_input"
                    name="invoice_from_mobile"
                    value={InvoiceAllData["invoice_from_mobile"]?.replace("+880", "")}
                    onChange={(e) => handleInputs(e, SetInvoiceAllData)}
                  />
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 ">
              <RequiredLabel text="To Mobile" />

              <div className="d-flex phoneContainer ">
                <PhoneInput inputClass="phoneinput" onChange={(e) => setToCode(e)} enableSearch={true} country={"bd"} />
                <div className="w-100">
                  <Form.Control
                    aria-label="Input number"
                    placeholder="Input number"
                    aria-describedby="basic-addon1"
                    style={{ backgroundColor: "#FAFAFA" }}
                    className="phone_insert_input"
                    name="invoice_to_mobile"
                    value={InvoiceAllData["invoice_to_mobile"]?.replace("+880", "")}
                    onChange={(e) => toPhoneHandle(e)}
                  />
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 mt-3">
              <RequiredLabel text="Bill To" />
              {console.log("FoundCustomer", FoundCustomer)}
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

            <div className="col-12 col-md-6 mt-3">
              <RequiredLabel text={"Delivery Type"} />
              <div className="mb-3" style={{ height: "47px" }}>
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

            <div className="col-12 col-md-6">
              <RequiredLabel text={"Payment Type"} />
              <div className="mb-3">
                <Form.Select
                  size="lg"
                  placeholder="---Select---"
                  onChange={(e) => setinvoice_payment_type(e.target.value)}
                  style={{
                    backgroundColor: "#FAFAFA",
                    fontSize: "16px",
                    height: "47px",
                    borderRadius: "8px",
                    color: "#828282",
                  }}
                  value={invoice_payment_type}
                >
                  {paymentType.map((curr) => {
                    return <option value={curr.value}>{curr.label}</option>;
                  })}
                </Form.Select>
              </div>

              {console.log("invoice_payment_type", invoice_payment_type)}
              {console.log("invoice_delivery_type", invoice_delivery_type)}
              {console.log("invoice_delivery_charge", invoice_delivery_charge)}
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
              <div className="mb-3" style={{ height: "47px" }}>
                <Form.Select
                  size="lg"
                  placeholder="---Select---"
                  value={invoice_delivery_charge}
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

                {/* <Select
                  placeholder="---Select---"
                  isClearable
                  styles={{height:"100%"}}
                  options={deliveryPrice_options}
                  defaultValue={deliveryPrice_options.filter((curr) => curr.value === invoice_delivery_charge)[0]}
                  onChange={(option) => setinvoice_delivery_charge(option.value)}
                /> */}
              </div>
            </div>

            <div className="col-12 col-md-6">
              <RequiredLabel text="From Email" />

              <InputGroup className="mb-3">
                <Form.Control
                  aria-label="Username"
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
                  onChange={(e) => handleInputs(e, SetInvoiceAllData)}
                  aria-describedby="basic-addon1"
                  style={{ backgroundColor: "#FAFAFA" }}
                />
              </InputGroup>
            </div>
            {console.log("invoice_discount_type", invoice_discount_type)}
            <div className="col-12 col-md-6">
              <RequiredLabel text={"Delivery Type"} />
              <div className="mb-3" style={{ height: "47px" }}>
                <Form.Select
                  size="lg"
                  placeholder="---Select---"
                  onChange={(e) => setinvoice_discount_type(e.target.value)}
                  value={invoice_discount_type}
                  style={{
                    backgroundColor: "#FAFAFA",
                    fontSize: "16px",
                    height: "47px",
                    borderRadius: "8px",
                    color: "#828282",
                  }}
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
            <Select
              // styles={styles}
              isMulti
              placeholder="---Select---"
              isClearable
              onChange={handleMultiInputChange}
              defaultValue={getMainDefaultValues()}
              options={getMainOptions()}
            />
          </div>

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
                  {mainState !== undefined &&
                    Object.keys(mainState).map((curr, index) => {
                      return (
                        <>
                          <div
                            className="mt-4  px-2"
                            style={{
                              background: " rgba(245, 245, 245, 0.36)",
                              border: "none",
                            }}
                          >
                            <div className="row py-3 my-3" style={{ height: "45px" }}>
                              <div className="col-2 minWidthForInvoiceCreateTable ps-4" style={{ textAlign: "start" }}>
                                <p>Product Name</p>
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
                                  style={{
                                    margin: "6px 0px !important",
                                    border: "0.2px solid #bcb0b0",
                                  }}
                                  height={50}
                                  src={!isLoading && mainState[curr]["thumb"]}
                                  alt="failed"
                                  className="ms-3 shadow-sm"
                                />
                                {console.log(" mainState[curr][thumb", mainState[curr]["thumb"])}
                              </div>
                              <div className="col-4 py-1">
                                <p className="text-capitalize text-center d-flex align-items-center justify-content-center">
                                  {/* {Number(mainState[curr]["stock"] - pS)} */}
                                  {Number(mainState[curr]["stock"])}
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
                                    // defaultValue={
                                    //   mainState[curr]["variantObj"] !== undefined &&
                                    //   Object.values(mainInnerState[curr]["variantObj"]).map((curr) => ({
                                    //     label: curr.name,
                                    //     value: curr.id,
                                    //     price: curr.price,
                                    //     stock: curr.stock,
                                    //     quantity: 1,
                                    //   }))
                                    // }

                                    defaultValue={mainInnerState[curr]}
                                    options={
                                      mainState[curr]["variantObj"] !== undefined &&
                                      Object.values(mainState[curr]["variantObj"]).map((curr) => ({
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
                            <tbody className="innerTbody w-100">
                              {!isLoading &&
                                mainInnerState !== undefined &&
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
                                              // value={innerCur.price}
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
                                              value={innerCur.stock}
                                              className="invoiceCreateSmallInputs"
                                              placeholder="00.00"
                                              type="text"
                                            />
                                          </td>
                                          <td className="text-center   py-3">
                                            <input
                                              name="in_quantity"
                                              type="number"
                                              onChange={(e) => {
                                                // HandleNewProductsInputValue(e, innerCur);
                                                const productName = curr;
                                                // if(e.target.value.include(0,1,2,3,4,5,6,7,8,9) === false) {
                                                //   alert('hi')
                                                // }
                                                if (e.target.value < 0) {
                                                  setPs(0);
                                                } else {
                                                  setPs(e.target.value);
                                                }

                                                console.log("=======================");
                                                console.log("mainState[productName]['variants'][index]", mainState[productName]["variant"][index]);
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

                                                  // Assign new value
                                                  const baseAndVariant =
                                                    parseInt(copiedObjects[productName]["variant"][keyOfVariant]["price"]) +
                                                    parseInt(copiedObjects[productName]["price"]);
                                                  copiedObjects[productName]["variant"][keyOfVariant]["total"] =
                                                    parseInt(copiedObjects[productName]["variant"][keyOfVariant]["quantity"]) * baseAndVariant;

                                                  const baseAndVariantObj =
                                                    parseInt(copiedObjects[productName]["variantObj"][variantName]["price"]) +
                                                    parseInt(copiedObjects[productName]["price"]);
                                                  console.log("baseAndVariantObj price--", baseAndVariantObj);
                                                  copiedObjects[productName]["variantObj"][variantName]["total"] =
                                                    parseInt(copiedObjects[productName]["variantObj"][variantName]["quantity"]) * baseAndVariantObj;

                                                  return copiedObjects; // Return copied object
                                                });
                                              }}
                                              className="invoiceCreateSmallInputs"
                                              placeholder="00.00"
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
                                                mainState === undefined && mainState[curr] === undefined
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
                        value={getSubTotal()}

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
                        value={getDeliveryCharge()}
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
                      <input className="ms-3 invoiceInpCss" type="text" name="invoice_due" value={getDueAmount()} />
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
                      <input className="ms-3 invoiceInpCss" type="text" value={getGrandTotal()} />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ====================attribute=================== */}
      <div className="product-main my-4 bg-white cat-child" style={{ borderTop: "0.5px solid #E0E0E0" }}>
        <div>
          <p>Payment Status</p>
          {/* <SelectDropDownForInvoice
            options={invoice_choices}
            defaultValue={invoice_choices.filter((curr) => curr.value === InvoiceAllData["invoice_payment_status"])[0]}
            setSelectedOptionCategory={setinvoice_status}
          /> */}
          <Select
            placeholder="---Select---"
            isClearable
            options={invoice_choices}
            defaultValue={invoice_choices.filter((curr) => curr.value === invoice_status)[0]}
            onChange={(option) => setinvoice_status(option.value)}
          />

          <p className="mt-4">Delivery Status</p>

          {/* <SelectDropDownForInvoice
            options={delivery_choices}
            defaultValue={delivery_choices.filter((curr) => curr.value === InvoiceAllData["invoice_delivery_status"])[0]}
            setSelectedOptionCategory={setDelivrey_status}
          /> */}

          <Select
            placeholder="---Select---"
            isClearable
            options={delivery_choices}
            defaultValue={delivery_choices.filter((curr) => curr.value === Delivery_status)[0]}
            onChange={(option) => setDelivrey_status(option.value)}
          />
          {console.log("delivery status", Delivery_status)}

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

      <div className="padding-btn-head mb-4 d-flex justify-content-end  bg-white cat-child" style={{ border: "0.5px solid #E0E0E0" }}>
        <div className="" style={{ marginLeft: "-10px" }}>
          <button className="btn rounded border align-items-center me-2 mt-2" disabled={!InvoiceAllData} onClick={handlePrint2}>
            <DoIcon className="doc" /> Preview PDF
          </button>
          {/* <button onClick={postInvoiceProduct} className="btn rounded border me-2 mt-2"> */}
          <button onClick={ValidateData} className="btn rounded border me-2 mt-2">
            Save Invoice
          </button>
          {InvoiceAllData["invoice_to_email"] !== "" && !Found && validateEmail(InvoiceAllData["invoice_to_email"]) && (
            <button className="btn rounded border text-white mt-2" style={{ background: "black" }}>
              Save & Send PDF
            </button>
          )}

          <button className="btn rounded border me-2 ms-2 mt-2" onClick={() => history.push(path.invoice_list)}>
            Cancel
          </button>

          {Found && FoundCustomer?.email !== "" && validateEmail(InvoiceAllData["invoice_to_email"]) && (
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
            ></Try>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInvoice;
