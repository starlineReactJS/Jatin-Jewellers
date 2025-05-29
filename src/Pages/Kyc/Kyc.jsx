import React, { useRef, useState } from 'react';
import './kyc.css';
import { post } from '../../Api Methods';
import { Toast } from '../../Utils';

const KYC = () => {
    let formDataObj = {
        companyName: "",
        companyAddress: "",
        name: "",
        partnerName: "",
        mobile: "",
        partnerMobile: "",
        officeMobile1: "",
        officeMobile2: "",
        residenceAddress: "",
        mail: "",
        bankName: "",
        branchName: "",
        accountNumber: "",
        ifsc: "",
        gstNumber: "",
        panNumber: "",
        reference: "",
        addressCopy: "",
        panCopy: "",
        gstCopy: "",
        partnershipCopy: "",
    };
    const [formData, setFormData] = useState({ ...formDataObj });
    const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);
    let toast = Toast();

    let addressCopyRef = useRef();
    let panCopyRef = useRef();
    let gstCopyRef = useRef();
    let partnershipCopyRef = useRef();

    const validateFn = (type, value) => {
        let regex = type === "mail" ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/ : (type === "mobile" && /^\d{10}$/);
        return regex.test(value);
    };

    const handleOnChange = (key, value) => {
        let copyFields = ["addressCopy", "panCopy", "gstCopy", "partnershipCopy"];
        let tempFormData = { ...formData };
        if (copyFields.includes(key) && !!value && value.target && value.target.files && !!value.target.files[0]) {
            var path = window.URL.createObjectURL(value.target.files[0]);
            tempFormData[key] = value.target.files[0];
            tempFormData[key]["path"] = path;
        } else {
            tempFormData[key] = value;
        }
        setFormData({ ...tempFormData });
    };

    const onSubmit = async () => {
        if (!disableSubmitBtn) {
            setDisableSubmitBtn(true);
            let isValid = true;
            if (!(!!formData?.name)) {
                toast.error("Please enter Name");
                isValid = false;
                setDisableSubmitBtn(false);
            }
            else if (!(!!formData?.mobile) || !validateFn("mobile", formData?.mobile) || formData?.mobile.charAt(0) === "0") {
                toast.error("Please enter Mobile");
                isValid = false;
                setDisableSubmitBtn(false);
            }
            else if (!!formData?.mail && !validateFn("mail", formData?.mail)) {
                toast.error("Please enter valid mail");
                isValid = false;
                setDisableSubmitBtn(false);
            }
            // if (!(!!addressCopyRef.current.value) || !(!!panCopyRef.current.value) || !(!!gstCopyRef.current.value) || !(!!partnershipCopyRef.current.value)) {
            //       toast.error("Please select files.");
            //     isValid = false;
            // }
            if (!!isValid) {
                post(formData, "kycDetails", true)
                    .then((res) => {
                        if (res?.code === 200) {
                            toast.success(res?.message);
                            setFormData(formDataObj);
                            addressCopyRef.current.value = "";
                            panCopyRef.current.value = "";
                            gstCopyRef.current.value = "";
                            partnershipCopyRef.current.value = "";
                        }
                        setDisableSubmitBtn(false);
                    }
                    );
            }
        }
    };

    return (
        <>
            <section className="kyc drive-cars-section">
                <center>
                    <span
                        id="lblmsg"
                        style={{ color: "green", textAlign: "center", display: "none" }}
                    />
                </center>
                <div className="container">
                    <div>
                        <p
                            align="right"
                            style={{ color: "#ff0000", fontFamily: "Comic Sans MS, Cursive" }}>
                            Fields in * are mandatory
                        </p>
                    </div>
                    <div className="pad_bottom" id="frmkyc">
                        <div className="title-field">Company Details</div>
                        <fieldset className="scheduler-border">
                            <div className="row">
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Company Name:</label>
                                        <input
                                            name="txtCompany1"
                                            type="text"
                                            id="txtCompany1"
                                            className="form-control"
                                            placeholder="Company Name"
                                            value={formData?.companyName}
                                            onChange={(e) => handleOnChange("companyName", e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    onSubmit();
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Address:</label>
                                        <textarea
                                            name="txtAddress"
                                            rows={2}
                                            cols={20}
                                            id="txtAddress"
                                            className="form-control"
                                            placeholder="Company Address"
                                            value={formData?.companyAddress}
                                            onChange={(e) => handleOnChange("companyAddress", e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    onSubmit();
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <div className="clearfix" />
                        <legend className="title-field"> Proprietor/Partners</legend>
                        <fieldset className="scheduler-border">
                            <div className="row">
                                <div className="col-md-6 col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">
                                            Name1<span style={{ color: "red" }}>*</span>:
                                        </label>
                                        <input
                                            name="txtName1"
                                            type="text"
                                            id="txtName1"
                                            className="form-control"
                                            placeholder="Enter Name"
                                            value={formData?.name}
                                            onChange={(e) => handleOnChange("name", e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    onSubmit();
                                                }
                                            }}
                                        />
                                        <span
                                            id="RequiredFieldValidator1"
                                            autopostback="false"
                                            style={{ color: "Red", fontFamily: "Calibri", display: "none" }}>
                                            Name Required
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">
                                            Mobile1<span style={{ color: "red" }}>*</span>:
                                        </label>
                                        <input
                                            name="txtMobile1"
                                            type="text"
                                            id="txtMobile1"
                                            className="form-control"
                                            placeholder="Enter Mobile"
                                            maxLength={10}
                                            value={formData?.mobile}
                                            onChange={(e) => {
                                                const restrictDot = e.target.value.replace(/\D/g, '');
                                                handleOnChange("mobile", restrictDot);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    onSubmit();
                                                }
                                            }}
                                        />
                                        <span
                                            id="RequiredFieldValidator2"
                                            autopostback="false"
                                            style={{ color: "Red", fontFamily: "Calibri", display: "none" }}
                                        >
                                            Mobile Required
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Name2:</label>
                                        <input
                                            name="txtName2"
                                            type="text"
                                            id="txtName2"
                                            className="form-control"
                                            placeholder="Enter Name"
                                            value={formData?.partnerName}
                                            onChange={(e) => handleOnChange("partnerName", e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    onSubmit();
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Mobile2:</label>
                                        <input
                                            name="txtMobile2"
                                            type="text"
                                            id="txtMobile2"
                                            className="form-control"
                                            placeholder="Enter Mobile"
                                            maxLength={10}
                                            value={formData?.partnerMobile}
                                            onChange={(e) => {
                                                const restrictDot = e.target.value.replace(/\D/g, '');
                                                handleOnChange("partnerMobile", restrictDot);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    onSubmit();
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <div className="clearfix" />
                        <legend className="title-field"> Phone No</legend>
                        <fieldset className="scheduler-border">
                            <div className="row">
                                <div className="col-md-6 col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Office1:</label>
                                        <input
                                            name="txtOffice1"
                                            type="text"
                                            id="txtOffice1"
                                            className="form-control"
                                            placeholder="Enter Office Number"
                                            maxLength={10}
                                            value={formData?.officeMobile1}
                                            onChange={(e) => {
                                                const restrictDot = e.target.value.replace(/\D/g, '');
                                                handleOnChange("officeMobile1", restrictDot);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    onSubmit();
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Office2:</label>
                                        <input
                                            name="txtOffice2"
                                            type="text"
                                            id="txtOffice2"
                                            className="form-control"
                                            placeholder="Enter Office Number"
                                            maxLength={10}
                                            value={formData?.officeMobile2}
                                            onChange={(e) => {
                                                const restrictDot = e.target.value.replace(/\D/g, '');
                                                handleOnChange("officeMobile2", restrictDot);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    onSubmit();
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Residence:</label>
                                        <input
                                            name="txtResidence"
                                            type="text"
                                            id="txtResidence"
                                            className="form-control"
                                            placeholder="Enter Residence"
                                            value={formData?.residenceAddress}
                                            onChange={(e) => handleOnChange("residenceAddress", e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    onSubmit();
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email:</label>
                                        <input
                                            name="txtEmail"
                                            type="text"
                                            id="txtEmail"
                                            className="form-control"
                                            placeholder="Enter Email"
                                            value={formData?.mail}
                                            onChange={(e) => handleOnChange("mail", e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    onSubmit();
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <div className="clearfix" />
                        <legend className="title-field"> Bank Details</legend>
                        <fieldset className="scheduler-border">
                            <div className="row">
                                <div className="col-md-6 col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Name:</label>
                                        <input
                                            name="txtBankName"
                                            type="text"
                                            id="txtBankName"
                                            className="form-control"
                                            placeholder="Enter Name"
                                            value={formData?.bankName}
                                            onChange={(e) => handleOnChange("bankName", e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    onSubmit();
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Branch:</label>
                                        <input
                                            name="txtBranch"
                                            type="text"
                                            id="txtBranch"
                                            className="form-control"
                                            placeholder="Enter Branch"
                                            value={formData?.branchName}
                                            onChange={(e) => handleOnChange("branchName", e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    onSubmit();
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Account Number:</label>
                                        <input
                                            name="txtAccountNumber"
                                            type="text"
                                            id="txtAccountNumber"
                                            className="form-control"
                                            placeholder="Enter Account Number"
                                            value={formData?.accountNumber}
                                            onChange={(e) => {
                                                const restrictDot = e.target.value.replace(/\D/g, '');
                                                handleOnChange("accountNumber", restrictDot);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    onSubmit();
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">IFSC Code:</label>
                                        <input
                                            name="txtIFSCCode"
                                            type="text"
                                            id="txtIFSCCode"
                                            className="form-control"
                                            placeholder="Enter IFSC Code"
                                            value={formData?.ifsc}
                                            onChange={(e) => handleOnChange("ifsc", e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    onSubmit();
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">GST No:</label>
                                        <input
                                            name="txtGSTNo"
                                            type="text"
                                            id="txtGSTNo"
                                            className="form-control"
                                            placeholder="Enter GST No."
                                            value={formData?.gstNumber}
                                            onChange={(e) => handleOnChange("gstNumber", e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    onSubmit();
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">PAN No:</label>
                                        <input
                                            name="txtPANNo"
                                            type="text"
                                            id="txtPANNo"
                                            className="form-control"
                                            placeholder="Enter PAN No."
                                            value={formData?.panNumber}
                                            onChange={(e) => handleOnChange("panNumber", e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    onSubmit();
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Reference:</label>
                                        <input
                                            name="txtReference"
                                            type="text"
                                            id="txtReference"
                                            className="form-control"
                                            placeholder="Enter Reference"
                                            value={formData?.reference}
                                            onChange={(e) => handleOnChange("reference", e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    onSubmit();
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <div className="clearfix" />
                        <legend className="title-field"> Documents Required</legend>
                        <fieldset className="scheduler-border">
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">
                                        1 Address Proof Scan Copy:
                                    </label>
                                    <input type="file" name="fuAddress" id="fuAddress"
                                        ref={addressCopyRef}
                                        onChange={(e) => handleOnChange("addressCopy", e)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                onSubmit();
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">2. Pan No Scan Copy:</label>
                                    <input type="file" name="fuPANNo" id="fuPANNo"
                                        ref={panCopyRef}
                                        onChange={(e) => handleOnChange("panCopy", e)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                onSubmit();
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">3. GST No Scan Copy:</label>
                                    <input type="file" name="fuGSTNo" id="fuGSTNo"
                                        ref={gstCopyRef}
                                        onChange={(e) => handleOnChange("gstCopy", e)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                onSubmit();
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">
                                        4. Partnership Deed Copy:
                                    </label>
                                    <input type="file" name="fuPartnership" id="fuPartnership"
                                        ref={partnershipCopyRef}
                                        onChange={(e) => handleOnChange("partnershipCopy", e)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                onSubmit();
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </fieldset>
                        <div className="clearfix" />
                        <div
                            id="msgForSubmit"
                            className="alert alert-success alert-autocloseable-success"
                            style={{ display: "none" }}
                        />
                        <div
                            style={{
                                display: "block",
                                textAlign: "center",
                                float: "left",
                                width: "100%"
                            }}
                        >
                            <input
                                type="submit"
                                name="btnKycRegister"
                                defaultValue="SUBMIT"
                                id="btnKycRegister"
                                className="kyc-btn pull-right"
                                disabled={disableSubmitBtn}
                                onClick={() => onSubmit()}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        onSubmit();
                                    }
                                }}
                                style={{ background: disableSubmitBtn ? 'gray' : '' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default KYC;