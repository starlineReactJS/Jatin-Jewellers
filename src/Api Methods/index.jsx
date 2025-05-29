// import { apiUrl, prjName } from "../Config";

let configData = {};

const fetchConfig = async () => {
    const response = await fetch('/config.json');
    const config = await response.json();
    configData = config;
};

await fetchConfig();

let { baseUrl, prjName, webService, ClientId } = configData;
let apiUrl = baseUrl + webService;

export const post = async (data, endpoint, formData = false) => {
    let requestOptions;
    if (formData) {
        const formdata = new FormData();
        formdata.append("user", prjName);
        let copyFields = ["addressCopy", "panCopy", "gstCopy", "partnershipCopy"];
        Object.keys(data).forEach(key => {
            if (copyFields.includes(key) && !!data[key]) {
                formdata.append("Files", data[key], data[key]["path"]);
            } else if (!!data[key]) {
                formdata.append(key, data[key]);
            }
        });
        requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow"
        };
    } else {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: "follow",
        };
    }

    try {
        const response = await fetch(`${apiUrl}/${endpoint}`, requestOptions);
        if (!response?.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
};

export const get = async (endpoint) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json; charset=utf-8");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };

    try {
        const response = await fetch(`${apiUrl}/${endpoint}`, requestOptions);
        if (!response?.ok) {
            throw new Error('Network response was not ok');
        }
        const parsedData = await response.json();
        return parsedData;
    } catch (error) {
        throw error;
    }
};

export const updatesDetails = async (fromDate, toDate) => {
    try {
        let Obj = {};
        Obj = JSON.stringify({
            StartDate: fromDate,
            EndDate: toDate,
            Client: ClientId,
        });
        const response = await fetch(`${apiUrl}/GetNewsDateWise`, {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf-8', // <-- Specifying the Content-Type
            }),
            body: JSON.stringify({Obj: Obj}),
        });

        const parsedData = await response.json();
        return parsedData;
    } catch (error) {
        console.error('Error:', error);
    }

};

export const getHomeList = async () => {
    try {
        const response = await fetch(`${apiUrl}/GetHomeList?user=${prjName}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        });

        const parsedData = await response.json();
        return parsedData;
    } catch (error) {
        console.log('Error:', error);
    }

};
export const getCategoryApi = async () => {
    try {
        const response = await fetch(`${apiUrl}/GetCategoriesJewelleryWeb`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({'ClientID':ClientId})
        });

        const parsedData = await response.json();
        return parsedData;
    } catch (error) {
        console.log('Error:', error);
    }

};
export const getSubCategoryApi = async () => {
    try {
        const response = await fetch(`${apiUrl}/GetCategoryList`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body:"{'Obj':'" + JSON.stringify({"ClId":"9"}) + "'}",  
        });

        const parsedData = await response.json();
        return parsedData;
    } catch (error) {
        console.log('Error:', error);
    }

};
export const getJewelleryApi = async (subId) => {
    try {
        
        let Obj = {
              pageNO: 1,
              SC_ID:subId,
              CleintId: ClientId
            }
        const response = await fetch(`${apiUrl}/GetJewelleryBySubCategoryWeb`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(Obj),
        });

        const parsedData = await response.json();
        return parsedData;
    } catch (error) {
        console.log('Error:', error);
    }

};
export const bankDetails = async () => {
    try {
        const response = await fetch(`${apiUrl}/BankDetail`, {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf-8', // <-- Specifying the Content-Type
            }),
            body: JSON.stringify({
                ClientId: ClientId.toString(),
            }),
        });
        const parsedData = await response.json();
        return parsedData;
    } catch (error) {
        console.error('Error:', error);
    }
};

export const feedbackDetails = async (data) => {
    // const myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        Name: data?.name,
        Email: data?.email,
        Phone: data?.mobile,
        Sub: data?.sub,
        Message: data?.message,
        Client: ClientId,
    });

    const requestOptions = {
        method: "POST",
        headers: new Headers({
            'Content-Type': 'application/json; charset=utf-8', // <-- Specifying the Content-Type
        }),
        body: JSON.stringify({
            Obj: raw,
        }),
        redirect: "follow"
    };

    try {
        const response = await fetch(`${apiUrl}/Feedback`, requestOptions);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("An error occurred while fetching feedback details:", error);
        throw error;
    }

};
