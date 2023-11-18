import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Loadingscreen from '../Loadingscreen/Loadingscreen'
import { Link } from 'react-router-dom';
import MySlides from '../MySlider/MySlides';
import { cartContext } from '../../Context/CartContextProvider';
import $ from 'jquery'

export default function Home() {


  async function addMyProduct(id, idx) {
    if (await addProductToCart(id) === true) {
      $('.successMsg').fadeIn(500, function () {
        setTimeout(() => {
          $('.successMsg').fadeOut(500)
        }, 2000);
      })

      $(`#addBtn${idx}`).fadeOut(500)
      $(`#removeBtn${idx}`).fadeIn(500)

    }

  }


  const { addProductToCart, removeCartItem } = useContext(cartContext)

  async function removeMyProduct(id, idx) {
    if (await removeCartItem(id) === true) {
      $('.removeMsg').fadeIn(500, function () {
        setTimeout(() => {
          $('.removeMsg').fadeOut(500)
        }, 2000);
      })
      $(`#removeBtn${idx}`).fadeOut(500, function () {
        setTimeout(() => {
          $(`#addBtn${idx}`).fadeIn(500)
        }, 500);
      })

    }

  }


  const [allProducts, setallProducts] = useState(null)

  async function getAllproduct() {
    try {

      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
      console.log(data.data)
      setallProducts(data.data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(function () {

    getAllproduct();

  }, [])

  return <>

    {allProducts ? <div className="container">

      <MySlides />

      <div style={{ 'zIndex': '9999', 'display': 'none' }} className="alert  alert-success position-fixed bg-success text-white w-25 text-center successMsg">Product added successfully to your cart</div>
      <div style={{ 'zIndex': '9999', 'display': "none" }} className="alert alert-danger position-fixed bg-success text-white w-25 text-center removeMsg">Product removed successfully from your cart </div>

      <div className="row my-5">

        {allProducts.map(function (pro, idx) {
          return <div key={idx} className="col-md-2">


            <div className="item text-white bg-primary rounded-3 position-relative">

              <Link to={`/prodatails/${pro.id}`}>

                <div className="upper">

                  <img src={pro.imageCover} className='w-100' alt={pro.title} />
                  <h5 className='text-center'>{pro.title.slice(0, pro.title.indexOf(' ', 20))}</h5>
                  <h6 className='fw-bold text-warning'>{pro.category.name}</h6>
                  <h6>price:  {pro.priceAfterDiscount ? <> <span className='text-danger me-3 text-decoration-line-through'> {pro.price} </span> <span>{pro.priceAfterDiscount} </span> </> : <span> {pro.price} </span>}</h6>
                  <div className='position-absolute bg-info p-1 end-0 top-0'> {pro.ratingsAverage}  </div>
                </div>

              </Link>

              <div className="lower">
                <button id={`addBtn${idx}`} onClick={function () { addMyProduct(pro.id, idx) }} className='btn btn-success form-control'>Add to cart</button>

                <button onClick={function () { removeMyProduct(pro.id, idx) }} id={`removeBtn${idx}`} style={{ 'display': 'none' }} className='btn btn-danger form-control'>Remove from cart</button>


              </div>

            </div>
          </div>
        })}
      </div>
    </div> : <Loadingscreen />}


  </>
}
