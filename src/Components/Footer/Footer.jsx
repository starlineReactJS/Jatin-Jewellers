import React from 'react';
import { useSelector } from 'react-redux';
import sllogo from '../../Images/sl.png';
import { androidUrl, footerData, iosUrl } from '../../Config';
import android from '../../Images/android.png';
import ios from '../../Images/ios.png';

export default function Footer() {
    const clientData = useSelector((state) => state.clientDetails);
    return (
        <footer>
            <div id="ftr">
                <footer>
                    <div className="footer-cover">
                        {!!clientData[0]?.Marquee2 && <div className="header-top-marquee">
                            <div className="container-fluid">
                                <marquee className="marquee1" style={{ fontSize: '18px' }}>{clientData[0]?.Marquee2}</marquee>
                                {/* <marquee className="marquee1" style={{ fontSize: '14px' }}> WELECOME TO EVANNI BULLION AND JEWELLERS</marquee> */}

                            </div>
                        </div>}

                    </div>

                    <div className="">
                        <div className="container middel-footer">
                            <div className="row">
                                <div className="col-lg-4 col-md-4 align-self-center">
                                    <div className="cnt-cover">
                                        <h2><i className="fa fa-phone"></i>CONTACT NUMBER</h2>
                                        <p>{clientData[0]?.BookingNo1}
                                            {
                                                clientData[0]?.BookingNo2 && <> | {clientData[0]?.BookingNo2}</>
                                            }
                                        </p>

                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 align-self-center">
                                    <div className="cnt-cover">
                                        <div className="app-icon">
                                            <a href={iosUrl} target="_blank">
                                                <img src={ios} alt="" />
                                            </a>
                                            <a href={androidUrl} target="_blank">
                                                <img src={android} alt="" />

                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 align-self-center">
                                    <div className="cnt-cover">
                                        <h2><i className="fa fa-map-marker"></i>Address</h2>
                                        <p>
                                            <span className="bookingno1"> {clientData[0]?.Address_client}</span>

                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="cover-copyright">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6  ">
                                    <div className="cover-copyright-tittle">
                                        <h6>{footerData.copyright} </h6>
                                    </div>
                                </div>
                                <div className="col-md-6 ">
                                    <p className="footer-company-name text-right">
                                        <a className="starline" href="http://www.starlinetechno.net"
                                            target="_blank">{footerData.companyName} <img src={sllogo} /></a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </footer>
            </div>
        </footer>
    );
}
