import React, { useCallback, useEffect, useState } from 'react';
import { bankDetails, get } from '../../Api Methods';
import { prjName } from '../../Config';
import { Skeleton } from '../../Components/Skeleton';
import { Toast } from '../../Utils';

export default function Bank() {
    const [bankContent, setBankContent] = useState(null);
    const [noData, setNoData] = useState(false);
    const [isLoading, setIsLoading] = useState({});
    const toast = Toast();

    const getBankData = useCallback(async () => {
        const bankData = await bankDetails();
        // if (!!bankData?.data) {
        //     const bankRes = bankData?.data;
        //     if (bankRes?.length === 0 || !(!!bankRes)) {
        //         setNoData(true);
        //     }
        //     setBankContent(bankRes);
        // } else {
        //     setNoData(true);
        //     setBankContent([]);
        // }

        if (!!bankData?.d) {
            const bankRes = JSON.parse(bankData?.d);
           
            if (bankRes?.length === 0 || !(!!bankRes)) {
                setNoData(true);
            }
            setBankContent(bankRes);
        } else {
            setNoData(true);
            setBankContent([]);
        }
    }, []);

    useEffect(() => {
        getBankData();
    }, []);

    const dataLoadedFn = (data) => {
        setIsLoading(data);
    };

   

    return (
        <div>
            <div className="main-cover">
                <div className="container a1">
                    <div className="bnk-cvr">
                        <div className="bank-cover">
                            <div className="container a1">
                                <div className="col-md-12">
                                    <div className="header">
                                        <div className="title-wth title-name">
                                            BANK DETAILS
                                            <div className="mn-title-border">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 a1">
                                    {!(!!isLoading?.bankContent) && !noData
                                        ? <Skeleton dependency={{ bankContent: bankContent }}
                                            isLoading={(data) => dataLoadedFn(data)} height='300px' />
                                        : <div id="DivBankRecord">
                                            <div className='row' style={{ display: (!(!!isLoading?.bankContent) && !(!!noData)) ? "none" : "" }}>
                                                {(!!bankContent && bankContent?.length > 0) ?
                                                    bankContent?.map((data, index) => (
                                                        <div className={`col-md-6 col-sm-6 mar-btm ${bankContent?.length < 2 ? "offset-md-3 offset-sm-3" : ""}`} key={index}>
                                                            <div className="bank-img">
                                                                <img
                                                                    src={data?.BankLogo}
                                                                    alt="Bank Logo"
                                                                    className="img-thumbnail" />
                                                                <div className="tg-contentbox">
                                                                    <table 
                                                                        width="100%"
                                                                        border={0}
                                                                        cellSpacing={0}
                                                                        cellPadding={0}
                                                                        className="bankd">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td className="ban1">
                                                                                    BANK NAME <span className="b_bott">:</span>
                                                                                </td>
                                                                                <td className="ban3">{data?.BranchName}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td className="ban1">
                                                                                    ACCOUNT NAME <span className="b_bott">:</span>
                                                                                </td>
                                                                                <td className="ban3">{data?.AccountName}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td className="ban1">
                                                                                    ACCOUNT NUMBER<span className="b_bott">:</span>
                                                                                </td>
                                                                                <td className="ban3">{data?.AccountNo}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td className="ban1">
                                                                                    IFSC CODE <span className="b_bott">:</span>
                                                                                </td>
                                                                                <td className="ban3">{data?.Ifsc}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td className="ban1">
                                                                                    BRANCH NAME <span className="b_bott">:</span>
                                                                                </td>
                                                                                <td className="ban3">{data?.BranchName}</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                    : (!!noData && (!(!!bankContent) || bankContent?.length === 0)) &&
                                                    <h1 className='text-center' style={{ color: '#fff', fontWeight: 500, background: 'black' }}>No Bank Details Found</h1>
                                                }
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6 responsive-bank"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
