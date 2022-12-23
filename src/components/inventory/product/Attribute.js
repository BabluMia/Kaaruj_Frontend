import React from "react";
import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import swal from "sweetalert";
import DeleteIcon from "../../CustomCommons/DeleteIcon";
import EditIcon from "../../CustomCommons/EditIcon";
import RequiredLabel from "../../CustomCommons/RequiredLabel";
import add from "./../../../assets/Icon/add.svg";
import { BASE_URL } from "../../Const/Url";
import axios from "axios";
import { showToast } from "../../../utils/ToastHelper";
import { useEffect } from "react";
import Loader from "../../CustomCommons/Loader";
import { can_add_attributes, can_delete_attributes, can_view_attributes, has_permissions } from "../../CustomCommons/utils";
import Permission from "../../CustomCommons/Permission";

const Attribute = () => {
  // const [atttibute, setAttribute] = useState([{ id: 1, name: "Color" }]);
  const [atttibute, setAttribute] = useState([]);
  const [isLoading,setIsLoading] = useState(true)

  const handlevalue = (e) => {
    e.preventDefault();
    const url = `${BASE_URL}api/v1/inventory/attributes/`;

    const name = e.target.name.value;
    if (name !== "") {
      // setAttribute([...atttibute, { id: atttibute.length + 1, name: name }]);
      axios
        .post(url, { name: name })
        .then((res) => {
          if (res.data.status) {
            // clearData();
            showToast("success", "Attribute Added.");
            getAttributeList();
          }
        })
        .catch((err) => {
          // const message = JSON.parse(err.request.response).message;
          // const errorMsg = JSON.parse(err.request.response).errors;
          // for (let value of Object.values(errorMsg)) {
          //   showToast("error", value[0]);
          // }
          showToast("error", err.message);
        });
    } else {
      swal("Error", "Add Something First!", "error");
    }
    e.target.reset();
  };
  const getAttributeList = () => {
    const url = `${BASE_URL}api/v1/inventory/attributes/`;
    axios
      .get(url)
      .then((res) => {
        setAttribute(res.data.data.results);
        // console.log(res.data);
        setIsLoading(false)
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        console.log(err.request.response);
      });
  };
  useEffect(() => {
    getAttributeList();
  }, []);
  // console.log(demo,'---------attributes------------')
  const deleteAttribute = (id) => {
    const url = `${BASE_URL}api/v1/inventory/attributes/${id}`;

    axios
      .delete(url)
      .then(() => {
        showToast("Delele", "Data Deleted");
        getAttributeList();
      })
      .catch((err) => {
        const message = JSON.parse(err.request.response).message;
        console.log(err.request.response);
      });
  };

  const handeleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Data",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteAttribute(id);

        // const filtered = atttibute.filter((i) => i.id !== id);
        // setAttribute(filtered);
        swal(" Your data has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your data is safe!");
      }
    });
  };
  // console.log(atttibute, "---------------");
  var options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    // day: "numeric",
    hour: 'numeric', minute: 'numeric', hour12: true
  };
  if(!has_permissions(can_view_attributes)){
    return <Permission/>
  }
  if(isLoading){
    return <Loader/>
  }
  
  return (
    <div
      className="categorey-parent pd-right"
      style={{ height: "100vh", background: "#FAFAFA" }}
    >
      {
        has_permissions(can_add_attributes) && <div className="bg-white">
        <div
          className="d-flex align-items-center"
          style={{ padding: "20px 35px ", border: "0.5px solid #E0E0E0" }}
        >
          {/* <img src={add} alt="" /> */}
          <h3 className="head-tag" style={{ marginTop: "6px" }}>
            {/* marginLeft: "12px"  */}
            Add New Attribute
          </h3>
        </div>
        <div className="px-3 px-md-4 pt-4 pb-3">
          {/* <p>*</p> */}
          <RequiredLabel text={"Name"} />
          <form action="" onSubmit={(e) => handlevalue(e)}>
            <InputGroup className="mb-3 ">
              <Form.Control
                aria-label="Username"
                aria-describedby="basic-addon1"
                style={{ backgroundColor: "#FAFAFA" }}
                placeholder="New Attribute"
                name="name"
              />
            </InputGroup>
            <input
              type="submit"
              className="attribute-submit"
              value={"Submit"}
            />
            {/* <button></button> */}
          </form>
        </div>
      </div>
      }
      
      {/* ======table===== */}
      <div className="" style={{ marginTop: "50px" }}>
        <h5 className="my-3 ms-1" style={{ fontSize: "23px" }}>
          Attribute Table
        </h5>
        <div
          className="me-3 me-md-0 table-responsive"
          style={{ display: "block", overflowX: "auto" }}
        >
          <table className="w-100 ">
            <thead
              className="bg-dark text-white head-row"
              style={{ height: "50px", borderTopLeftRadius: "20px !important" }}
            >
              <tr className="">
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    minWidth: "20%",
                    textAlign: "center",
                    borderTopLeftRadius: "4px ",
                  }}
                >
                  S/N
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    minWidth: "20%",
                    textAlign: "center",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    minWidth: "20%",
                    textAlign: "center",
                  }}
                >
                  Create On
                </th>
                <th
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    borderTopRightRadius: "4px ",
                    minWidth: "20%",
                    textAlign: "center",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="tb">
              {/* <tr
                className="table-row"
                style={{ height: "40px", textAlign: "center" }}
              >
                <td>1</td>
                <td>Color</td>
                <td>15 May 2020 8:00 am</td>
                <td>
                  <div className=" div-attr">
                    <i
                      className="red1 attr ph-trash"
                      style={{ fontSize: "18px" }}
                    ></i>
                  </div>
                </td>
              </tr> */}
              {atttibute.map((a, index) => (
                <tr
                  key={a.id}
                  className="table-row"
                  style={{ height: "40px", textAlign: "center" }}
                >
                  <td>{index + 1}</td>
                  <td>{a.name}</td>
                  <td>
                    {new Date(a.created_at).toLocaleDateString(
                      "en-US",
                      options
                    )}
                  </td>
                  <td >
                    {
                      has_permissions(can_delete_attributes) ? <div
                      className="edit-del red"
                      style={{ width: "30px", margin: "0 auto" }}
                      onClick={() => handeleDelete(a.id)}
                    >
                      <DeleteIcon />
                    </div> : <div
                      className="edit-del red"
                      style={{ width: "30px", margin: "0 auto" }}
                      onClick={() => swal("Sorry , You are not able to delete attribute.")}
                    >
                      <DeleteIcon />
                    </div>
                    }
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attribute;
