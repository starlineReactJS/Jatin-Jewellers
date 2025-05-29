import React, { useContext, useEffect } from 'react';
import pako from "pako";
import { useDispatch } from 'react-redux';
import { setClientData, setPopup, setReferanceData } from './Redux/reducers';
import { SocketContext } from './Layout';
import { Toast } from './Utils';
import { prjName } from './Config';

export default function Socket() {
    let socketContext = useContext(SocketContext);
    const dispatch = useDispatch();
    const toast = Toast();
    useEffect(() => {
        socketContext.on('connect', function () {
            socketContext.emit('room', prjName);
            socketContext.emit('Client', prjName);
        });

        // socketContext.on("alertDetails", function (data) {
        //     try {
        //         if (!!data) {
        //             var popup = pako.inflate(data, { to: 'string' });
        //             var popupData = JSON.parse(popup);
        //             if (!!popupData) {
        //                 dispatch(setPopup(popupData));
        //             } else {
        //                 dispatch(setPopup([]));
        //             }
        //         } else {
        //             dispatch(setPopup([]));
        //         }
        //     } catch (error) {
        //         console.log(error);
        //     }
        // });

        socketContext.on('ClientHeaderDetails', function (data) {
            try {
                // if (!!data) {
                //     var strLiveRates = pako.inflate(data, { to: 'string' });
                //     var clientDetails = JSON.parse(strLiveRates);
                //     if (!!clientDetails) {
                //         dispatch(setClientData(clientDetails));
                //     } else {
                //         dispatch(setClientData([]));
                //     }
                // } else {
                //     dispatch(setClientData([]));
                // }

                if (data?.MessageType === "Header") {
                    if (!!data) {
                        // var strLiveRates = pako.inflate(data, { to: 'string' });
                        var clientDetails = [JSON.parse(data?.Data)[0]];
                        if (!!clientDetails) {
                            dispatch(setClientData(clientDetails));
                        }
                        else {
                            dispatch(setClientData([]));
                        }
                    } else {
                        dispatch(setClientData([]));
                    }
                } else if (data?.MessageType === "Notification") {
                    if (!!data) {
                        // var popup = pako.inflate(data, { to: 'string' });
                        var popupData = JSON.parse(data?.Data);
                        popupData.user = data?.User;
                        if (!!popupData) {
                            dispatch(setPopup(popupData));
                        } else {
                            dispatch(setPopup([]));
                        }
                    } else {
                        dispatch(setPopup([]));
                    }
                }
            } catch (error) {
                console.log(error);
            }
        });

        socketContext.on('ClientData', function (data) {
            try {
                // if (!!data) {
                //     var refereancedata = pako.inflate(data, { to: 'string' });
                //     var referancedetails = JSON.parse(refereancedata);
                //     if (!!referancedetails) {
                //         dispatch(setReferanceData(referancedetails));
                //     } else {
                //         dispatch(setReferanceData([]));
                //     }
                // } else {
                //     dispatch(setReferanceData([]));
                // }

                if (!!data) {
                    // var refereancedata = pako.inflate(data, { to: 'string' });
                    var referancedetails = JSON.parse(data);
                    if (!!referancedetails) {
                        dispatch(setReferanceData(referancedetails));
                    } else {
                        dispatch(setReferanceData([]));
                    }
                } else {
                    dispatch(setReferanceData([]));
                }
            } catch (error) {
                console.log(error);
            }
        });

    }, []);
    return (
        <div>

        </div>
    );
}
