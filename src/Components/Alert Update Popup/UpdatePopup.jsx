import React, { useEffect, useMemo, useState } from 'react';
import './pop.css';
import notificationLogo from '../../Assets/notification-bell.png';
import { useDispatch, useSelector } from 'react-redux';
import { setPopup } from '../../Redux/reducers';
import { prjName } from '../../Config';

export default function UpdatePopup() {
    const [modalClose, setModalClose] = useState(true);
    let popupData = useSelector((state) => state.popup);
    const popupDetail = !!popupData ? popupData : null;

    const dispatch = useDispatch();

    useEffect(() => {
        if (!!popupData) {
            setModalClose(true);
        }
    }, [popupData]);

    const handlePopup = () => {
        setModalClose(false);
        dispatch(setPopup(null));
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const renderpopUp = useMemo(() => {
        if (!!popupData && popupDetail?.user === prjName && (!!popupDetail?.user) && modalClose) {
            return (
                <div className="popUp" data-bs-toggle="Popup" >
                    <div className='popup'>
                        <div className='container'>
                            <div className='popupCover'>
                                <img src={notificationLogo} alt='' />
                                <div className='popupContent'>
                                    <h4>
                                        {popupData?.title}
                                    </h4>
                                    <p>
                                        {popupData?.message}
                                    </p>
                                    <p>
                                        {popupData?.description}
                                    </p>
                                    <div className="notification-okbtn">
                                        <span type="button" className="btn" data-bs-dismiss="Popup" aria-label="Close" onClick={handlePopup}>OK</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    });
    return (
        <div>{renderpopUp}</div>
    );
}
