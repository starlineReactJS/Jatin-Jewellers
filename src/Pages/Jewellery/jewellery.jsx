import React, { useEffect, useState } from 'react';
import './jewellery.css';
import { getJewelleryApi } from '../../Api Methods';
import { useParams } from 'react-router-dom';


const Jewellery = () => {
  const [jewelleyData, setjewelleyData] = useState([]);
  const [jewelleryImg, setJewelleyImg] = useState("");
  const [jewelleryDescription, setJewelleryDescription] = useState("");
  const subId = useParams().id;

  const handleGetJewellery = async () => {

    try {
      let res = await getJewelleryApi(subId);
      if (!!res) {
        let resD = JSON.parse(res.d);
        setjewelleyData(resD);
      } else {
        setjewelleyData([]);
      }
    } catch (error) {
      console.log('error an GetHomeList',);
    }
  };

  useEffect(() => {
    handleGetJewellery();
  }, [subId]);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12'>
          <div className='jewelrytittle'>
            <h2>Jewellery</h2>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" >
          <div className="modal-dialog ">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">

                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setJewelleyImg("")} />
                {/* <svg className="crosssvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#fff"><path d="M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z" /></svg> */}

              </div>
              <div className="modal-body">
                <div className="jewellery-image-pop-cover">
                  <img style={{ width: '100%' }} src={jewelleryImg} alt="" />
                </div>
                <p className='modal_p_mname'>{jewelleryDescription}</p>
              </div>
            </div>
          </div>
        </div>
        {jewelleyData?.length > 0 ? jewelleyData?.map((item, ind) => {
          let mrp = ((parseInt(item?.ArtNo.split(',').join('')) || 0) + (Number(item?.commonPremium) || 0)).toLocaleString('en-IN');
          return (
            <div className='col-md-3' key={ind} onClick={() => {
              setJewelleyImg(!!item?.Image ? `${item?.Image}?${Math.random()}` : "");
              setJewelleryDescription(item?.Description || "");
            }} data-bs-toggle="modal" data-bs-target="#exampleModal">
              <div className='jewelleryimage'>
                <img src={`${item?.Image}?${Math.random()}`} alt={`jewellery_Image` + ind} loading='lazy' />
              </div>
              <div className='productdesss'>
                <h3>MRP: <span>{mrp}</span></h3>

              </div>
            </div>);
        }) : <h2 className='text-center mb-4' style={{ color: "#fff" }}>Not Available</h2>}


      </div>
    </div >


  );
};

export default Jewellery;