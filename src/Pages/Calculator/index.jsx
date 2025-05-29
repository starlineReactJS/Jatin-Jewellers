import React, { useEffect, useState } from 'react';
import './style.css';

const Calculator = () => {

    const [metalType, setMetalType] = useState("gold");
    const [unit, setUnit] = useState("");

    let calcTypeObj = {
        "tds": false,
        "tcs": false,
    };
    const [calcType, setCalcType] = useState({ ...calcTypeObj, tds: true });

    let calcRowObj = {
        "weight": 0,
        "percentage": 0.1,
        "rate": 0,
        "payable": 0
    };
    const [calcRow, setCalcRow] = useState([calcRowObj]);

    let calcResultObj = {
        "totalWeight": 0,
        "totalAmount": 0,
        "totalGST": 0,
        "totalPayable": 0
    };
    const [calcResult, setCalcResult] = useState({ ...calcResultObj });

    const handleCalcType = (type, value) => {
        let tempCalcType = { ...calcTypeObj };
        tempCalcType[type] = value;
        setCalcType({ ...tempCalcType });
    };

    // const addRow = () => {
    //     let tempCalcRow = [...calcRow];
    //     tempCalcRow.push(calcRowObj);
    //     setCalcRow([...tempCalcRow]);
    // };

    // const deleteRow = (index) => {
    //     let tempCalcRow = [...calcRow];
    //     tempCalcRow.splice(index, 1);
    //     setCalcRow([...tempCalcRow]);
    // };


    const addDel = (index = null, type = "") => {
        let tempCalcRow = [...calcRow];
        if (index && type) {
            tempCalcRow.splice(index, 1);
        } else {
            tempCalcRow.push({ ...calcRowObj });
        }
        setCalcRow(tempCalcRow);
    };

    const handleInputChange = (type, value, index) => {
        let tempCalcRow = [...calcRow];
        tempCalcRow[index][type] = value;
        if (metalType === "gold") {
            tempCalcRow[index]["payable"] = (parseFloat(tempCalcRow[index]["weight"]) * (parseFloat(tempCalcRow[index]["rate"]) / 10)).toFixed(2);
        } else {
            tempCalcRow[index]["payable"] = (parseFloat(tempCalcRow[index]["weight"]) * parseFloat(tempCalcRow[index]["rate"])).toFixed(2);
        }
        tempCalcRow[index]["payable"] = !!parseFloat(tempCalcRow[index]["payable"]) ? parseFloat(tempCalcRow[index]["payable"]) : 0;
        setCalcRow([...tempCalcRow]);
    };

    const calculate = () => {
        let tempResult = calcRow.reduce((acc, curr) => {
            acc["totalWeight"] += !!parseFloat(curr?.weight) ? parseFloat(curr?.weight) : 0;
            acc["totalAmount"] += !!parseFloat(curr?.payable) ? parseFloat(curr?.payable) : 0;
            return acc;
        }, { "totalWeight": 0, "totalAmount": 0 });
        let tempCalcResult = { ...calcResult };
        tempCalcResult.totalAmount = !!tempResult?.totalAmount ? tempResult?.totalAmount : 0;
        tempCalcResult.totalWeight = !!tempResult?.totalWeight ? tempResult?.totalWeight : 0;
        if (!!calcType?.tds) {
            tempCalcResult.totalGST = ((tempCalcResult?.totalAmount / 1.03) * 0.001).toFixed(2);
            tempCalcResult.totalPayable = (tempCalcResult?.totalAmount - parseFloat(tempCalcResult?.totalGST)).toFixed(2);
        } else {
            tempCalcResult.totalGST = (tempCalcResult?.totalAmount * 0.001).toFixed(2);
            tempCalcResult.totalPayable = (tempCalcResult?.totalAmount + parseFloat(tempCalcResult?.totalGST)).toFixed(2);
        }
        setCalcResult(tempCalcResult);
    };

    useEffect(() => {
        setUnit(metalType === "gold" ? "GM" : "KG");
        let tempCalcRow = [...calcRow];
        tempCalcRow?.forEach((item) => {
            if (metalType === "gold") {
                item["payable"] = parseFloat(item["weight"]) * (parseFloat(item["rate"]) / 10);
            } else {
                item["payable"] = parseFloat(item["weight"]) * parseFloat(item["rate"]);
            }
            item["payable"] = !!item["payable"] ? item["payable"] : 0;
        });
        setCalcRow([...tempCalcRow]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [metalType]);

    useEffect(() => {
        if (!!calcRow && calcRow?.length > 0) {
            calculate();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [calcRow, calcType]);

    return (
        <div className="main-cover">
            <div className="container">
                <div className="bnk-cvr">
                    <div className="bank-cover">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="header">
                                    <div className="title-wth title-name">CALCULATOR</div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <ul className="nav nav-pills actab mb-3" id="pills-tab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="pills-home-tab Gold" data-toggle="pill"
                                            href="#pills-home" role="tab" aria-controls="pills-home" value="gold"
                                            aria-selected="true" onClick={(e) => setMetalType("gold")}>Gold</a>
                                    </li>
                                    <li className="nav-item ">
                                        <a className="nav-link Silver"
                                            id="pills-profile-tab" data-toggle="pill"
                                            href="#pills-profile" role="tab" aria-controls="pills-profile" value="silver"
                                            aria-selected="false" onClick={(e) => setMetalType("silver")}>Silver</a>
                                    </li>
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                                        aria-labelledby="pills-home-tab">
                                        <div className="calculator-cover">
                                            <div className="">
                                                <div className="radio-tab-main-cover">
                                                    <div className="radio-section">
                                                        <div className="row">
                                                            <div className="col-md-2">
                                                                <div className='flex-for-radio'>
                                                                    <input style={{ marginRight: '10px' }} id="tds" type="radio" name="tab1"
                                                                        checked={calcType?.tds}
                                                                        onChange={(e) => handleCalcType("tds", e.target.checked)} />
                                                                    <label htmlFor="tds">TDS Calculator</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-1"></div>
                                                            <div className="col-md-2">
                                                                <div className='flex-for-radio'>
                                                                    <input id="tcs" style={{ marginRight: '10px' }} type="radio" name="tab2"
                                                                        checked={calcType?.tcs}
                                                                        onChange={(e) => handleCalcType("tcs", e.target.checked)} />
                                                                    <label htmlFor="tcs">TCS Calculator</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="cal-tabel">
                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>Weight</th>
                                                                    <th className="unit"></th>
                                                                    <th><span className="textdiff">{!!calcType?.tcs ? "TCS" : "TDS"}</span>(%)</th>
                                                                    <th>Rate(<i className="fa fa-rupee"></i>)</th>
                                                                    <th>Payable</th>
                                                                    <th>option</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id="printdata">
                                                                {
                                                                    calcRow?.length > 0 && calcRow?.map((item, index) => {
                                                                        return (
                                                                            <tr key={index}>
                                                                                <td>
                                                                                    <input id="weight" type="number" value={item?.weight}
                                                                                        onKeyDown={(e) => {
                                                                                            if (['e', 'E', '+', '-'].includes(e.key)) {
                                                                                                e.preventDefault();
                                                                                            }
                                                                                        }}
                                                                                        onChange={(e) => handleInputChange("weight", e.target.value, index)}
                                                                                    />
                                                                                </td>
                                                                                <td><span className="WeightUnit" id="WeightUnit">{unit}</span></td>
                                                                                <td><label>{item?.percentage}</label></td>
                                                                                <td>
                                                                                    <input id="rate" type="number" value={item?.rate}
                                                                                        onKeyDown={(e) => {
                                                                                            if (['e', 'E', '+', '-'].includes(e.key)) {
                                                                                                e.preventDefault();
                                                                                            }
                                                                                        }}
                                                                                        onChange={(e) => handleInputChange("rate", e.target.value, index)}
                                                                                    />
                                                                                </td>
                                                                                <td><label id="result">{item?.payable}</label></td>
                                                                                <td>
                                                                                    <div className="del_btn" value="Delete">
                                                                                        {
                                                                                            calcRow?.length > 1 &&
                                                                                            <i className="fa fa-trash" onClick={() => addDel(index, 'del')}></i>
                                                                                        }
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        );
                                                                    })
                                                                }
                                                            </tbody>
                                                        </table>
                                                        <div id="room_fileds"></div>
                                                        <div className="add-button">
                                                            <button type="button" id="addRow"
                                                                onClick={() => addDel()}
                                                                value="">Add More</button>
                                                        </div>
                                                        <div className="calculate-section">
                                                            <table className="table">
                                                                <tbody>
                                                                    <tr>
                                                                        <td>Total Weight <span className="saperate">:</span></td>
                                                                        <td><label id="totalWeight">{calcResult?.totalWeight}</label></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Total Amount <span className="saperate">:</span></td>
                                                                        <td><label id="totalAmount">{calcResult?.totalAmount}</label></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Total <span className="textdiff">TDS</span><span className="saperate">:</span></td>
                                                                        <td><i className="fa fa-rupee" id="result2"></i>{calcResult?.totalGST}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Payable <span className="saperate">:</span></td>
                                                                        <td><label id="payable">{calcResult?.totalPayable}</label></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
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
            </div >
        </div >
    );
};

export default Calculator;
