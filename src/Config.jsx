import slLogo from "./Images/sl.png";
import KYC from "./Pages/Kyc/Kyc";
import About from "./Pages/About/About";
import Bank from "./Pages/Bank/Bank";
import Calculator from "./Pages/Calculator";
import Calendar from "./Pages/Calendar/Calendar";
import Coin from "./Pages/Coin/Coin";
import Feedback from "./Pages/Feedback/Feedback";
import Liverate from "./Pages/Liverate/Liverate";
import Update from "./Pages/Updates/Update";
import Jewellery from "./Pages/Jewellery/jewellery";

let configData = {};

const fetchConfig = async () => {
    const response = await fetch('/config.json');
    const config = await response.json();
    configData = config;
};

await fetchConfig();

export const apiUrl = `${configData?.baseUrl}${configData?.endpoint}`;
export const adminsocketurl = `${configData?.baseUrl}:${configData?.socketPort}`;
export const prjName = configData?.prjName;
export const androidUrl = configData?.androidUrl;
export const iosUrl = configData?.iosUrl;
export const coinImgUrl = `${configData?.baseUrl}/images/coin/`;

export const footerData = {
    copyright: "© Copyright 2025 Jatin Jewellers Pvt Ltd",
    companyName: "Starline Solutions Pvt Ltd.",
    logo: slLogo,
    companyLink: "http://www.starlinetechno.net/",
};
export const economicCalendar = "https://www.mql5.com/en/economic-calendar/widget?mode=1&amp;utm_source=www.pritamspot.com";
export const hasOtr = false;
export const hasViewBtn = true;
export const pushMenu = false;
export const menuTitleArr = [
    {
        id: "1",
        path: "about",
        name: "About",
        display: true,
        element: <About />
    },
    {
        id: "2",
        path: "",
        name: "Liverate",
        display: true,
        element: <Liverate />
    }, {
        id: "10",
        path: "jewellery",
        name: "Jewellery",
        display: true,
        element: <Jewellery />
    },
    {
        id: "3",
        path: "coin",
        name: "Coins",
        display: false,
        element: <Coin />
    },
    {
        id: "4",
        path: "kyc",
        name: "Kyc",
        display: false,
        element: <KYC />
    },
    {
        id: "5",
        path: "update",
        name: "Updates",
        display: true,
        element: <Update />
    },
    {
        id: "6",
        path: "bankDetail",
        name: "Bank Details",
        display: true,
        element: <Bank />
    },
    {
        id: "7",
        path: "calculator",
        name: "Calculator",
        display: false,
        element: <Calculator />
    },
    {
        id: "8",
        path: "calendar",
        name: "Economic Calendar",
        display: true,
        element: <Calendar />
    },
    {
        id: "9",
        path: "feedback",
        name: "Contact Us",
        display: true,
        element: <Feedback />
    }

];
