import React from "react";
import { useState } from "react";

import bigShoe from "../../../assets/Icon/bigShoe.svg";
import cushion from "../../../assets/Icon/big-cushion.svg";
import small1 from "../../../assets/Icon/small1.svg";
// import small2 from "../../../assets/Icon/small2.svg";
import small3 from "../../../assets/Icon/small3.svg";
import small4 from "../../../assets/Icon/small4.svg";
import tic from "../../../assets/Icon/tic.svg";
import barcode from "../../../assets/Icon/barcode.svg";
import barcode2 from "../../../assets/Icon/barcode2.png";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../Const/Url";
import axios from "axios";
import { useEffect } from "react";
import Loader from "../../CustomCommons/Loader";
import swal from "sweetalert";

const ViewProduct = () => {
  const { id } = useParams();
  const [pd, setPd] = useState({});

  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);

  const [material, setMaterial] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [colorState, setColorState] = useState("");
  const [sizeState, setSizeState] = useState("");
  const [metState, setMetState] = useState("");
  const [attrVal, setAttrVal] = useState("");
  const [queryState, setQueryState] = useState("");
  const [variantPrice, setVariantPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [total, Settotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [percentis, setPercentis] = useState(0);
  const [mainPrice, setMainPrice] = useState(0);
  const [mainAttrState, setMainAttrState] = useState([]);
  const [scm, setScm] = useState();
  const [mainState, SetmainState] = useState({});

  const [baseVarPrice, setBaseVarPrice] = useState(0);
  // console.log(colorState){
  //   color:{red: false,green:false},
  //   size:{Xl:false,L:false}
  // }

  var options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    // day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const url = `${BASE_URL}api/v1/inventory/products/${id}`;
  const getPd = () => {
    axios
      .get(url)
      .then((res) => {
        const result = res.data.data;
        console.log("result", result);
        setPd(result);
        setMainAttrState(res.data?.data?.variants_json?.mainState);
        const at = res.data?.data?.variants_json?.mainState;

        setAttrVal(res.data?.data?.variants_json?.AttributesInputValue);
        setPrice(Number(result.price));
        setDiscount(Number(result.discount));
        setIsLoading(false);
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        // console.log(err.request.response);
      });
  };
  useEffect(() => {
    getPd();
  }, []);

  useEffect(() => {
    var str = "";
    Object.keys(mainAttrState).map((curr, index) => (str += `${index !== 0 ? "-" : ""}${mainState[curr]}`));
    console.log(str);
    let baseprice = parseInt(pd?.discount) === 0 ? parseInt(pd?.price) : parseInt(pd?.discount);
    let variantPrice = attrVal[str] !== undefined && attrVal[str]["variant_price"];
    let total = baseprice + parseInt(variantPrice === undefined ? 0 : variantPrice);

    setBaseVarPrice(parseInt(variantPrice));
    console.log("variantPrice", variantPrice);
    if (variantPrice===undefined || variantPrice) {
      swal(
        `Variant Name : ${str}`,
        `Baseprice: ( ৳ ${baseprice} ) + Variant Price: ( ৳ ${parseInt(variantPrice === undefined ? 0 : variantPrice)} ) = ৳ ${total}`
      );
    }
  }, [mainState, mainPrice, total, variantPrice]);

  useState(() => {
    let baseprice = parseInt(pd?.discount) === 0 ? parseInt(pd?.price) : parseInt(pd?.discount);
    setMainPrice(Number(baseprice + baseVarPrice));
  }, [baseVarPrice]);

  if (isLoading) {
    return <Loader />;
  }
  console.log("mainState", mainState);

  return (
    <div className="categorey-parent ">
      <div className="row me-2 me-md-0">
        <div className="col-12 col-lg-5 row mt-3 h-auto" style={{}}>
          <div className="col-12 " style={{ borderRadius: "10px" }}>
            <img style={{ borderRadius: "10px", height: "400px" }} className="img-fluid w-100" src={pd?.thumb ? pd?.thumb : cushion} alt="" />
          </div>
          <div className="col-12  py-4 d-flex flex-wrap justify-content-around small-mr mt-51">
            {pd.images?.map((img) => (
              <div key={img.id} className=" mt-2 rounded">
                <img className="rounded" style={{ maxWidth: "110px", minHeight: "100px" }} src={`${BASE_URL}${img.image}`} alt="" />
              </div>
            ))}
          </div>
        </div>
        {/* ======content div========== */}
        <div
          className="col-12 col-lg-7 mt-3 product-content  bg-white"
          style={{
            border: "0.5px solid #E0E0E0",
          }}
        >
          <div className="d-flex justify-content-between">
            <div>
              <div className=" mb-2 ">
                <span style={{ fontSize: "14px", color: "#828282" }}>{pd.category_name}</span>
                <button className={`stock px-2 ms-2 ${pd.is_active === true ? "" : "bg-danger"}`} style={{ fontSize: "14px" }}>
                  {pd.is_active === true ? "Active" : "Disable"}
                </button>
              </div>
              <h5 style={{ marginBottom: "4px" }}>{pd.name ? pd.name.slice(0, 15) : "Cushion Cover"}</h5>
              <span className="" style={{ fontSize: "13px ", color: "#333333" }}>
                Added Details: {new Date(pd.created_at).toLocaleDateString("en-US", options)}
              </span>
            </div>
            <div className="me-4">
              <div className="barcode-main" style={{ background: `url(${pd?.barcode}) center no-repeat` }}>
                {/* <img  src={barcode2} alt="" /> */}
                <button className="print-btn ">Print</button>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center my-2">
            <p className="my-auto me-2">{pd.stock} Pcs</p>
            <button className=" stock px-1">{pd.stock > 0 ? "in Stock" : "Stock Out"}</button>
          </div>

          <div className="mt-4">
            <span
              style={{
                fontSize: "14px",
                color: "#828282",
                marginBottom: "8px",
              }}
            >
              Price:
            </span>

            <h5 className="price-head">
              ৳{pd?.discount ? parseInt(pd?.discount) : "599"} <sup className="sup">৳{pd?.price ? parseInt(pd?.price) : "620"}</sup>
              <span className=" off ms-2">{parseInt((((pd?.price - pd?.discount) / pd?.price) * 100).toFixed())} % Off</span>
            </h5>
          </div>

          <div className="row mt-4">
            {mainAttrState &&
              Object.keys(mainAttrState).map((a, index) => (
                <div key={a} className="col-12  mt-4">
                  <p>{a}</p>
                  <div className="d-flex flex-wrap ">
                    {Object.values(mainAttrState) ? (
                      Object.values(mainAttrState)[index]?.map((s) => (
                        <button
                          key={s}
                          className={`size-btn px-4 mx-1 ${mainState[a] === s ? "size-btn-click" : ""}`}
                          value={s}
                          onClick={(e) => {
                            SetmainState({ ...mainState, [a]: s });
                          }}
                        >
                          {s}
                        </button>
                      ))
                    ) : (
                      <p></p>
                    )}
                  </div>
                </div>
              ))}
          </div>
          {/* ========description======= */}
          <div className="my-4">
            <p>Description</p>
            <span className="my-4" style={{ color: "#828282" }}>
              {pd?.description}
            </span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
