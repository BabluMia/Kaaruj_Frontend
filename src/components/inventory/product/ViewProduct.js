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
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../../Const/Url";
import axios from "axios";
import { useEffect } from "react";
import Loader from "../../CustomCommons/Loader";
import swal from "sweetalert";
import { saveAs } from "file-saver";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

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
  const [basePrice, setBasePrice] = useState(0);
  const [barcode, setBarcode] = useState("");

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

  // async function download(url, name) {
  //   const a = document.createElement("a");
  //   a.href = await toDataURL(url);
  //   a.download = name;
  //   document.body.appendChild(a);
  //   a.click();
  //   // document.body.removeChild(a);
  // }

  function toDataURL(url) {
    return fetch(url, {
      method: "GET",
    })
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        console.log("blob ", blob);

        return URL.createObjectURL(blob);
      });
  }

  // function download(url,filename) {
  //   axios
  //     .get(url, {
  //       responseType: "blob",
  //     })
  //     .then((response) => {
  //       const disposition = response.headers["content-disposition"];
  //       // var filename = disposition.split(/;(.+)/)[1].split(/=(.+)/)[1];
  //       // if (filename.toLowerCase().startsWith("utf-8''")) filename = decodeURIComponent(filename.replace("utf-8''", ""));
  //       // else filename = filename.replace(/['"]/g, "");
  //       return response.data;
  //     })
  //     .then((blob) => {
  //       var url = window.URL.createObjectURL(blob);
  //       var a = document.createElement("a");
  //       a.href = url;
  //       a.download = filename;
  //       document.body.appendChild(a); // append the element to the dom
  //       a.click();
  //       a.remove(); // afterwards, remove the element
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  // const download = async (url) => {
  //   try {
  //     await axios({
  //       url: url + "/",
  //       method: "GET",
  //       responseType: "blob",
  //     }).then((response) => {
  //       const url = window.URL.createObjectURL(new Blob([response.data]));
  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.setAttribute("download", "Fabric Excel Format");
  //       document.body.appendChild(link);
  //       link.click();
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const download = (slug, product_name) => {
    // window.open(url);
    const url = `${BASE_URL}/api/v1/inventory/product_barcode/?slug=${slug}`;
    axios
      .get(url)
      .then((res) => {
        console.log("res", res.data.data.data);
        var a = document.createElement("a"); //Create <a>
        a.href = "data:image/png;base64," + res.data.data.data; //Image Base64 Goes here
        console.log(a.href);
        a.download = product_name + ".png"; //File name Here
        a.click(); //Downloaded file
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const print = useRef();

  const handlePrint = useReactToPrint({
    pageStyle: `@media print {
      @page {
        margin: 1000;
      }
    }`,
    content: () => print.current,
    // documentTitle: "emp-data",
    bodyClass: "dis",
  });
  // function download(url, filename) {
  //   axios({
  //     url: url,
  //     method: "GET",
  //     responseType: "blob",
  //   })
  //     .then((response) => {
  //       var url = window.URL.createObjectURL(new Blob([response.data]));
  //       var link = document.createElement("a");
  //       link.href = link;
  //       link.setAttribute("downlaod", "image.jpg");
  //       document.body.appendChild(link); // append the element to the dom
  //       link.click();
  //       // a.remove(); // afterwards, remove the element
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }
  // // const download = (url) => {
  //   fetch(
  //     url,
  //     // "https://upload.wikimedia.org/wikipedia/en/6/6b/Hello_Web_Series_%28Wordmark%29_Logo.png",
  // {
  //   method: "GET",
  //   mode: "no-cors", // no-cors, *cors, same-origin

  // }
  //   )
  //     .then((response) => {
  //       response.arrayBuffer().then(function (buffer) {
  //         const url = window.URL.createObjectURL(new Blob([buffer]));
  //         const link = document.createElement("a");
  //         link.href = url;
  //         link.download = "image.png";
  //         link.click();
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const getPd = () => {
    const url = `${BASE_URL}api/v1/inventory/products/${id}`;
    axios
      .get(url)
      .then((res) => {
        const result = res.data.data;
        console.log("result", result);
        setBarcode(result.barcode);
        setPd(result);
        setMainAttrState(res.data?.data?.variants_json?.mainState);
        const at = res.data?.data?.variants_json?.mainState;

        setAttrVal(res.data?.data?.variants_json?.AttributesInputValue);
        setPrice(Number(result.price));
        setDiscount(Number(result.discount));
        setIsLoading(false);
        console.log(result.slug, "-------------------------slug--------------");
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
    Object.keys(mainAttrState).map(
      (curr, index) => (str += `${index !== 0 ? "-" : ""}${mainState[curr]}`)
    );
    console.log(str);
    let baseprice =
      parseInt(pd?.discount) === 0
        ? parseInt(pd?.price)
        : parseInt(pd?.discount);
    let variantPrice =
      attrVal[str] !== undefined && attrVal[str]["variant_price"];
    let variantStock =
      attrVal[str] !== undefined && attrVal[str]["variant_stock"];
    let total =
      baseprice + parseInt(variantPrice === undefined ? 0 : variantPrice);

    setBasePrice(basePrice);

    setBaseVarPrice(parseInt(variantPrice));
    console.log("variantPrice", variantPrice);
    if (variantPrice === undefined || variantPrice) {
      swal(
        `Variant Name : ${str}`,

        `Baseprice: ( ৳ ${baseprice} ) + Variant Price: ( ৳ ${parseInt(
          variantPrice === undefined ? 0 : variantPrice
        )} ) =  ৳ ${total} \n \n Variant Instock : ${
          parseInt(variantStock) < 0 ? "Unavailable" : variantStock
        }`
        // AnimationEffect:'fadeIn'
      );
    }
  }, [mainState, mainPrice, total, variantPrice]);

  const downloadImage = () => {
    saveAs(barcode, "barcode.png");
    // swal('Barcode Downloaded')
  };

  useState(() => {
    let baseprice =
      parseInt(pd?.discount) === 0
        ? parseInt(pd?.price)
        : parseInt(pd?.discount);
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
          <div
            className="col-12 d-flex justify-content-center "
            style={{ borderRadius: "10px" }}
          >
            <img
              style={{ borderRadius: "10px" }}
              className="img-fluid w-75 h-75"
              src={pd?.thumb ? pd?.thumb : cushion}
              alt=""
            />
          </div>
          {/* <div className="col-12 " style={{ borderRadius: "10px" }}>
            <img style={{ borderRadius: "10px", height: "400px" }} className="img-fluid w-100" src={pd?.thumb ? pd?.thumb : cushion} alt="" />
          </div> */}
          <div className="col-12  py-4 d-flex flex-wrap justify-content-around small-mr mt-51">
            {pd.images.slice(0, 4)?.map((img) => (
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
                  {pd.name?.length > 19 ? `${pd.name}` : pd?.name}
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
              <div className=" main-barcode">
                <img
                  ref={print}
                  className="img-fluid"
                  style={{ height: "115px" }}
                  src={pd?.barcode}
                  alt=""
                />
                {/* <img ref={print} className="img-fluid"   src={pd?.barcode} alt="" /> */}
                <div className="btn-barcode">
                  {/* <Link
                    // onClick={downloadImage}
                    href={barcode}
                    download={barcode}
                    className="print-btn "
                  >
                    Print
                  </Link> */}
                  {/* <button disabled={isLoading} onClick={(e) => downloadimage(e, pd?.barcode, pd?.name)} aria-label="download gif"> */}
                  {/* <button disabled={isLoading} onClick={(e) => downloadimage(pd?.barcode, pd?.name)} aria-label="download gif"> */}
                  {/* DOWNLOAD
                  </button> */}

                  <button
                    className="print-btn "
                    // onClick={handlePrint}
                    onClick={() => {
                      download(pd?.slug, pd?.name);
                      // download(pd?.barcode, pd?.name);
                      // download("https://github.githubassets.com/images/modules/profile/badge--acv-64.png");
                    }}
                  >
                    Print
                  </button>

                  {/* <a href={pd?.barcode + "?force=true"} download className="print-btn " >Print</a> */}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center my-2">
            <p className="my-auto me-2">{pd.stock} Pcs</p>
            <button
              className={`${pd.stock > 0 ? " stock px-1" : " stock2 px-1"}`}
            >
              {pd.stock > 0 ? "in Stock" : "Stock Out"}
            </button>
          </div>
          <div className="mt-3 d-flex align-items-center">
            <span className="fw-bold">SKU : </span>{" "}
            <span className="ms-2">{pd?.sku}</span>
          </div>

          <div className="mt-3">
            <span
              style={{
                fontSize: "14px",
                color: "#828282",
                marginBottom: "8px",
              }}
            >
              Price:
            </span>
            {console.log(
              pd?.price,
              parseInt(pd.discount),
              "----------------------baseprice"
            )}
            {parseInt(pd.discount) === 0 ? (
              <h5 className="price-head">
                ৳{pd?.price ? parseInt(pd?.price) : "599"}
              </h5>
            ) : (
              <h5 className="price-head">
                ৳ {pd?.discount ? parseInt(pd?.discount) : "599"}
                <sup className="sup ms-1">
                  ৳ {pd?.price ? parseInt(pd?.price) : "620"}
                </sup>
                <span className=" off ms-2">
                  {parseInt(
                    (((pd?.price - pd?.discount) / pd?.price) * 100).toFixed()
                  )}{" "}
                  % Off
                </span>
              </h5>
            )}
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
                            mainState[a] === s ? "size-btn-click" : ""
                          }`}
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
