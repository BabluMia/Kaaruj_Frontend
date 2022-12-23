import React, { useState } from "react";
import './style.css'
import { Modal} from 'react-bootstrap';
import verificationImg from './img/verification_code.svg';
import OtpInput from "react-otp-input";
import { useHistory } from "react-router-dom";

export default function VerificationCode({show,onHide}) {
    const [code, setCode] = useState("");
    const history = useHistory()

    const handleChange = (code) => setCode(code);
    
    return (
        <>
            <Modal
                size="xl"
                show={show}
                onHide={onHide}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body>
                   <div className="container">
                       <div className="row">
                           <div className="col-md-6">
                               <div className="verification_content">
                                   <h2 className="mt-5 mb-lg-5 mb-3">Enter verification code</h2>
                                   <p className="mb-5">We have just send a verification code to zakariya@gmail.com</p>
                                   <div className="otp_input mb-5">
                                       <OtpInput
                                           value={code}
                                           onChange={handleChange}
                                           numInputs={6}
                                           separator={<span style={{ width: "8px" }}></span>}
                                           isInputNum={true}
                                           shouldAutoFocus={true}
                                           inputStyle={{
                                               border: "1px solid transparent",
                                               background: "#F2F2F2",
                                               borderRadius: "8px",
                                               width: "6.5vh",
                                               height: "10vh",
                                               fontSize: "33px",
                                               color: "#212121",
                                               fontWeight: "600",
                                               caretColor: "#212121",
                                               className:"input_field"

                                           }}
                                           focusStyle={{
                                               border: "1px solid transparent",
                                               outline: "none"
                                           }}
                                       />
                                   </div>
                                   <p className="mb-5"><span>Send the code again</span></p>

                                   <div onClick={()=>history.push('/reset-password')} className="verify_btn pt-lg-3 pt-0 mb-lg-5 mb-0">
                                       <button>Verify</button>
                                   </div>


                               </div>
                           </div>
                           <div className="col-md-6">
                            <div className="verification_img d-none d-md-block">
                                <img src={verificationImg} alt="" className="img-fluid"/>
                            </div>
                           </div>
                       </div>
                   </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
