import React, { useState } from "react";
import './style.css'
import rightArrowImg from '../resetpass/img/right_arrow.svg'
import { Modal} from 'react-bootstrap';
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
                {/*<Modal.Header closeButton>*/}
                {/*</Modal.Header>*/}

                <Modal.Body>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="reset_pass_modal_content text-center">
                                    <img src={rightArrowImg} alt="" className="img-fluid my-5"/>
                                    <h2>Successfully password reset!</h2>
                                    <p className="mb-5 mt-4">Your password has been successfully  reset <br/>Click below to log in magically</p>
                                    <div onClick={()=>history.push('/')} className="reset_login_btn mb-5 pt-lg-5 pt-0 text-center">
                                        <button>Login</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
