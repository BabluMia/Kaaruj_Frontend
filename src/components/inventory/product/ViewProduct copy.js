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
  const [discount, setDiscount] = useState(0);
  const [percentis, setPercentis] = useState(0);
  const [mainPrice, setMainPrice] = useState(0);
  const [mainAttrState, setMainAttrState] = useState([]);
  const [scm, setScm] = useState();
  // console.log(colorState){
  //   color:{red: false,green:false},
  //   size:{Xl:false,L:false}
  // }
  useEffect(() => {
    axios
      .get(`${BASE_URL}api/v1/inventory/products/${id}`)
      .then((res) => {
        // console.log(res.data.data.variants_json.mainState ,'===============================');
        const temp1 = res?.data?.data?.product_list_json?.mainstate;
        var output = [];
        for (let i in temp1) {
          console.log(i,'======================i================')
          for (let j in temp1[i]["variantObj"]) {
            console.log(j);
            console.log(temp1[i]["variantObj"][j]);
            const d = temp1[i]["variantObj"][j];
            d.total !== 0 &&
              output.push({
                name: i,
                basePrice: temp1[i].price,
                price: d["price"],
                quantity: d["quantity"],
                id: d["id"],
                total: d["total"],
                variant: d["name"],
              });
            console.log(j)
          }
        }
        
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        // console.log(err.request.response);
      });
  }, []);

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
        console.log(res.data.data, "---------------single----------");
        console.log(res.data.data.results);
        const result = res.data.data;
        setPd(result);
        setColor(res.data?.data?.variants_json?.mainState["Color"]);
        setSize(res.data?.data?.variants_json?.mainState["Size"]);
        setMaterial(res.data?.data?.variants_json?.mainState["Material"]);
        setMainAttrState(res.data?.data?.variants_json?.mainState);
        const at = res.data?.data?.variants_json?.mainState

        let a 
        for(let i in at){
          
        a = {
          [i] :{}
        }
        for(let j in at[i]){
          console.log(j,'----------------')
        }
          
      }
        // console.log(color)
        // console.log(size)

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
    const varPrice = Number(attrVal[queryState]?.variant_price);
    if (isNaN(varPrice) === false) {
      setVariantPrice(varPrice);
    } else {
      setVariantPrice(0);
    }
    setMainPrice(Number(varPrice + discount));
  }, [queryState, mainPrice]);

  // console.log(variantPrice,'----------------------varp------------')

  // console.log(mainAttrState, "-----------attrstate-------------");
  console.log(Object.keys(mainAttrState));
  console.log(Object.values(mainAttrState));
  // const getNewArray = Object.keys(mainAttrState).map((name,index)=> name )

  console.log(scm,'--------------getScmNewArray------------')
  
  // Object.keys(mainAttrState).map(a=> setScm({...scm , [a]:{}}))



  const setColorF = (val) => {
    setColorState(val);
  };
  console.log(colorState);
  const setSizeF = (e) => {
    setSizeState(e);
  };
  const setMatF = (e) => {
    setMetState(e);
  };
  useEffect(() => {
    //   if(colorState){
    //     setQueryState(`${colorState}`)
    //   }
    //  else if(metState){
    //     setQueryState(`${metState}`)
    //   }
    //   else if(sizeState){
    //     setQueryState(`${sizeState}`)
    //   }
    //   else if(colorState && metState){
    //     setQueryState(`${colorState}-${metState}`)
    //   } else if(colorState && sizeState){
    //     setQueryState(`${colorState}-${sizeState}`)
    //   } else if(metState && sizeState){
    //     setQueryState(`${sizeState}-${sizeState}`)
    //   }
    //   else if(colorState && metState && sizeState){
    //     setQueryState(`${colorState}-${metState}-${sizeState}`)
    //   }
    const c = `-${colorState}`;
    const s = `-${sizeState}`;
    const m = `-${metState}`;

    setQueryState(`${colorState}-${metState}-${sizeState}`);
  }, [sizeState, colorState, metState]);

  if (isLoading) {
    return <Loader />;
  }

  // console.log(queryState, "-------------querystate--------------");
  // setScm(Object?.keys(mainAttrState)?.map(a => [a]))
  // Object?.keys(mainAttrState)?.map(a => setScm(a))
  // console.log(scm,'-----------------------scm-----------------')
  // let arr =[]
  //   for (let key in mainAttrState) {
  //    console.log(arr.push(key) ,'========================')
  //   //  setScm({...scm,[key]:{name:'bablu'}})
  //   }

  // console.log(scm, "-----------------------scm-----------------");

  return (
    <div className="categorey-parent ">
      <div className="row me-2 me-md-0">
        <div className="col-12 col-lg-5 row mt-3 h-auto" style={{}}>
          <div className="col-12 " style={{ borderRadius: "10px" }}>
            <img
              style={{ borderRadius: "10px", height: "400px" }}
              className="img-fluid w-100"
              src={pd?.thumb ? pd?.thumb : cushion}
              alt=""
            />
          </div>
          <div className="col-12  py-4 d-flex flex-wrap justify-content-around small-mr mt-51">
            {pd.images?.map((img) => (
              <div key={img.id} className=" mt-2 rounded">
                <img
                  className="rounded"
                  style={{ maxWidth: "110px", minHeight: "100px" }}
                  src={`${BASE_URL}${img.image}`}
                  alt=""
                />
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
                <span style={{ fontSize: "14px", color: "#828282" }}>
                  {pd.category_name}
                </span>
                <button
                  className={`stock px-2 ms-2 ${
                    pd.is_active === true ? "" : "bg-danger"
                  }`}
                  style={{ fontSize: "14px" }}
                >
                  {pd.is_active === true ? "Active" : "Disable"}
                </button>
              </div>
              <h5 style={{ marginBottom: "4px" }}>
                {pd.name ? pd.name.slice(0, 15) : "Cushion Cover"}
              </h5>
              <span
                className=""
                style={{ fontSize: "13px ", color: "#333333" }}
              >
                Added Details:{" "}
                {new Date(pd.created_at).toLocaleDateString("en-US", options)}
              </span>
            </div>
            <div className="me-4">
              <div
                className="barcode-main"
                style={{ background: `url(${pd?.barcode}) center no-repeat` }}
              >
                {/* <img  src={barcode2} alt="" /> */}
                <button className="print-btn ">Print</button>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center my-2">
            <p className="my-auto me-2">{pd.stock} Pcs</p>
            <button className=" stock px-1">
              {pd.stock > 0 ? "in Stock" : "Stock Out"}
            </button>
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

            {variantPrice ? (
              <h5 className="price-head">
                ৳{pd?.discount ? parseInt(mainPrice) : "599"}{" "}
                {price > mainPrice && (
                  <sup className="sup">
                    ৳{pd?.price ? parseInt(pd?.price) : "620"}
                  </sup>
                )}
                {price > mainPrice && (
                  <span className=" off ms-2">
                    {/* {(pd?.price * (100 - pd?.discount)) / 100} % Off */}
                    {parseInt(((pd?.price - mainPrice) / mainPrice) * 100)} %
                    Off
                  </span>
                )}
              </h5>
            ) : (
              <h5 className="price-head">
                ৳{pd?.discount ? parseInt(pd?.discount) : "599"}{" "}
                {
                  <sup className="sup">
                    ৳{pd?.price ? parseInt(pd?.price) : "620"}
                  </sup>
                }
                {
                  <span className=" off ms-2">
                    {/* {(pd?.price * (100 - pd?.discount)) / 100} % Off */}
                    {parseInt(((pd?.price - pd?.discount) / pd?.price) * 100)} %
                    Off
                  </span>
                }
                {/* <span className="off">
               
                {Number(((pd?.price + variantPrice) - (pd?.discount + variantPrice)).toFixed())} ৳
                Off
              </span> */}
              </h5>
            )}
          </div>
          {/* ====color and size ==== */}
          <div className="row mt-4 d-none">
            <div className="col-12  ">
              {color && (
                <>
                  {" "}
                  <p>Color</p>
                  <div className="d-flex">
                    {color ? (
                      color?.map((p) => (
                        <button
                          key={p}
                          className={`size-btn px-2 mx-1 ${
                            colorState === p ? "size-btn-click" : ""
                          }`}
                          value={p}
                          // onClick={(e) =>setColorF(e.target.value)}
                          onClick={(e) => setColorF(e.currentTarget.value)}
                        >
                          {p}
                        </button>
                      ))
                    ) : (
                      <p className="text-danger">No Color Added</p>
                    )}
                  </div>
                </>
              )}
              {size && (
                <div className="col-12  mt-4">
                  <p>Size</p>
                  <div className="d-flex flex-wrap ">
                    {size ? (
                      size?.map((s) => (
                        <button
                          key={s}
                          className={`size-btn px-2 mx-1 ${
                            sizeState === s ? "size-btn-click" : ""
                          }`}
                          value={s}
                          onClick={(e) => setSizeF(e.currentTarget.value)}
                        >
                          Size-{s}
                        </button>
                      ))
                    ) : (
                      <p className="text-danger">No Size Added</p>
                    )}
                  </div>
                </div>
              )}
              {material && (
                <div className="col-12  mt-4">
                  <p>Material</p>
                  <div className="d-flex flex-wrap ">
                    {material ? (
                      material?.map((s) => (
                        <button
                          key={s}
                          className={`size-btn px-2 mx-1 ${
                            metState === s ? "size-btn-click" : ""
                          }`}
                          value={s}
                          onClick={(e) => setMatF(e.currentTarget.value)}
                        >
                          {s}
                        </button>
                      ))
                    ) : (
                      <p className="text-danger">No Material Added</p>
                    )}
                  </div>
                </div>
              )}
            </div>
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
                          className={`size-btn px-4 mx-1 ${
                            sizeState === s ? "size-btn-click" : ""
                          }`}
                          value={s}
                          onClick={(e) => {
                            setSizeState(e.target.value);
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
