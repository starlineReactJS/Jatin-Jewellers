import React, { useEffect, useState } from 'react';
import headerlogo from '../../Images/logo.png';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { androidUrl, iosUrl, menuTitleArr, pushMenu } from '../../Config';
import { getCategoryApi, getHomeList, getSubCategoryApi } from '../../Api Methods';
// import DateClock from '../DateClock';

export default function Header() {

    const clientData = useSelector((state) => state.clientDetails);
    const [toggleMenu, setToggleMenu] = useState(true);
    const [toggleMenuFirstTime, setToggleMenuFirstTime] = useState(true);
    // const [categoryData, setCategoryData] = useState([]);

    let location = useLocation().pathname;
    let currentPathName = location?.split('/')?.length > 1 ? location?.split('/')[1] : location?.split('/')[0];

    const [categoryData, setCategoryData] = useState([]);

    const handleGetCategory = async () => {
        try {
            let res = await getCategoryApi()
            if (!!res) {
                let resD = JSON.parse(res.d)
                setCategoryData(resD)
            } else {
                setCategoryData([])
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    useEffect(() => {
        handleGetCategory()

    }, []);


    return (
        <header>
            {!!clientData[0]?.Marquee && <div className="">
                <div className="container header-top-marquee">
                    <marquee className="marquee1" style={{ fontSize: '18px' }}>{clientData[0]?.Marquee}</marquee>
                    {/* <marquee className="marquee1" style={{ fontSize: '14px' }}> WELECOME TO EVANNI BULLION AND JEWELLERS</marquee> */}
                </div>
            </div>}
            <div className="header-top-details">
                <div className="container">
                    <div className="second-part-cover">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                <div className="logo-cover">
                                    <a href="/"> <img src={headerlogo} /></a>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 align-self-center">
                                <div className="header-cover">
                                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                                        <div className="container">
                                            {/* <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button> */}
                                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
                                                <span className="navbar-toggler-icon"></span>
                                            </button>
                                            <div className="collapse navbar-collapse" id="navbarsExample07">
                                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                                    {/* {categoryData?.length > 0 && categoryData?.map((typeItem, typeInd) => {
                                                        if (typeItem.isActive === true) {
                                                            return <div id="nav">
                                                                <li className="category" key={typeInd.typeId}>
                                                                    <Link href="javascript:void(0)" className='typeNameTab'>
                                                                        <label htmlFor="droplist1" className="toggle">
                                                                            {typeItem.typeName}
                                                                        </label>
                                                                    </Link>
                                                                    <ul className="dropdown">
                                                                        {typeItem?.categories.map((categoryItem, ind) => {
                                                                            return <>
                                                                                <li className="dropdown-subcategory" key={categoryItem.categoryId}>
                                                                                    <Link href="javascript:void(0)">
                                                                                        <label htmlFor="droplist2" className="toggle">
                                                                                            {categoryItem.categoryName}
                                                                                        </label>
                                                                                    </Link>
                                                                                    <ul className="dropdown">
                                                                                        {categoryItem?.subCategories.map((sucItem, ind) => {
                                                                                            return <>
                                                                                                <li className="subcategory-item" key={sucItem.subCategoryId}>
                                                                                                    <Link to={`/products/${sucItem.subCategoryId}`}>{sucItem.subCategoryName}</Link>
                                                                                                </li>
                                                                                            </>
                                                                                        })}
                                                                                    </ul>
                                                                                </li >
                                                                            </>
                                                                        })}
                                                                    </ul>
                                                                </li>
                                                            </div>
                                                        }
                                                    })} */}
                                                    {/* <div id="nav">
                                                        <li className="category">
                                                            <a className='nav-link'>Jewellery</a>
                                                            <ul className="dropdown">
                                                                {categoryData?.length > 0 && categoryData.map((item, ind) => {
                                                                    return (
                                                                        <li className="dropdown-subcategory" key={ind}>
                                                                            <a>{item.name}</a>
                                                                            <ul className="dropdown">
                                                                                {item.subcategories.map((subItem, subInd) => (
                                                                                    <li className="subcategory-item" key={subInd}>
                                                                                        <Link to={`/jewellery/${subItem.id}`} style={{ color: "#fff" }}>{subItem.name}</Link>
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        </li>
                                                                    );
                                                                })}
                                                            </ul>
                                                        </li>
                                                    </div> */}
                                                    {!!menuTitleArr && menuTitleArr?.length > 0 && menuTitleArr.map((menu) => {
                                                        if (!menu?.display) return false;
                                                        if (!!menu.path.includes("jewellery")) {
                                                            return <li className={`nav-item category ${currentPathName === menu?.path ? "active" : ""}`} key={menu?.id}>
                                                                <Link className={`nav-link`}>{menu.name}</Link>
                                                                <ul className="dropdown">
                                                                    {categoryData?.length > 0 && categoryData.map((item, ind) => {
                                                                        return (
                                                                            <li className="dropdown-subcategory" key={ind}>
                                                                                <Link to={`/category`} >{item.name}</Link>
                                                                                <ul className="dropdown">
                                                                                    {item.subcategories.map((subItem, subInd) => (
                                                                                        <li className="subcategory-item" key={subInd}>
                                                                                            <Link to={`/jewellery/${subItem.id}`} style={{ color: "#fff" }}>{subItem.name}</Link>
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            </li>
                                                                        );
                                                                    })}
                                                                </ul>
                                                            </li>
                                                        } else {
                                                            return (
                                                                <li className={`nav-item ${currentPathName === menu?.path ? "active" : ""}`} key={menu?.id}>
                                                                    <Link className={`nav-link`} to={`/${menu?.path}`}>{menu.name}</Link>
                                                                </li>
                                                            );
                                                        }

                                                    }
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </header>
    );
}
