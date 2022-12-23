import React, { useEffect, useState } from "react";
import "./style.css";
import resetImg from "../resetpass/img/reset_pass.svg";
import ResetPassModal from "./ResetPassModal";

export default function ResetPassword({ setHideToolbar }) {
  const [eye, setEye] = useState(false);
  const [eye1, setEye1] = useState(false);
  useEffect(() => {
    setHideToolbar(true);
    return () => {
      setHideToolbar(false);
    };
  }, []);
  // For Modals
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="left-img">
                <img src={resetImg} alt="" className="img-fluid" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="reset_content">
                <h2 className="mb-4 text-center">Reset Password?</h2>
                <p>
                  Your new password must be different to previously used
                  password
                </p>

                <form action="" className="reset_form">
                  <div className="">
                    <label htmlFor="email" className="form-label mt-5">
                      New Password
                    </label>
                    <div className="reset-input input-group mb-2 border-bottom border-dark">
                      <input
                        required
                        id="password"
                        type={eye ? "text" : "password"}
                        name="password"
                        className="form-control inputs-extra border-0 "
                        placeholder="1234"
                      />

                      <span
                        onClick="password_show_hide();"
                        onClick={() => setEye(!eye)}
                      >
                        {!eye && (
                          <svg
                            width="22"
                            height="18"
                            viewBox="0 0 22 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 1.27L2.28 0L19 16.72L17.73 18L14.65 14.92C13.5 15.3 12.28 15.5 11 15.5C6 15.5 1.73 12.39 0 8C0.69 6.24 1.79 4.69 3.19 3.46L1 1.27ZM11 5C11.7956 5 12.5587 5.31607 13.1213 5.87868C13.6839 6.44129 14 7.20435 14 8C14 8.35 13.94 8.69 13.83 9L10 5.17C10.31 5.06 10.65 5 11 5ZM11 0.5C16 0.5 20.27 3.61 22 8C21.18 10.08 19.79 11.88 18 13.19L16.58 11.76C17.94 10.82 19.06 9.54 19.82 8C18.17 4.64 14.76 2.5 11 2.5C9.91 2.5 8.84 2.68 7.84 3L6.3 1.47C7.74 0.85 9.33 0.5 11 0.5ZM2.18 8C3.83 11.36 7.24 13.5 11 13.5C11.69 13.5 12.37 13.43 13 13.29L10.72 11C9.29 10.85 8.15 9.71 8 8.28L4.6 4.87C3.61 5.72 2.78 6.78 2.18 8Z"
                              fill="#1C1C1C"
                            />
                          </svg>
                        )}
                        {eye && (
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            height="24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              xmlns="http://www.w3.org/2000/svg"
                              d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                              fill="#1C1C1C"
                            ></path>
                            <path
                              xmlns="http://www.w3.org/2000/svg"
                              d="M21.8944 11.5528C19.7362 7.23635 15.9031 5 12 5C8.09687 5 4.26379 7.23635 2.10557 11.5528C1.96481 11.8343 1.96481 12.1657 2.10557 12.4472C4.26379 16.7637 8.09687 19 12 19C15.9031 19 19.7362 16.7637 21.8944 12.4472C22.0352 12.1657 22.0352 11.8343 21.8944 11.5528ZM12 17C9.03121 17 5.99806 15.3792 4.12966 12C5.99806 8.62078 9.03121 7 12 7C14.9688 7 18.0019 8.62078 19.8703 12C18.0019 15.3792 14.9688 17 12 17Z"
                              fill="#1C1C1C"
                            ></path>
                          </svg>
                        )}
                      </span>

                      <span id="basic-addon2"></span>
                    </div>
                    <span className="span">Must be at least 8 characters.</span>
                  </div>
                  <div className="">
                    <label htmlFor="email" className="form-label mt-4">
                      Confirm Password
                    </label>
                    <div className="input-group mb-3 border-bottom border-dark">
                      <input
                        required
                        id="password"
                        type={eye1 ? "text" : "password"}
                        name="password"
                        className="form-control border-0"
                        placeholder="1234"
                      />

                      <span
                        onClick="password_show_hide();"
                        onClick={() => setEye1(!eye1)}
                      >
                        {!eye1 && (
                          <svg
                            width="22"
                            height="18"
                            viewBox="0 0 22 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 1.27L2.28 0L19 16.72L17.73 18L14.65 14.92C13.5 15.3 12.28 15.5 11 15.5C6 15.5 1.73 12.39 0 8C0.69 6.24 1.79 4.69 3.19 3.46L1 1.27ZM11 5C11.7956 5 12.5587 5.31607 13.1213 5.87868C13.6839 6.44129 14 7.20435 14 8C14 8.35 13.94 8.69 13.83 9L10 5.17C10.31 5.06 10.65 5 11 5ZM11 0.5C16 0.5 20.27 3.61 22 8C21.18 10.08 19.79 11.88 18 13.19L16.58 11.76C17.94 10.82 19.06 9.54 19.82 8C18.17 4.64 14.76 2.5 11 2.5C9.91 2.5 8.84 2.68 7.84 3L6.3 1.47C7.74 0.85 9.33 0.5 11 0.5ZM2.18 8C3.83 11.36 7.24 13.5 11 13.5C11.69 13.5 12.37 13.43 13 13.29L10.72 11C9.29 10.85 8.15 9.71 8 8.28L4.6 4.87C3.61 5.72 2.78 6.78 2.18 8Z"
                              fill="#1C1C1C"
                            />
                          </svg>
                        )}
                        {eye1 && (
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            height="24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              xmlns="http://www.w3.org/2000/svg"
                              d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                              fill="#1C1C1C"
                            ></path>
                            <path
                              xmlns="http://www.w3.org/2000/svg"
                              d="M21.8944 11.5528C19.7362 7.23635 15.9031 5 12 5C8.09687 5 4.26379 7.23635 2.10557 11.5528C1.96481 11.8343 1.96481 12.1657 2.10557 12.4472C4.26379 16.7637 8.09687 19 12 19C15.9031 19 19.7362 16.7637 21.8944 12.4472C22.0352 12.1657 22.0352 11.8343 21.8944 11.5528ZM12 17C9.03121 17 5.99806 15.3792 4.12966 12C5.99806 8.62078 9.03121 7 12 7C14.9688 7 18.0019 8.62078 19.8703 12C18.0019 15.3792 14.9688 17 12 17Z"
                              fill="#1C1C1C"
                            ></path>
                          </svg>
                        )}
                      </span>

                      <span id="basic-addon2"></span>
                    </div>
                  </div>

                  <div className="row my-5">
                    <div className="col-md-12">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="close">
                          <p>Close</p>
                        </div>
                        <div className="next_btn">
                          <button onClick={handleShow}>Submit</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <ResetPassModal show={show} onHide={() => handleClose()} />
      </div>
    </>
  );
}
