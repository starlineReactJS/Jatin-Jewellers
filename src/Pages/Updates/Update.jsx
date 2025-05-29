import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { get, updatesDetails } from '../../Api Methods';
import { prjName } from '../../Config';
import moment from 'moment/moment';
import { Skeleton } from '../../Components/Skeleton';


export default function Update() {
    const [updateContent, setUpdateContent] = useState([]);
    const [updateMessage, setUpdateMessage] = useState([]);
    const today = new Date().toLocaleDateString("en-GB");
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [noData, setNoData] = useState(false);
    const [isLoading, setIsLoading] = useState({});
    // eslint-disable-next-line no-unused-vars


    const handleClick = useCallback(async () => {
        const updateData = await updatesDetails(startDate, endDate);

        if (!!updateData?.d) {
            const updateRes = JSON.parse(updateData?.d);
            if (updateRes?.length === 0 || !(!!updateRes)) {
                setNoData(true);
            }
            setUpdateContent(updateRes?.reverse());
        } else {
            setNoData(true);
            setUpdateContent([]);
        }
        setUpdateMessage(updateData);
    }
    );
    const dataLoadedFn = (data) => {
        setIsLoading(data);
    };

    useEffect(() => {
        if (!!noData) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setIsLoading({ updateContent: 'dataLoaded' });
        }
    }, [noData]);

    useEffect(() => {
        handleClick();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderUpdates = useMemo(() => {
        if (!!noData && (!(!!updateContent) || updateContent?.length === 0)) {
            return (<h1 className='text-center' style={{ color: 'rgb(255, 255, 255)', fontWeight: '600', width: '100%', float: 'left' }}>No Updates Found</h1>);
        }
        return updateContent?.map((data, index) => {
            // let dateTime = data.modifiedDate.split('T');
            // let date = dateTime?.[0];
            // const [year, month, day] = date.split('-');
            const formattedDate = `${data?.Day} ${new Date(`${data?.Day}-${data?.Month}-${data?.Year?.toString()}`).toLocaleString('default', { month: 'long' })} ${data?.Year?.toString()}`;
            // let time = dateTime?.[1].split('.');
            if (updateMessage.message !== "Data not available.") {
                return (
                    <div className="up-cover" key={index}>
                        <div className="update-date-cover">
                            <h2>
                                {formattedDate}
                                <p className="update-time">Time: {data?.Time}</p>
                            </h2>
                        </div>
                        <div className="update-title">
                            <h4>{data?.title}</h4>
                            <p>
                                {data?.Description === null ? 'NA' : data?.Description}
                            </p>
                        </div>
                    </div>
                );
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateContent]);

    return (
        <>
            <div className="main-cover">
                <div className="container">
                    <div className="">
                        <div className="col-md-12">
                            <div className="header">
                                <div className="title-wth title-name">
                                    UPDATES
                                    <div className="mn-title-border">
                                        {/* <div className="date-picker">
                                            <input id="txtStartDate" type="date" className='hasDatepicker'
                                                value={startDate}
                                                onChange={(e) =>
                                                    setStartDate(e.target.value)}
                                            />{" "}
                                            <input id="txtEndDate" type="date" className='hasDatepicker'
                                                value={endDate}
                                                onChange={(e) =>
                                                    setEndDate(e.target.value)}
                                                min={startDate.split("/").reverse().join("-")}
                                            />{" "}
                                            <input type="button" id="SearchNewsDateWise" style={{ cursor: "pointer" }} value="Search"
                                                onClick={() => handleClick()}
                                                // onMouseDown={(e) => setNoData(false)}
                                            />
                                        </div> */}
                                        <div className="date-picker">
                                            <input id="txtStartDate" type="date" className="hasDatepicker"
                                                defaultValue={startDate.split("/").reverse().join("-")}
                                                onChange={(e) =>
                                                    setStartDate(e.target.value.split("-").reverse().join("/"))}
                                            />
                                            <input id="txtEndDate" type="date" className="hasDatepicker"
                                                defaultValue={endDate.split("/").reverse().join("-")}
                                                onChange={(e) =>
                                                    setEndDate(e.target.value.split("-").reverse().join("/"))}
                                            />
                                            <input type="button" id="SearchNewsDateWise" style={{ cursor: "pointer" }} value="Search"
                                                onClick={() => handleClick()}
                                                onMouseDown={(e) => setNoData(false)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div class="col-md-12" id="divNews"> */}
                        <div className="col-md-12">
                            <div className="update-cover">
                                {!(!!isLoading?.updateContent)
                                    ? <Skeleton dependency={{ updateContent: updateContent }} isLoading={(data) => dataLoadedFn(data)} height='200px' />
                                    : <div id="divNews">
                                        <div style={{ display: (!(!!isLoading?.updateContent) && !(!!noData)) ? "none" : "block" }}>
                                            {renderUpdates}
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
