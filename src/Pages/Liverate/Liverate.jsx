import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import pako from "pako";
import { Toast, backgroundColorClass, usePrevious, usePreviousReference } from '../../Utils';
import { Skeleton } from '../../Components/Skeleton';
import { SocketContext } from '../../Layout';

export default function Liverate() {
  let socketContext = useContext(SocketContext);
  const [maindata, setMainData] = useState(null);
  const [referenceProductData, setReferenceProductData] = useState([]);
  const clientdetails = useSelector((state) => state.clientDetails);
  const clientData = !!clientdetails?.length ? clientdetails : [];
  const previousMainProduct = usePrevious(!!maindata ? maindata : []);
  const referenceData = useSelector((state) => state.referanceDetails);
  const previousReferenceProductData = usePreviousReference(!!referenceProductData ? referenceProductData : []);
  const [adBannerDisplay, setAdBannerDisplay] = useState('block');
  let displayFutureRef = useRef({});
  let displayNextRef = useRef({});
  let displaySpot = useRef({});
  const toast = Toast();

  const [isLoading, setIsLoading] = useState({});
  const maindataRef = useRef({});
  const referenceDataRef = useRef({});

  const dataLoadedFn = (data, type) => {
    if (type === 'mainData') {
      maindataRef.current = data;
    } else if (type === 'referenceProductData') {
      referenceDataRef.current = data;
    }
    setIsLoading({ ...maindataRef.current, ...referenceDataRef.current });
  };

  // console.log('referenceProductData', referenceProductData)
  useEffect(() => {
    socketContext.on('message', function (data) {
      try {
        if (!!data) {
          setMainData([...data]);
        } else {
          setMainData([]);
        }
      } catch (error) {
        console.log(error);
      }
    });

    socketContext.on('Liverate', function (data) {
      try {
        if (!!data) {
          let referanceproducts = [];
          for (let i = 0; i < data?.length; i++) {
            let element = data[i];
            element = JSON.parse(element);
            referanceproducts.push(element);
          }
          if (!!referanceproducts) {
            setReferenceProductData([...referanceproducts]);
          } else {
            setReferenceProductData([]);
          }
        } else {
          setReferenceProductData([]);
        }
      } catch (error) {
        console.log(error);
      }
    });

    return () => {
      socketContext.off("message");
      socketContext.off("Liverate");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketContext]);

  let Ratedisplay = "none";
  let available = "none ";
  let isbuy;
  let issell;
  let ishigh;
  let islow;

  for (let data of clientData) {
    if (!!maindata && data?.RateDisplay === true && maindata?.length > 0) {
      Ratedisplay = 'block';
      available = 'none';
      if (data?.BuyRate === true) {
        isbuy = '';
      } else {
        isbuy = 'none';
      }
      if (data?.SellRate === true) {
        issell = '';
      } else {
        issell = 'none';
      }
      if (data?.HighRate === true) {
        ishigh = '';
      } else {
        ishigh = 'none';
      }
      if (data?.LowRate === true) {
        islow = '';
      } else {
        islow = 'none';
      }
    } else if ((!!maindata && maindata?.length < 1) || !data?.RateDisplay) {
      Ratedisplay = 'none';
      available = 'block';
    }
  }

  // Main product 
  const renderMainProduct = useMemo(() => {
    if (!previousMainProduct) return null;

    if (!!maindata && maindata?.length > 0) {
      // eslint-disable-next-line array-callback-return
      return maindata?.map((item, index) => {
        if ((item?.Source.toLowerCase() === "gold" || item?.Source.toLowerCase() === "silver")) {
          const bgAsk = backgroundColorClass(item?.Ask, previousMainProduct[index]?.Ask);
          const bgBid = backgroundColorClass(item?.Bid, previousMainProduct[index]?.Bid);

          return (
            <div className="content-cover" key={`maindata_${item?.name}`}>
              <table>
                <tbody>
                  <tr className="ligh-white">
                    <td className="product-name">
                      <div className="main-product-cover">
                        <h3>
                          {item?.Symbol}
                        </h3>
                        {/* <p style={{  color: '#000',  marginTop: '8px'}}> {item?.desc}</p> */}
                      </div>
                    </td>
                    <td className="product-rate bdr">
                      <div className="mn-rate-cover " style={{ display: isbuy === 'none' && islow === "none" ? "none" : "" }}>
                        <span className={`bgm ${bgBid}`} style={{ display: isbuy }}>
                          {item?.Bid}
                        </span>
                        <span className="bgs hl" style={{ display: islow }}>
                          L : {item?.Low}
                        </span>
                      </div>
                    </td>
                    <td className="product-rate bdr"
                      style={{ display: issell === 'none' && ishigh === "none" ? "none" : "" }}>
                      <div className="mn-rate-cover" >
                        <span className={`bgm ${bgAsk}`} style={{ display: issell }}>
                          {item?.Ask}
                        </span>
                        <span className="bgs hl" style={{ display: ishigh }}>
                          H : {item?.High}
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maindata]);


  //Future product
  const renderFutureProduct = useMemo(() => {
    if (!previousReferenceProductData) return null;
    if (!!referenceProductData && referenceProductData?.length > 0) {
      // eslint-disable-next-line array-callback-return
      return referenceProductData?.map((item, index) => {
        if (item?.symbol === "gold" || item?.symbol === "silver" || item?.symbol === "goldnext" || item?.symbol === "silvernext") {
          const referenceItem = !!referenceData
            ? referenceData?.find((val) => val?.Source === item?.symbol)
            : null;
          if (!(!!referenceItem) || !referenceItem?.IsDisplay) {
            displayFutureRef.current[item?.symbol] = false;
            return false;
          } else {
            displayFutureRef.current[item?.symbol] = true;
          }

          const bgAsk = backgroundColorClass(
            item?.Ask,
            previousReferenceProductData[index]?.Ask
          );

          const bgBid = backgroundColorClass(
            item?.Bid,
            previousReferenceProductData[index]?.Bid
          );

          let Symbol_Name;

          if (referenceItem?.Source === "gold" ||
            referenceItem?.Source === "silver"
            ||
            referenceItem?.Source === "goldnext" ||
            referenceItem?.Source === "silvernext"
          ) {
            Symbol_Name = referenceItem?.Symbol_Name;
          }

          return (

            <div className="col-md-12 col-sm-12 " key={`future_${Symbol_Name}`} style={{ display: !!referenceItem ? "block" : "none" }}>
              <div className="" id="divFuture">
                <div className="mrt">
                  <div className="pp">
                    <table>
                      <tbody>
                        <tr>
                          <td className="bs1 b1">
                            <span> {Symbol_Name}</span>
                          </td>
                          <td className="bs2 b2">
                            {/* <span className="e">46660</span> */}
                            <span className={`spt-rt  ${bgBid}`}>
                              {item?.Bid}
                            </span>
                          </td>
                          <td className="bs2 b2">
                            {/* <span className="e">46662</span> */}
                            <span className={`spt-rt ${bgAsk}`}>
                              {item?.Ask}
                            </span>
                          </td>
                          <td className="bs2 b2 one">
                            <span className="e">{' '}{item?.High}</span>
                          </td>
                          <td className="bs2 b2 one">
                            <span className="e"> {' '}{item?.Low}</span>

                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* <div className="mrt">
                    <div className="pp">
                      <table>
                        <tbody>
                          <tr>
                            <td className="bs1 b1">
                              <span>SILVER FUTURE</span>
                            </td>
                            <td className="bs2 b2">
                              <span className="h">60971</span>
                            </td>
                            <td className="bs2 b2">
                              <span className="e">60973</span>
                            </td>
                            <td className="bs2 b2 one">
                              <span className="e">61023</span>
                            </td>
                            <td className="bs2 b2 one">
                              <span className="e">60741</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div> */}
              </div>

            </div>


          );
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [referenceProductData]);
  // Next Product 
  const renderNextProduct = useMemo(() => {
    if (!previousReferenceProductData) return null;
    if (!!referenceProductData && referenceProductData?.length > 0) {
      // eslint-disable-next-line array-callback-return
      return referenceProductData?.map((item, index) => {
        // const referenceItem =  referenceData[index];
        if (item?.symbol === "goldnext" || item?.symbol === "silvernext") {
          const referenceItem = !!referenceData
            ? referenceData?.find((val) => val?.Source === item?.symbol)
            : null;
          if (!(!!referenceItem) || !referenceItem?.IsDisplay) {
            displayNextRef.current[item?.symbol] = false;
            return false;
          } else {
            displayNextRef.current[item?.symbol] = true;
          }
          const bgAsk = backgroundColorClass(
            item?.Ask,
            previousReferenceProductData[index]?.Ask
          );
          const bgBid = backgroundColorClass(
            item?.Bid,
            previousReferenceProductData[index]?.Bid
          );

          let Symbol_Name;

          if (
            referenceItem?.Source === "goldnext" ||
            referenceItem?.Source === "silvernext"
          ) {
            Symbol_Name = referenceItem?.Symbol_Name;
          }

          return (
            <div className="col-md-12 col-sm-12 " key={`next_${Symbol_Name}`} style={{ display: !!referenceItem ? "block" : "none" }}>
              <div className="" id="divFuture">
                <div className="mrt">
                  <div className="pp">
                    <table>
                      <tbody>
                        <tr>
                          <td className="bs1 b1">
                            <span> {Symbol_Name}</span>
                          </td>
                          <td className="bs2 b2">
                            <span className={`spt-rt  ${bgBid}`}>
                              {item?.Bid}
                            </span>
                          </td>
                          <td className="bs2 b2">
                            <span className={`spt-rt ${bgAsk}`}>
                              {item?.Ask}
                            </span>
                          </td>
                          <td className="bs2 b2 one">
                            <span className="e">{' '}{item?.High}</span>
                          </td>
                          <td className="bs2 b2 one">
                            <span className="e"> {' '}{item?.Low}</span>

                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

            </div>


          );
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [referenceProductData]);

  //Spot product 
  const renderSpotProduct = useMemo(() => {
    if (!previousReferenceProductData) return null;
    if (!!referenceProductData && referenceProductData?.length > 0) {
      // eslint-disable-next-line array-callback-return
      return referenceProductData?.map((item, index) => {
        // const referenceItem = !!referenceData ? referenceData[index] : []
        if (
          item?.symbol === "XAUUSD" ||
          item?.symbol === "XAGUSD" ||
          item?.symbol === "INRSpot"
        ) {
          const referenceItem = !!referenceData
            ? referenceData?.find((val) => val?.Source === item?.symbol)
            : null;
          if (!(!!referenceItem) || !referenceItem?.IsDisplay) {
            displaySpot.current[item?.symbol] = false;
            return false;
          } else {
            displaySpot.current[item?.symbol] = true;
          }
          const bgAsk = backgroundColorClass(
            item?.Ask,
            previousReferenceProductData[index]?.Ask
          );
          const bgBid = backgroundColorClass(
            item?.Bid,
            previousReferenceProductData[index]?.Bid
          );

          let Symbol_Name;

          if (
            referenceItem?.Source === "XAUUSD" ||
            referenceItem?.Source === "XAGUSD" ||
            referenceItem?.Source === "INRSpot"
          ) {
            Symbol_Name = referenceItem?.Symbol_Name;
          }
          return (

            <div className="col-md-12 col-sm-12 " key={`spot_${Symbol_Name}`} style={{ display: !!referenceItem ? "block" : "none" }}>
              <div className="" id="divFuture">
                <div className="mrt">
                  <div className="pp">
                    <table>
                      <tbody>
                        <tr>
                          <td className="bs1 b1">
                            <span> {Symbol_Name}</span>
                          </td>
                          <td className="bs2 b2">
                            <span className={`spt-rt  ${bgBid}`}>
                              {item?.Bid}
                            </span>
                          </td>
                          <td className="bs2 b2">
                            <span className={`spt-rt ${bgAsk}`}>
                              {item?.Ask}
                            </span>
                          </td>
                          <td className="bs2 b2 one">
                            <span className="e">{' '}{item?.High}</span>
                          </td>
                          <td className="bs2 b2 one">
                            <span className="e"> {' '}{item?.Low}</span>

                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

            </div>


          );
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [referenceProductData]);

  const handleAdBanner = () => {
    setAdBannerDisplay('none');
  };
  return (
    <div className="liverate-cover">
      <div className="container">
        {!!clientData[0]?.BannerWeb &&
          <div className="add-banner" style={{ display: adBannerDisplay }}>
            <div className="cross">
              <span className="close" onClick={handleAdBanner}>x</span>
            </div>
            <img id="advetiseImg" src={clientData[0]?.BannerWeb} alt="BannerWeb" loading='lazy' />
          </div>
        }
        <div className="row">
          <div className="col-md-12 mt-2 p-l-r">
            <div className="main-product">
              <h1 className='text-center' style={{ display: available === "block" && !!isLoading?.maindata ? "block" : "none", color: "#fff", textAlign: "center", padding: "8px", marginTop: "6px" }}>Live Rate currently not available.</h1>
              {!(!!isLoading?.maindata) ?
                <Skeleton dependency={{ maindata: maindata }} isLoading={(data) => dataLoadedFn(data, "mainData")} height='300px' />
                :
                <div style={{ display: Ratedisplay }}>
                  <div id="divHeader" style={{ display: !(!!isLoading?.maindata) ? "none" : "block" }}>
                    <div className="c-c">
                      <div className="m">
                        <table className="table">
                          <tbody>
                            <tr className='product-title-color'>
                              <td className="p-h p0">
                                <span>PRODUCT</span>
                              </td>
                              <td className="p-h ph">
                                <span style={{ display: isbuy === "none" ? "none" : "" }}>BUY</span>
                              </td>
                              <td className="p-h ph" style={{ display: issell === "none" ? "none" : "" }}>
                                <span>SELL</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      {!!isLoading?.maindata && renderMainProduct}
                    </div>
                  </div>
                </div>
              }

            </div>
          </div>

          <div className="col-md-12">
            <div className="main-product">
              {!(!!isLoading?.referenceProductData) ?
                <Skeleton dependency={{ referenceProductData: referenceProductData }}
                  isLoading={(data) => dataLoadedFn(data, "referenceProductData")}
                  height='200px' />
                : <div style={{ display: !Object.values(displayFutureRef.current).includes(true) ? "none" : "" }}>
                  <div style={{ display: !(!!isLoading?.referenceProductData) ? "none" : "block" }}>
                    <div className="row">
                      <div className="col-md-12 col-sm-12 mt-2" >
                        <div className="mheader" id="divFutureHd">
                          <div className="mheader" id="divSpotHd">
                            <table className="p-title-cover">
                              <tbody>
                                <tr>
                                  <td className="bs1 b1">
                                    <span>FUTURE</span>
                                  </td>
                                  <td className="bs2 b2">
                                    <span>BID</span>
                                  </td>
                                  <td className="bs2 b2">
                                    <span>ASK</span>
                                  </td>
                                  <td className="bs2 b2 two">
                                    <span>HIGH</span>
                                  </td>
                                  <td className="bs2 b2 two">
                                    <span>LOW</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      {renderFutureProduct}
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>

          <div className="col-md-12 col-sm-12 ">
            <div className="main-product prdc" id="DivSpotRate">

              {!(!!isLoading?.referenceProductData) ?
                <Skeleton dependency={{ referenceProductData: referenceProductData }}
                  isLoading={(data) => dataLoadedFn(data, "referenceProductData")} height='200px' />
                : <div style={{ display: !Object.values(displaySpot.current).includes(true) ? "none" : "" }}>
                  <div style={{ display: !(!!isLoading?.referenceProductData) ? "none" : "block" }}>
                    <div className="row">
                      <div className="col-md-12 col-sm-12 mt-2" >
                        <div className="mheader" id="divFutureHd">
                          <div className="mheader" id="divSpotHd">
                            <table className="p-title-cover">
                              <tbody>
                                <tr>
                                  <td className="bs1 b1">
                                    <span>SPOT</span>
                                  </td>
                                  <td className="bs2 b2">
                                    <span>BID</span>
                                  </td>
                                  <td className="bs2 b2">
                                    <span>ASK</span>
                                  </td>
                                  <td className="bs2 b2 two">
                                    <span>HIGH</span>
                                  </td>
                                  <td className="bs2 b2 two">
                                    <span>LOW</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      {renderSpotProduct}
                    </div>
                  </div>
                </div>
              }

            </div>
          </div>

          {/* <div className="col-md-6 col-sm-12 mt-2">
                <div className="main-product">

                  {!(!!isLoading?.referenceProductData) ?
                    <Skeleton dependency={{ referenceProductData: referenceProductData }}
                      isLoading={(data) => dataLoadedFn(data, "referenceProductData")}
                      height='200px' />
                    : <div
                      style={{
                        display: !Object.values(displayNextRef.current).includes(true) ? "none" : ""
                      }}>
                      <div style={{ display: !(!!isLoading?.referenceProductData) ? "none" : "block" }}>
                        <div className="row">
                          <div className="col-md-12 col-sm-12 mt-2" >

                            <div className="mheader" id="divFutureHd">
                              <div className="mheader" id="divSpotHd">
                                <table className="p-title-cover">
                                  <tbody>
                                    <tr>
                                      <td className="bs1 b1">
                                        <span>NEXT</span>
                                      </td>
                                      <td className="bs2 b2">
                                        <span>BID</span>
                                      </td>
                                      <td className="bs2 b2">
                                        <span>ASK</span>
                                      </td>
                                      <td className="bs2 b2 two">
                                        <span>HIGH</span>
                                      </td>
                                      <td className="bs2 b2 two">
                                        <span>LOW</span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>


                          </div>
                          {renderNextProduct}
                        </div>
                      </div>
                    </div>
                  }
                </div>

              </div> */}
        </div>
      </div>
    </div>

  );
}
