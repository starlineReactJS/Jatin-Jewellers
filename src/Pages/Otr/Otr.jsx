import React, { useState } from 'react';
import './otr.css';
import logo from '../../Images/logo.png';
import { post } from '../../Api Methods';
import { prjName } from '../../Config';
import { Toast } from '../../Utils';

export default function Otr() {
    let toast = Toast();

    const otrObj = {
        name: "",
        firmname: "",
        mobile: "",
        city: "",
    };
    const [otrData, setOtrData] = useState(otrObj);

    let otrFetch = localStorage.getItem('otrDetails');
    // eslint-disable-next-line no-unused-vars
    otrFetch = JSON.parse(otrFetch);

    const validateFn = (value) => {
        let regex = /^\d{10}$/;
        return regex.test(value);
    };

    const otrFn = async () => {
        let dataObj = {
            "user": prjName,
            "name": otrData?.name,
            "firmname": otrData?.firmname,
            "mobile": otrData?.mobile,
            "city": otrData?.city
        };
        post(dataObj, "otrDetails").then((res) => {
            let { code, message } = res;
            if (code === 200) {
                window.location.href = "/";
                delete dataObj.user;
                localStorage.setItem('otrDetails', JSON.stringify(dataObj));
                clearFields();
            } else {
                toast.error(message);
            }

        }).catch((err) => {
            toast.error(`${err}`);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (otrData?.name === "") {
            toast.error("Enter Name");
            return;
        } else if (otrData?.firmname === "") {
            toast.error("Enter Firmname");
            return;
        } else if (!validateFn(otrData?.mobile) || otrData.mobile.charAt(0) === "0") {
            toast.error("Enter appropriate Number");
            return;
        } else if (otrData?.city === "") {
            toast.error("Enter City");
            return;
        }
        await otrFn();
    };

    const clearFields = () => {
        setOtrData(otrObj);
    };

    const onChangeFn = (field, value) => {
        let tempOtrData = { ...otrData };
        tempOtrData[field] = value;
        setOtrData(tempOtrData);
    };

    return (
        <div id="hdr" >
            <div className="" >
                <div className="bg-clr">
                    <div className="text-center lshide otrcvr" >
                        <img style={{ width: '150px' }} src={logo} alt='Logo' />
                    </div>
                    <div className="col-md-12">
                        <div className="registrationfont">ONE <span>TIME</span> REGISTRATION</div>
                    </div>
                    <div className="otr-maon-cover">
                        <form onSubmit={handleSubmit}>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <p>
                                    <input type="text" placeholder="Name" required name="name" id="txtotrName" fdprocessedid="eny25"
                                        value={otrData?.name}
                                        onChange={(e) => onChangeFn("name", e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleSubmit();
                                            }
                                        }}
                                    />
                                </p>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <p>
                                    <input type="text" placeholder="Firm Name" required name="usernamesignup" id="txtotrfirmName" fdprocessedid="cmou9c"
                                        value={otrData?.firmname}
                                        onChange={(e) => onChangeFn("firmname", e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleSubmit();
                                            }
                                        }}
                                    />
                                </p>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <p>
                                    <input type="text" maxLength={10} placeholder="Mobile Number" required name="usernamesignup" id="txtotrmobNumber" fdprocessedid="3j8sz"
                                        value={otrData?.mobile}
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
                                </p>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <p>
                                    <input type="text" placeholder="City" required name="usernamesignup" id="txtotrCity" fdprocessedid="1g9khb"
                                        value={otrData?.city}
                                        onChange={(e) => onChangeFn("city", e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleSubmit();
                                            }
                                        }}
                                    />
                                </p>
                            </div>
                            <div className="signin button text-center">
                                <button type="submit" className="btn_fill1" fdprocessedid="t5pvks">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}