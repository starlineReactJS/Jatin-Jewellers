import React, { useEffect, useState } from 'react'
import './category.css'
import { getJewelleryApi } from '../../Api Methods';
import { Link, useParams } from 'react-router-dom';


const Category = () => {
  const [jewelleyData, setjewelleyData] = useState([]);
  const [jewelleryImg, setJewelleyImg] = useState("")
  const [jewelleryDescription, setJewelleryDescription] = useState("");
  const subId = useParams().id

  const handleGetJewellery = async () => {

    try {
      let res = await getJewelleryApi(subId)
      if (!!res) {
        let resD = JSON.parse(res.d)
        setjewelleyData(resD)
      } else {
        setjewelleyData([])
      }
    } catch (error) {
      console.log('error an GetHomeList',)
    }
  }

  useEffect(() => {
    handleGetJewellery()
  }, [subId]);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12'>
          <div className='jewelrytittle'>
            <h2>Gold</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3" >
          <Link className='category_product_link' to={'/jewellery/130'}>
            <div className="jewelleryimage">
              <img src="https://starlinebullion.co.in/JewelleryCategoryImage/3/130/1120/ring.jpg?0.2653439672081628" alt="jewellery_Image0" />
            </div>
            <div className="productdesss">
            <h3>
              Rings
            </h3>
            </div>
          </Link>
        </div>
        

      </div>
    </div>


  )
}

export default Category