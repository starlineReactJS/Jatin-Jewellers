import React, { createContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Components/Header/Header';
import Socket from '../Socket';
import Footer from '../Components/Footer/Footer';
import { useSelector } from 'react-redux';
import { adminsocketurl, prjName } from '../Config';
import { io } from 'socket.io-client';
import UpdatePopup from '../Components/Alert Update Popup/UpdatePopup';

let SocketContext = createContext();

const BaseLayout = () => {
    let popupData = useSelector((state) => state.popup);

    const adminsocket = io(adminsocketurl, {});
    adminsocket.on('connect', function () {
        adminsocket.emit('client', prjName);
    });

    const eventListener = () => {
        if (!localStorage.getItem('otrDetails')) {
            window.location.reload();
            adminsocket.disconnect();
        }
    };
    useEffect(() => {
        window.addEventListener('storage', eventListener);
        return () => {
            window.removeEventListener('storage', eventListener);
            adminsocket.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <SocketContext.Provider value={adminsocket}>
                <Header />
                {popupData && Object.keys(popupData)?.length > 0 && (
                    <UpdatePopup />
                )}
                <Outlet />
                <Socket />
                <Footer />
            </SocketContext.Provider>
        </>
    );
};
export { SocketContext };
export default BaseLayout;