import React, { useCallback, useMemo, useRef, useState } from 'react';
import ContactData from '../../Components/Contact Data/ContactData';
import { useSelector } from 'react-redux';
import { prjName } from '../../Config';
import { feedbackDetails, post } from '../../Api Methods';
import { Toast } from '../../Utils';

export default function Feedback() {

    // Client Data Redux 
     let toast = Toast();
    // Client Data Redux 
    const clientdata = useSelector((state) => state.clientDetails);

    console.log("clientdata: ", clientdata);

    //Form Data states
    let dataRefObj = {
        address: [],
        number: [],
        email: [],
    };
    let dataRef = useRef({ ...dataRefObj });

    useMemo(() => {
        let tempData = { ...dataRefObj };

        if (!!clientdata && clientdata?.length > 0) {
            for (let i = 0; i < clientdata.length; i++) {
                let item = clientdata[i];
                for (const key in item) {
                    if (key?.includes("Address_client")) {
                        tempData.address.push(item[key]);
                    }
                    if (key?.includes("BookingNo")) {
                        tempData.number.push(item[key]);
                    }
                    if (key?.includes("Email")) {
                        tempData.email.push(item[key]);
                    }
                }
            }
            dataRef.current = { ...tempData };
        }
    }, [clientdata]);

    const feedbackDataObj = {
        name: "",
        email: "",
        mobile: "",
        sub: "",
        message: "",
    };
    const [feedbackData, setFeedbackData] = useState(feedbackDataObj);

    const validateFn = (type, value) => {
        let regex = type === "email" ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/ : (type === "mobile" && /^\d{10}$/);
        return regex.test(value);
    };

    // Form submit 

    const handleSubmit = useCallback(async () => {
        if (!validateFn("email", feedbackData?.email) || !validateFn("mobile", feedbackData?.mobile)) {
            toast.error("Enter appropriate Data");
            return;
        };
        let tempFeedbackDetails = await feedbackDetails(feedbackData);
        if (!!tempFeedbackDetails?.d) {
            toast.success("Thank you for your feedback");
            clearFields();
        }
    }
    );

    const clearFields = () => {
        setFeedbackData(feedbackDataObj);
    };

    const onChangeFn = (field, value) => {
        let tempFeedbackData = { ...feedbackData };
        tempFeedbackData[field] = value;
        setFeedbackData(tempFeedbackData);
    };

    return (
        <div>
            <div className="main-cover">
                <div className="container">
                    <div className="bnk-cvr">
                        <div className="bank-cover">
                            <div className="col-md-12">
                                <div className="header">
                                    <div className="title-wth title-name">
                                        CONTACT US
                                        <div className="mn-title-border">
                                            {/* <img src="images/border.png" alt=""> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="contact-cover">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="cnt-detail-cover">
                                            <ContactData
                                                icon="map"
                                                title="ADDRESS"
                                                detail={dataRef.current?.address}
                                            />
                                            <ContactData
                                                icon="phone"
                                                title="NUMBER"
                                                detail={dataRef.current?.number}
                                            />
                                            <ContactData
                                                icon="envelope"
                                                title="E-MAIL"
                                                detail={dataRef.current?.email}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="feedback-cover1">
                                            <div className="feedback-cover">
                                                <div className="cnt-title">
                                                    <h2>FEEDBACK FORM</h2>
                                                </div>
                                                <div className="cnt-rg-details">
                                                    <div className="for-img-look">
                                                        <div
                                                            id="contact-form"
                                                            name="contact_form"
                                                            className=""
                                                            action=""
                                                            method="post"
                                                        >
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="form_name">Name *</label>
                                                                        <input
                                                                            id="txtName"
                                                                            type="text"
                                                                            name="name"
                                                                            className="form-control"
                                                                            placeholder="Please enter your Name"
                                                                            required
                                                                            data-error="Firstname is required."
                                                                            value={feedbackData?.name}
                                                                            onChange={(e) => onChangeFn("name", e.target.value)}
                                                                            onKeyDown={(e) => {
                                                                                if (e.key === "Enter") {
                                                                                    handleSubmit();
                                                                                }
                                                                            }}
                                                                        />
                                                                        <div className="help-block with-errors" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="form_email">Email *</label>
                                                                        <input
                                                                            id="txtEmail"
                                                                            type="text"
                                                                            name="email"
                                                                            className="form-control"
                                                                            placeholder="Please enter your email"
                                                                            required
                                                                            data-error="Valid email is required."
                                                                            value={feedbackData?.email}
                                                                            onChange={(e) => onChangeFn("email", e.target.value)}
                                                                            onKeyDown={(e) => {
                                                                                if (e.key === "Enter") {
                                                                                    handleSubmit();
                                                                                }
                                                                            }}
                                                                        />
                                                                        <div className="help-block with-errors" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="form_phone">Phone *</label>
                                                                        <input
                                                                            id="txtPhone"
                                                                            type="text"
                                                                            name="phone"
                                                                            className="form-control"
                                                                            required
                                                                            maxLength={10}
                                                                            placeholder="Please enter your phone"
                                                                            value={feedbackData?.mobile}
                                                                            onChange={(e) => {
                                                                                const restrictDot = e.target.value.replace(/\D/g, '');
                                                                                onChangeFn("mobile", restrictDot);
                                                                            }}
                                                                            onKeyDown={(e) => {
                                                                                if (e.key === "Enter") {
                                                                                    handleSubmit();
                                                                                }
                                                                            }}
                                                                        />
                                                                        <div className="help-block with-errors" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label htmlFor="form_email">Subject</label>
                                                                        <input
                                                                            id="sub"
                                                                            type="text"
                                                                            name="email"
                                                                            className="form-control"
                                                                            placeholder="Please enter Subject"
                                                                            required
                                                                            data-error="Valid email is required."
                                                                            value={feedbackData?.sub}
                                                                            onChange={(e) => onChangeFn("sub", e.target.value)}
                                                                            onKeyDown={(e) => {
                                                                                if (e.key === "Enter") {
                                                                                    handleSubmit();
                                                                                }
                                                                            }}
                                                                        />
                                                                        <div className="help-block with-errors" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="form_message">Message *</label>
                                                                        <textarea
                                                                            id="message"
                                                                            name="message"
                                                                            className="form-control"
                                                                            placeholder="Message for me *"
                                                                            rows={4}
                                                                            required
                                                                            data-error="Please,leave us a message."
                                                                            value={feedbackData?.message}
                                                                            onChange={(e) => onChangeFn("message", e.target.value)}
                                                                            onKeyDown={(e) => {
                                                                                if (e.key === "Enter") {
                                                                                    handleSubmit();
                                                                                }
                                                                            }}
                                                                        />
                                                                        <div className="help-block with-errors" />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <div className="col-md-12 text-center">
                                                                        <input
                                                                            type="button"
                                                                            className="thm-btn bgclr-1"
                                                                            value="Submit"
                                                                            id="save"
                                                                            onClick={() => handleSubmit()}
                                                                            onKeyDown={(e) => {
                                                                                if (e.key === "Enter") {
                                                                                    handleSubmit();
                                                                                }
                                                                            }}
                                                                            // disabled={disableSubmitBtn}
                                                                            // style={{ backgroundColor: disableSubmitBtn ? "gray" : "", cursor: disableSubmitBtn ? "not-allowed" : "" }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
