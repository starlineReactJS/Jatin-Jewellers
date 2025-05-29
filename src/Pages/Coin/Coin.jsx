import React, { useContext, useEffect, useMemo, useState } from 'react';
import pako from "pako";
import { useSelector } from 'react-redux';
import { Skeleton } from '../../Components/Skeleton';
import goldC from "../../Images/goldc.png";
import silverC from "../../Images/silverc.png";
import { SocketContext } from '../../Layout';
import { coinImgUrl, hasViewBtn } from '../../Config';
import { backgroundColorClass, usePrevious } from '../../Utils';

const Coin = () => {
    let socketContext = useContext(SocketContext);
    const clientData = useSelector(state => state.clientDetails);
    const [coinData, setCoinData] = useState(null);
    const [coinImage, setCoinImage] = useState("");
    const previousCoindata = usePrevious(!!coinData ? coinData : []);
    const [goldDisplay, setGoldDisplay] = useState('');
    const [silverDisplay, setSilverDisplay] = useState('');

    useEffect(() => {
        socketContext.on('coinProducts', function (data) {
            try {
                if (!!data) {
                    var strLiveRates = pako.inflate(data, { to: 'string' });
                    var coinproducts = JSON.parse(strLiveRates);
                    if (!!coinproducts) {
                        setCoinData([...coinproducts]);
                    } else {
                        setCoinData([]);
                    }
                } else {
                    setCoinData([]);
                }
            } catch (error) {
            }
        });
        return () => {
            socketContext.off("coinProducts");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [isLoading, setIsLoading] = useState({});

    let coinRateDisplay;
    let availableMsg = 'none';

    for (let data of clientData) {
        if (!!coinData && data?.isCoin === true && coinData?.length > 0) {
            coinRateDisplay = 'block';
            availableMsg = 'none';

        } else if ((!!coinData && coinData?.length < 1) || !data?.isCoin) {
            coinRateDisplay = 'none';
            availableMsg = 'block';
        }
    }

    const renderGoldCoin = useMemo(() => {
        if (!previousCoindata) return null;

        if (!!coinData) {
            // eslint-disable-next-line array-callback-return
            return coinData?.length > 0 && coinData?.map((data, index) => {
                if (data?.src === "gold") {
                    const bgAsk = backgroundColorClass(data?.ask, previousCoindata[index]?.ask);
                    return (
                        <div className="pn rat" key={data?.id}>
                            <span className="l-w">
                                <img src={goldC} alt="" />{data?.name}
                            </span>
                            <span className={`text-center r-w ${bgAsk}`} style={{ width: hasViewBtn ? '20%' : '40%' }}>
                                <i className="fa fa-inr" /> {data?.ask}
                            </span>
                            {hasViewBtn &&
                                <span className={`text-center r-w `}>
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <button className="viewbtn" data-toggle="modal" data-target="#exampleModal"
                                        onClick={() => setCoinImage(!!data?.img ? `${coinImgUrl}${data?.img}?${Math.random()}` : "")}>
                                        view
                                    </button>
                                </span>
                            }
                        </div>
                    );
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coinData]);

    const renderSilverCoin = useMemo(() => {
        if (!previousCoindata) return null;
        if (!!coinData) {
            // eslint-disable-next-line array-callback-return
            return coinData?.length > 0 && coinData?.map((data, index) => {
                if (data?.src === "silver") {
                    const bgAsk = backgroundColorClass(data?.ask, previousCoindata[index]?.ask);
                    return (
                        <div className="pn rat" key={data?.id}>
                            <span className="l-w">
                                <img src={silverC} alt="" />{data?.name}
                            </span>
                            <span className={`text-center r-w ${bgAsk}`} style={{ width: hasViewBtn ? '20%' : '40%' }}>
                                <i className="fa fa-inr" /> {data?.ask}
                            </span>
                            {hasViewBtn && <span className={`text-center r-w `}>
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <button className="viewbtn" data-toggle="modal" data-target="#exampleModal"
                                    onClick={() => setCoinImage(!!data?.img ? `${coinImgUrl}${data?.img}?${Math.random()}` : "")}>
                                    view
                                </button>
                            </span>}
                        </div>
                    );
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coinData]);

    const dataLoadedFn = (data) => {
        setIsLoading(data);
    };


    useEffect(() => {

        if (!(coinData?.map(item => item?.src).includes("silver"))) {
            setSilverDisplay('none');
        } else {
            setSilverDisplay('block');
        }
        if (!(coinData?.map(item => item?.src).includes("gold"))) {
            setGoldDisplay('none');
        } else {
            setGoldDisplay('block');
        }
    }, [coinData]);

    return (
        <div className="main-cover">
            <div className="container">
                <div className="bnk-cvr">
                    <div className="">
                        <div className="header">
                            <div className="title-wth title-name">COINS</div>
                        </div>
                        <h1 className='text-center' style={{ display: availableMsg, color: "#000", textAlign: "center", background: "#fff", padding: "8px", }}>Coin Rate currently not available.</h1>
                        {!(!!isLoading?.coinData)
                            ? <Skeleton dependency={{ coinData: coinData }} isLoading={(data) => dataLoadedFn(data)} height='300px' />
                            :
                            <div style={{ display: coinRateDisplay }}>
                                <div id="" style={{ display: !(!!isLoading?.coinData) ? "none" : "block" }}>
                                    <div className="coin-cover">
                                        <div className="row">
                                            <div className="col-md-6" id="goldcoin">
                                                <div className="lf-cvr">
                                                    <div className="pn head" style={{ display: goldDisplay }}>
                                                        {" "}
                                                        <span style={{ display: "inline-block" }} className="l-w">
                                                            <span
                                                                style={{ display: "inline-block", textAlign: "left" }} >
                                                                {" "}
                                                                Gold Coin{" "}
                                                            </span>{" "}
                                                        </span>{" "}
                                                        <span
                                                            style={{ display: "inline-block", width: hasViewBtn ? "20%" : "40%" }}
                                                            className="text-center r-w">
                                                            PRICE
                                                        </span>
                                                    </div>
                                                    <div>
                                                        {!!isLoading?.coinData && renderGoldCoin}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6" id="silvercoin">
                                                <div className="lf-cvr">
                                                    <div className="pn head" style={{ display: silverDisplay }}>
                                                        {" "}
                                                        <span style={{ display: "inline-block" }} className="l-w">
                                                            <span
                                                                style={{ display: "inline-block", textAlign: "left" }}
                                                            >
                                                                Silver Coin
                                                            </span>
                                                        </span>{" "}
                                                        <span
                                                            style={{ display: "inline-block", width: hasViewBtn ? "20%" : "40%" }}
                                                            className="text-center r-w">
                                                            PRICE
                                                        </span>
                                                    </div>
                                                    <div>
                                                        {!!isLoading?.coinData && renderSilverCoin}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="modal" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
                            <h5 className="modal-title" id="exampleModalLabel"></h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true" onClick={() => setCoinImage("")}>×</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="view-image-cover">
                                {
                                    coinImage ?
                                        <img src={coinImage} alt='Coin' loading='lazy'></img>
                                        : <h5>No Image Available</h5>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Coin;
