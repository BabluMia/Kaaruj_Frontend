import React from "react";
import { useHistory, useParams } from "react-router-dom";
import add from "./../../../assets/Icon/add.svg";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import eye from "./../../../assets/Icon/eye.svg";
import doc from "./../../../assets/Icon/Icon 24 x 24.svg";
import "./Product.css";
import { useState } from "react";
import { X } from "phosphor-react";
import CustomSelect from "../../CustomCommons/CustomSelect";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";

import { ActionMeta, OnChangeValue } from "react-select";
import RequiredLabel from "../../CustomCommons/RequiredLabel";
import { DropzoneArea } from "material-ui-dropzone";
import { AttachFile, AudioTrack, Description, PictureAsPdf, Theaters } from "@material-ui/icons";
import swal from "sweetalert";
import { BASE_URL } from "../../Const/Url";
import axios from "axios";
import SelectDropDown from "../../CustomCommons/SelectDropDown";
import { useEffect } from "react";
import { handleInputs } from "../../../utils/HandleInputs";
import { showToast } from "../../../utils/ToastHelper";
import * as path from "../../Routes/RoutePaths";
import UseData from "../../Const/UseData";
import Loader from "../../CustomCommons/Loader";

const EditProduct = () => {
  const history = useHistory();
  const { id } = useParams();
  const [isLoading, SetisLoading] = useState(true);
  const [singleProduct, setSingleProduct] = useState({});
  const [attributesCom, setAttributeCom] = useState([]);
  const [colorOption, setColorOption] = useState(["Red", "Red"]);
  const [sizeOption, setSizeOption] = useState([]);
  const [Dropzoneimages, setDropzoneimages] = useState(null);
  // state
  const [mainState, setMainState] = useState({});
  // state
  const [optional, setOptional] = useState([]);
  const [fileLenth, setFilelength] = useState(null);
  const [URL, setURL] = useState("");
  const [fileName, setFileName] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [categoryList, setcategoryList] = useState([]);
  const [selectedOptionCategory, setSelectedOptionCategory] = useState(null);
  const [atttibutesList, setAtttibutesList] = useState([]);
  const [productAllData, SetproductAllData] = useState({
    product_name: "",
    product_description: "",
    product_tax: "",
    product_vat: "",
    product_discount: "",
    product_quantity: "",
    product_price: "",
  });

  const [AttributesInputValue, SetAttributesInputValue] = useState({});
  const [Thumb, setThumb] = useState(null);
  const [itemData, setitemData] = useState([]);
  const [Categoryswitch, setCategoryswitch] = useState(true);
  const [ParentCategory, setParentCategory] = useState(true);
  const toggleSwitch = () => {
    setCategoryswitch((current) => !current);
  };
  const fileHandle = (e) => {
    setThumb(e.target.files[0]);
    setFileName(e.target.files[0].name);
    const reader = new FileReader();
    setFilelength(e.target.files[0]);
    // alert(fileLenth);
    reader.readAsDataURL(e.target.files[0]);
    setURL(reader.result);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setURL(reader.result);
      }
    };
  };
  console.log("productAllData-----", productAllData);
  const getSingleProduct = () => {
    const url = `${BASE_URL}api/v1/inventory/products/${id}`;
    axios
      .get(url)
      .then((res) => {
        if (res.data.status) {
          // showToast("success", "Invoice Created.");
          SetisLoading(false);
          setSingleProduct(res.data.data);

          const result = res.data.data;
          console.log("res",result)
          setCategoryswitch(result?.is_active);
          SetproductAllData({
            product_name: res.data.data.name,
            product_description: res.data.data.description,
            product_tax: res.data.data.tax,
            product_vat: res.data.data.vat,
            product_discount: res.data.data.discount,
            product_quantity: res.data.data.quantity,
            product_price: res.data.data.price,
            product_category: res.data.data.category !== undefined && { value: res.data.data.category, label: res.data.data.category_name },
          });
          setParentCategory(res.data.data.category);
          setSelectedOptionCategory(res.data.data.category_name);
          setURL(res.data.data.thumb);
          setMainState(result.variants_json.mainState);
          SetAttributesInputValue(result.variants_json.AttributesInputValue);
          setAttributeCom(Object.keys(result.variants_json.mainState).map((cur, index) => ({ label: cur, value: index })));

          let res_attributeinp = result.map((curr) => ({ [curr.variant]: { variant_stock: curr.stock } }));
          let res_mainstate = result.variants.map((curr) => curr.variant);
          let res_attributeCom = result.variants.map((curr) => ({ ...curr, label: curr.value, value: curr.label }));

          console.log("===========");
          console.log("hello thereeee")
          console.log("res", res.data.data, "-------------------------------");
          console.log("-------------------working----------------")
          console.log("res _attributeinp", res_attributeinp);
          console.log("res _AttributesInputValue", AttributesInputValue);
          console.log("res _mainstate", res_mainstate);
          console.log("res _mainStateValue", mainState);
          console.log("res _attributeCom", res_attributeCom);
          console.log("res _attributeComvalue", attributesCom);
          console.log("===========");

          // setAttributeCom(Object.keys(result.variants_json.mainState).map((cur, index) => ({ label: cur, value: index })));
        }
      })
      .catch((err) => {
        // const message = JSON.parse(err?.request?.response).message;
        // const errorMsg = JSON.parse(err?.request?.response).errors;
        // console.log(err);
        // // for (let value of Object.values(errorMsg)) {
        // //   showToast("error", value[0]);
        // // }
        // for (let key in errorMsg) {
        //   showToast("error", `${key} : ${errorMsg[key][0]}`);
        // }
        // showToast("error", message);
      });
  };
  // console.log("mainstate", mainState);
  // console.log("attributesCom", attributesCom);
  const getCategory = () => {
    const url = `${BASE_URL}api/v1/inventory/category/`;

    axios
      .get(url)
      .then((res) => {
        // console.log(res.data.data.results);
        const result = res.data.data.results;
        const options = result.map((curr) => ({
          label: curr.name,
          value: curr.id,
        }));
        setcategoryList(options);
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        console.log(err.request.response);
      });
  };

  const getAttributeList = () => {
    const url = `${BASE_URL}api/v1/inventory/attributes/`;

    axios
      .get(url)
      .then((res) => {
        // console.log(res.data.data.results);
        const result = res.data.data.results;
        const options = result.map((curr) => ({
          label: curr.name,
          value: curr.id,
        }));
        setAtttibutesList(options);
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        // console.log(err.request.response);
      });
  };

  const clearData = () => {
    SetproductAllData({
      product_name: "",
      product_description: "",
      product_tax: "",
      product_vat: "",
      product_discount: "",
      product_quantity: "",
      product_price: "",
    });
    setURL("");
    setFileName("");
    setSelectedOptionCategory(null);
  };

  const postFeatureImages = (productID) => {
    const url = `${BASE_URL}api/v1/inventory/products-image/`;

    Dropzoneimages.map((curr) => {
      console.log("images", curr);
      const data = new FormData();
      data.append("image", curr);
      data.append("product", productID);

      axios
        .post(url, data)
        .then((res) => {
          if (res.data.status) {
            console.log(res.data);
          }
        })
        .catch((err) => {
          const message = JSON.parse(err.request.response).message;
          const errorMsg = JSON.parse(err.request.response).errors;
          for (let key in errorMsg) {
            showToast("error", `${key} : ${errorMsg[key][0]}`);
          }
          // showToast("error", message);
        });
    });
  };
  const deleteFeatureImages = (image_id) => {
    const url = `${BASE_URL}api/v1/inventory/products-image/${image_id}/`;
    axios
      .delete(url)
      .then((res) => {
        if (res.data.status) {
          // showToast("success", "product variant deleted");
          getSingleProduct();
        }
      })
      .catch((err) => {
        console.log("url", url);
        console.log("err", err);
        showToast("error", "err.message");
      });
  };
  const PostVariants = (productID) => {
    // const url = `${BASE_URL}api/v1/inventory/products-variant/`;
    const url = `${BASE_URL}api/v1/inventory/variant-update/`;
    console.log("AttributesInputValue", AttributesInputValue);

    for (let item in AttributesInputValue) {
      const data = new FormData();

      if (AttributesInputValue[item]["variant_action"] === undefined) {
        data.append("is_active", true);
      } else {
        data.append("is_active", AttributesInputValue[item]["variant_action"]);
      }

      if (AttributesInputValue[item]["variant_price"] === undefined || AttributesInputValue[item]["variant_price"] === "") {
        // showToast("error", `${item} Variant Price is empty `);
        data.append("price", 0);
        // data.append("price", parseInt(productAllData["product_price"]) + 0);
      } else {
        data.append("price", parseInt(AttributesInputValue[item]["variant_price"]));
        // data.append("price", parseInt(productAllData["product_price"]) + parseInt(AttributesInputValue[item]["variant_price"]));
      }

      data.append("stock", parseInt(AttributesInputValue[item]["variant_stock"]));
      data.append("variant", item);
      data.append("product", productID);
      console.log(data);
      axios
        .post(url, data)
        .then((res) => {
          if (res?.data?.status) {
            // showToast("success", "product variant added");
          }
        })
        .catch((err) => {
          showToast("error", "err.message");
        });
    }
  };

  const DeletePreviousVariants = () => {
    let variantIds = singleProduct?.variants.map((curr) => curr.id);
    console.log(variantIds);
    variantIds.map((curr) => {
      const url = `${BASE_URL}api/v1/inventory/products-variant/${curr}/`;
      axios
        .delete(url)
        .then((res) => {
          if (res.data.status) {
            // showToast("success", "product variant deleted");
          }
        })
        .catch((err) => {
          showToast("error", "err.message");
        });
    });
  };
  console.log("ParentCategory-------", ParentCategory);
  const postProduct = () => {
    const url = `${BASE_URL}api/v1/inventory/products/${id}/`;
    const data = new FormData();
    data.append("name", productAllData["product_name"]);
    // data.append("stock", parseInt(productAllData["product_quantity"]));
    isEmpty(AttributesInputValue) && data.append("stock", productAllData["product_quantity"]);
    isEmpty(AttributesInputValue) && data.append("quantity", productAllData["product_quantity"]);
    !isEmpty(AttributesInputValue) && data.append("quantity", parseInt(GetTotalQuantity()));
    !isEmpty(AttributesInputValue) && data.append("stock", parseInt(GetTotalQuantity()));
    data.append("description", productAllData["product_description"]);
    // data.append("price", productAllData["product_price"]);
    data.append("price", parseInt(productAllData["product_price"]));
    data.append("discount", productAllData["product_discount"]);
    // data.append("discount", productAllData["product_discount"]);
    data.append("vat", productAllData["product_vat"]);
    data.append("tax", productAllData["product_tax"]);
    data.append(
      "variants_json",
      JSON.stringify({
        mainState: mainState,
        AttributesInputValue: AttributesInputValue,
      })
    );
    // selectedOptionCategory!=null && data.append("category", selectedOptionCategory.value);
    if (ParentCategory !== null && ParentCategory !== undefined) {
      data.append("category", ParentCategory);
    }
    data.append("variants", 1);
    Thumb != null && data.append("thumb", Thumb);
    data.append("is_active", Categoryswitch);
    if (data.name === "") {
      showToast("error", "Product Name can't be empty..");
      return 0;
    }
    
    //  else if (data.description === "") {
    //   showToast("error", "Description can't be empty..");
    //   return 0;
    // }
    // else if (data.quantity === "") {
    //   showToast("error", "Quantity  can't be empty..");
    //   return 0;
    // }
    //  else if (data.discount === "") {
    //   showToast("error", "Discount  can't be empty..");
    //   return 0;
    // }
    // else if (data.vat === "") {
    //   showToast("error", "Vat  can't be empty..");
    //   return 0;
    // } else if (data.vat === "") {
    //   showToast("error", "Tax  can't be empty..");
    //   return 0;
    // }

    axios
      .patch(url, data)
      .then((res) => {
        if (res.data.status) {
          // clearData();
          showToast("success", "Product updated.");
          // DeletePreviousVariants();
          PostVariants(res.data.data.id);
          postFeatureImages(res.data.data.id);

          history.push(path.product_list);
        }
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        const errorMsg = JSON.parse(err.request.response).errors;
        for (let key in errorMsg) {
          // showToast("error", `${key} : ${errorMsg[key][0]}`);
        }
        // showToast("error", message);
      });
  };

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  const ValidateData = () => {
    console.log("selectedOptionCategory.value", selectedOptionCategory.value);
    console.log("selectedOptionCategory", selectedOptionCategory);
    if (productAllData["product_name"] === "") {
      showToast("error", "Product Name can't be empty..");
      return 0;
    } else if (productAllData["product_category"] === null || productAllData["product_category"] === undefined) {
      showToast("error", "Category can't be empty..");
      return 0;
    }
    //  else if (productAllData["product_quantity"] === "") {
    //   showToast("error", "Quantity  can't be empty..");
    //   return 0;
    // }
    // else if ((productAllData["product_discount"].match(/[^0-9]/))) {
    //   showToast("error", "Discount  can't contains letters..");
    //   return 0;
    // }

    // else if (productAllData["product_vat"] === "") {
    //   showToast("error", "Vat  can't be empty..");
    //   return 0;
    // }

    // else if (productAllData["product_tax"] === "") {
    //   showToast("error", "Tax  can't be empty..");
    //   return 0;
    // }
    // else if (productAllData["product_description"] === "") {
    //   showToast("error", "Description can't be empty..");
    //   return 0;
    // }

    function isEmpty(obj) {
      return Object.keys(obj).length === 0;
    }
    if (isEmpty(AttributesInputValue)) {
      showToast("error", `No attribute added `);
      return 0;
    }
    for (let item in AttributesInputValue) {
      console.log("AttributesInputValue[item]", AttributesInputValue[item]);
      if (isEmpty(AttributesInputValue[item])) {
        showToast("error", `${item} Variant Price,Stock is empty `);
        return 0;
      }
      // if (AttributesInputValue[item]["variant_price"] === undefined ) {
      //   showToast("error", `${item} Variant Price is empty `);
      //   return 0;
      // }
      if (AttributesInputValue[item]["variant_stock"] === undefined) {
        showToast("error", `${item} Variant Stock is empty `);
        return 0;
      }
    }

    // if (Thumb === null) {
    //   showToast("error", "Thumbnail can't be empty..");
    //   return 0;
    // }

    postProduct();
  };
  const postALLProductsData = () => {
    ValidateData();
  };
  // console.log("selectedOptionCategory", selectedOptionCategory);
  useEffect(() => {
    getCategory();
    getSingleProduct();
  }, []);
  const handleOptional = (event) => {
    setSelectedImages([]);
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return window.URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
  };

  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    window.URL.revokeObjectURL(image);
  }
  const [test, setTest] = useState("");

  const combinationMake = (arrays, joinChar) => {
    var result = arrays.reduce((a, b) => a.reduce((r, v) => r.concat(b.map((w) => [].concat(v, w))), []));
    let output = result.map((a) => a.join(joinChar));

    return output;
  };
  const handleMultiInputChange = (newValue, actionMeta) => {
    console.log(actionMeta);
    const newVal = actionMeta?.option?.label;
    setAttributeCom(newValue);
    console.log("actionMeta.action", actionMeta.action);
    if (actionMeta.action === "create-option" || actionMeta.action === "select-option") {
      // !(itemData.includes(newVal)) &&
      setMainState({ ...mainState, [newVal]: [] });
    }
    if (actionMeta.action === "remove-value") {
      delete mainState[actionMeta.removedValue.label];
      setMainState({ ...mainState });
    }
  };
  console.log("mainState", mainState);
  console.log("itemData", itemData);

  // console.log(mainState)
  const handleMultiInputInner = (item, val) => {
    mainState[item] = val.map((curr) => curr.label);
    console.log("mainState[item]", mainState[item]);
    console.log("mainState", mainState);
    let arrays = [];
    for (let i in mainState) {
      console.log(i);
      console.log(mainState[i]);
      arrays.push(mainState[i]);

      // if (mainState[i].length != 0) {
      //   arrays.push(mainState[i]);
      // }
    }
    console.log("arrays", arrays);
    if (arrays.length > 1) {
      console.log(combinationMake(arrays, "-"));
      setitemData(combinationMake(arrays, "-"));
    }
    if (arrays.length <= 1) {
      arrays.push([""]);
      console.log(combinationMake(arrays, ""));
      setitemData(combinationMake(arrays, ""));
    }
    SetAttributesInputValue({}); //Clearing variant list whenever add new

    // SetAttributesInputValue(() => {
    // for (let key in AttributesInputValue) {
    //   itemData.map((curr) => {
    //     if (curr !== key) {
    //       delete AttributesInputValue[key];
    //       SetAttributesInputValue({ ...AttributesInputValue });
    //     }
    //   });
    // }
    // });
  };
  const handleSize = (newValue, actionMeta) => {
    setAtttibutesList(newValue);
    setSizeOption(newValue);
  };
  const GetTotalQuantity = () => {
    var totalQuantity = 0;
    for (let i in AttributesInputValue) {
      console.log(i);
      console.log(AttributesInputValue[i]);
      totalQuantity += parseInt(AttributesInputValue[i]["variant_stock"]);
    }
    return totalQuantity;
  };
  const setDataToTable = () => {
    console.log("===============");
    console.log("setDataToTable");
    console.log("===============");

    let arrays = [];
    for (let i in mainState) {
      console.log("=======Loop========");

      console.log(i);
      console.log(mainState[i]);
      console.log("===============");

      arrays.push(mainState[i]);
    }
    console.log("arrays", arrays);
    if (arrays.length > 1) {
      console.log(combinationMake(arrays, "-"));
      console.log("===============");
      console.log("setDataToTable length > 1");
      console.log("===============");
      setitemData(combinationMake(arrays, "-"));
    } else if (arrays.length === 1) {
      arrays.push([""]);
      console.log("===============");
      console.log("setDataToTable length === 1");
      console.log("===============");
      console.log(combinationMake(arrays, ""));
      setitemData(combinationMake(arrays, ""));
    } else if (arrays.length < 1) {
      console.log("===============");
      console.log("setDataToTable length < 1");
      console.log("===============");
    } else {
      console.log("===============");
      console.log("setDataToTable Noone");
      console.log("===============");

      console.log(mainState);
      console.log("===============");
      console.log("===============");
    }
  };

  const HandleVariantsInputValue = (e, index, variant) => {
    let name = e.target.name;
    let value = e.target.value;
    console.log("variant", variant);
    SetAttributesInputValue({
      ...AttributesInputValue,
      [variant]: { ...AttributesInputValue[variant], [name]: value },
    });
  };

  const HandleVariantsSwitch = (e, variant) => {
    let name = e.target.name;
    let value = e.target.checked;
    console.log("variant", variant);
    SetAttributesInputValue({
      ...AttributesInputValue,
      [variant]: { ...AttributesInputValue[variant], [name]: value },
    });
  };

  console.log("AttributesInputValue", AttributesInputValue);
  useEffect(() => {
    getAttributeList();
  }, []);

  useEffect(() => {
    setDataToTable();
  }, [isLoading]);

  const handlePreviewIcon = (fileObject, classes) => {
    const { type } = fileObject.file;
    const iconProps = {
      className: classes.image,
    };

    // if (type.startsWith("video/")) return <Theaters {...iconProps} />;
    // if (type.startsWith("audio/")) return <AudioTrack {...iconProps} />;

    switch (type) {
      case "application/msword":
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return <Description {...iconProps} />;
      case "application/pdf":
        return <PictureAsPdf {...iconProps} />;
      default:
        return <AttachFile {...iconProps} />;
    }
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

  const getVariantAction = (item) => {
    return AttributesInputValue[item] !== undefined && AttributesInputValue[item]["variant_action"] !== null
      ? AttributesInputValue[item]["variant_action"]
      : true;
  };
  const getMainOptions = () => {
    let addedList = Object.keys(mainState);
    console.log("added list", addedList);
    console.log("added atttibutesList", atttibutesList);
    // return atttibutesList.filter(curr=>!curr.label.includes(addedList))
    // return atttibutesList.filter((curr) => !curr.label.includes(addedList));
    const filterdata = atttibutesList.filter((o) => !addedList.includes(o.label));
    return filterdata;
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="categorey-parent">
      <div className="bg-white cat-child ">
        <div className="d-flex align-items-center" style={{ padding: "20px 35px ", border: "0.5px solid #E0E0E0" }}>
          {/* <img src={add} alt="" /> */}
          <h3 style={{ fontSize: "23px", marginTop: "6px" }}>Edit Product</h3>
        </div>
        {/* -----------product form---------- */}
        <div className="product-main">
          <div className="row">
            <div className="col-12 col-md-6">
              {/* <p>Name*</p> */}
              <RequiredLabel text={"Name"} />
              <InputGroup className="mb-3">
                <Form.Control
                  aria-label="Username"
                  name="product_name"
                  value={productAllData["product_name"]}
                  onChange={(e) => handleInputs(e, SetproductAllData)}
                  aria-describedby="basic-addon1"
                  style={{ backgroundColor: "#FAFAFA" }}
                />
              </InputGroup>
            </div>
            <div className="col-12 col-md-6">
              <RequiredLabel text={"Barcode"} />
              {/* <p>*</p> */}
              <InputGroup className="mb-3">
                <Form.Control
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ backgroundColor: "#FAFAFA" }}
                  placeholder="This will be generated automatically"
                  disabled
                />
              </InputGroup>
            </div>
            <div className="col-12 col-md-6">
              <RequiredLabel text={"Category"} />
              <div className="mb-3" style={{ backgroundColor: "#FAFAFA" }}>
                {/* <SelectDropDown options={categoryList && categoryList} setSelectedOptionCategory={setSelectedOptionCategory} /> */}

                <Select
                  placeholder="---Select---"
                  isClearable
                  options={categoryList}
                  defaultValue={productAllData["product_category"]}
                  onChange={(option) => setParentCategory(option.value)}
                />
              </div>
            </div>

            {isEmpty(AttributesInputValue) && (
              <div className="col-12 col-md-6">
                <RequiredLabel text={"Quantity"} />
                {/* <p>*</p> */}
                <InputGroup className="mb-3">
                  <Form.Control
                    aria-label="Username"
                    name="product_quantity"
                    onChange={(e) => handleInputs(e, SetproductAllData)}
                    value={productAllData["product_quantity"]}
                    aria-describedby="basic-addon1"
                    style={{ backgroundColor: "#FAFAFA" }}
                    // value={productAllData["product_quantity"]}
                  />
                </InputGroup>
              </div>
            )}
            {console.log("AttributesInputValue", AttributesInputValue)}

            {!isEmpty(AttributesInputValue) && (
              <div className="col-12 col-md-6">
                {/* <RequiredLabel text={"Quantity"} /> */}
                <p>Quantity</p>
                <InputGroup className="mb-3">
                  <Form.Control
                    aria-label="Username"
                    name="product_quantity"
                    value={GetTotalQuantity()}
                    aria-describedby="basic-addon1"
                    style={{ backgroundColor: "#FAFAFA" }}
                    // value={productAllData["product_quantity"]}
                  />
                </InputGroup>
              </div>
            )}
            <div className="col-12 col-md-6">
              {/* <p>*</p> */}
              <RequiredLabel text={"Price"} />
              <InputGroup className="mb-3">
                <Form.Control
                  aria-label="Username"
                  name="product_price"
                  onChange={(e) => handleInputs(e, SetproductAllData)}
                  aria-describedby="basic-addon1"
                  style={{ backgroundColor: "#FAFAFA" }}
                  value={productAllData["product_price"]}
                />
              </InputGroup>
            </div>
            <div className="col-12 col-md-6">
              {/* <p>*</p> */}
              <RequiredLabel text={"Discount Price"} />
              <InputGroup className="mb-3">
                <Form.Control
                  aria-label="Username"
                  name="product_discount"
                  onChange={(e) => handleInputs(e, SetproductAllData)}
                  aria-describedby="basic-addon1"
                  style={{ backgroundColor: "#FAFAFA" }}
                  value={productAllData["product_discount"]}
                />
              </InputGroup>
            </div>
            <div className="col-12 col-md-6 d-none">
              <RequiredLabel text={"Vat(%)"} />
              <InputGroup className="mb-3">
                <Form.Control
                  aria-label="Username"
                  name="product_vat"
                  onChange={(e) => handleInputs(e, SetproductAllData)}
                  aria-describedby="basic-addon1"
                  style={{ backgroundColor: "#FAFAFA" }}
                  value={productAllData["product_vat"]}
                />
              </InputGroup>
            </div>
            <div className="col-12 col-md-6 d-none">
              {/* <p>*</p> */}
              <RequiredLabel text={"Tax"} />
              <InputGroup className="mb-3">
                <Form.Control
                  aria-label="Username"
                  name="product_tax"
                  onChange={(e) => handleInputs(e, SetproductAllData)}
                  aria-describedby="basic-addon1"
                  style={{ backgroundColor: "#FAFAFA" }}
                  value={productAllData["product_tax"]}
                />
              </InputGroup>
            </div>
            <div className="col-12">
              {/* <p></p> */}
              <RequiredLabel text={"Description"} />
              <Form.Control
                as="textarea"
                placeholder=""
                className="mb-3"
                name="product_description"
                value={productAllData["product_description"]}
                onChange={(e) => handleInputs(e, SetproductAllData)}
                style={{
                  height: "100px",
                  resize: "none",
                  backgroundColor: "#FAFAFA",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* ====================attribute=================== */}
      <div className="product-main my-4 bg-white cat-child" style={{ borderTop: "0.5px solid #E0E0E0" }}>
        <h4 className="fw-bold my-2 mb-4">Attribute</h4>
        {/* <AttributeMultipleInput /> */}
        <div className="main-select">
          <CreatableSelect
            isMulti
            styles={{ height: "45px" }}
            // options={atttibutesList !== undefined && atttibutesList}
            options={getMainOptions()}
            defaultValue={!isLoading && mainState !== undefined && Object.keys(mainState).map((curr, index) => ({ value: index, label: curr }))}
            // defaultValue={attributesCom}
            placeholder="Enter a choice value"
            onChange={handleMultiInputChange}
          />
        </div>

        {attributesCom?.map((newInput, index) => (
          <div className="row mt-3" key={index}>
            <div className=" col-lg-5 col-md-5  col-sm-12">
              <input type="text" style={{ height: "38px" }} className="multiple_input ps-3" value={newInput?.label} disabled />
            </div>
            <div className="col-lg-7 col-md-5 col-sm-12 main-select">
              <CreatableSelect
                defaultValue={
                  !isLoading &&
                  mainState[newInput?.label] !== undefined &&
                  mainState[newInput?.label].map((curr, index) => ({ label: curr, value: index }))
                }
                isMulti
                placeholder="Enter a choice value"
                onChange={(value) => handleMultiInputInner(newInput?.label, value)}
              />
            </div>
          </div>
        ))}

        <div>
          <table className="item-tables mt-3 " style={{ overflowX: "auto", display: "block" }}>
            <thead>
              <tr className="trod" style={{ height: "45px" }}>
                <td className="minw" style={{ width: "340px", textAlign: "center" }}>
                  Variant
                </td>
                <td className="minw" style={{ width: "380px", textAlign: "center" }}>
                  Variant Price
                </td>
                <td className="minw" style={{ width: "398px", textAlign: "center" }}>
                  Variant Stock
                </td>
                <td className="minw" style={{ width: "210px", textAlign: "center" }}>
                  Action
                </td>
              </tr>
            </thead>
            <tbody>
              {itemData.map((item, index) => (
                <tr className="trod" key={index + 1} style={{ height: "45px" }}>
                  <td className="ps-1 ps-md-2 ps-lg-4">{item}</td>
                  <td className="text-cente productVariatntTd">
                    Base Price +
                    <input
                      name="variant_price"
                      onChange={(e) => HandleVariantsInputValue(e, 0, item)}
                      className=" productVariantTdinput"
                      type="text"
                      placeholder="0.00"
                      value={AttributesInputValue[item] !== undefined ? AttributesInputValue[item]["variant_price"] : ""}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      name="variant_stock"
                      onChange={(e) => HandleVariantsInputValue(e, 1, item)}
                      className="attribute_input"
                      type="text"
                      placeholder="0.00"
                      value={AttributesInputValue[item] !== undefined ? AttributesInputValue[item]["variant_stock"] : ""}
                    />
                  </td>
                  <td>
                    <div class="form-check form-switch d-flex justify-content-center">
                      <input
                        class="form-check-input "
                        // onChange={(e) => {
                        //   console.log(e.target.value);
                        //   console.log(e);
                        // }}
                        name="variant_action"
                        value={getVariantAction(item)}
                        // value={
                        //   AttributesInputValue[item] !== undefined && AttributesInputValue[item]["variant_action"] !== null
                        //     ? AttributesInputValue[item]["variant_action"]
                        //     : true
                        // }
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        checked={getVariantAction(item)}
                        // onChange={(e) => console.log(e.target.checked)}
                        onChange={(e) => HandleVariantsSwitch(e, item)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ====================attribute=================== */}
      <div className="product-main my-4 bg-white cat-child" style={{ borderTop: "0.5px solid #E0E0E0" }}>
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-5 ">
            <h5 style={{ marginTop: "30px" }}>Thumbnail image</h5>
            <p style={{ color: "#8E8E93" }}>( Select your file & uploaded )</p>
            <div
              className="w-100 browse-main d-flex align-items-center"
              style={{
                height: "55px",
                border: "1px solid #E0E0E0",
                borderRadius: "7px",
                overflowX: "hidden",
              }}
            >
              {fileName === "" ? (
                <p className="my-2 ms-2" style={{ color: "#4F4F4F" }}>
                  You can upload or change
                </p>
              ) : (
                <p className="my-2 ms-2" style={{ color: "#4F4F4F" }}>
                  {" "}
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
            {/* {
              singleProduct?.images?.map(m => (<div key={m.id} className="my-2">
              <img height={90} width={90} src={`${BASE_URL}${m?.image}`} alt="" /> <br />
              <button  className="remove-btn btn btn-small mt-1  rounded" style={{ border: "1px solid gray !important" }}>
                Remove
              </button>
            </div>))
            } */}
          </div>

          {/* ----------status--------- */}
          <div className="col-12 col-lg-5">
            <h5 style={{ marginTop: "30px" }}>Status</h5>
            <p style={{ color: "#8E8E93" }}>( If the Category Option is available )</p>
            <div className="row mr-4">
              <div className=" d-flex justify-content-between col-12 py-3" style={{ backgroundColor: "#F2F2F7", borderRadius: "8px" }}>
                <div className="d-flex w-100">
                  <div
                    className="d-flex py-1 justify-content-center align-items-center"
                    style={{
                      backgroundColor: "#212121",
                      width: "32px",
                      height: "32",
                      borderRadius: "3px",
                    }}
                  >
                    <img src={eye} alt="" />
                  </div>
                  <span className="mx-3">{Categoryswitch ? "ON" : "OFF"}</span>
                </div>

                <div class="form-check form-switch ">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    width={40}
                    height={40}
                    checked={Categoryswitch}
                    onClick={toggleSwitch}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="optional">
            <p>Feature Images (Optional)</p>
          </div>
          <div className="col-12 ">
            {/*  */}
            {/* <div>
              <img width={50} height={50} src={doc} alt="" />
              <span></span>
              <p>Drag n Drop here</p>
              <p className="or">Or</p>
              <p className="browse">Browse</p>
              <button>Upload File</button>
            </div>
            <input
              type="file"
              onChange={handleOptional}
              multiple
              
            /> */}
            <DropzoneArea
              acceptedFiles={["image/*"]}
              dropzoneText={"Drag and drop an image here or click"}
              onChange={(files) => setDropzoneimages(files)}
              filesLimit={4}
            />
            {/* <DropzoneArea filesLimit={5} getPreviewIcon={handlePreviewIcon} /> */}
          </div>
          <div className="d-flex my-4">
            {singleProduct !== undefined &&
              singleProduct.images !== undefined &&
              singleProduct?.images?.map((img, index) => (
                <div key={index} className="main-box-img" style={{ cursor: "pointer", position: "relative" }}>
                  <img key={index} src={`${BASE_URL}${img.image}`} width={70} height={70} className="mx-2" alt="" srcset="" /> <br />
                  <button className="del-btn" onClick={() => deleteFeatureImages(img?.id)}>
                    <X size={14} />
                  </button>
                </div>
              ))}
          </div>
          <div className="mt-2 mt-md-4" style={{ marginLeft: "-10px" }}>
            <button onClick={ValidateData} className="save-btn me-2 mt-2" style={{ background: "#000", color: "white" }}>
              Save
            </button>
            <button onClick={()=>history.push(path.product_list)} className="save-btn mt-2">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
