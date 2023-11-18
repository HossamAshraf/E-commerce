import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Loadingscreen from '../Loadingscreen/Loadingscreen'
import { useParams } from 'react-router-dom'
import { cartContext } from '../../Context/CartContextProvider'
import $ from 'jquery'

export default function ProDetails() {


    async function addMyProduct(id) {

        if (await addProductToCart(id) === true) {
            $('.successMsg').fadeIn(1000,
                function () {
                    setTimeout(() => {
                        $('.successMsg').fadeOut(500)
                    }, 500, setTimeout(() => {
                        $('#delBtn').fadeIn(500, function () {
                            $('#addBtn').fadeOut(500)
                        })
                    }, 500));
                }
            )
        }

    }
    async function removeMyProduct(id) {
        if (await removeCartItem(id) === true) {
            $('.removeMsg').fadeIn(500,function (){
                setTimeout(() => {
                    $('.removeMsg').fadeOut(500)   
                }, 2000);
            })
            $('#addBtn').fadeIn(500,function(){
                setTimeout(() => {
                    $('#delBtn').fadeOut(500)
                }, 1000);
            })

        }

    }
    const { addProductToCart, removeCartItem } = useContext(cartContext)

    const { id } = useParams()

    const [productDetails, setproductDetails] = useState(null)

    async function getProDetails() {

        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            console.log(data.data)
            setproductDetails(data.data)
            if (data.status === "success") {


            }

        } catch (error) {
            console.log(error)
        }
    };

    useEffect(function () {
        getProDetails()
    }, []);

    return <>


        {productDetails ? <div className="container">
            <div className="row">
                <div className="col-md-3">

                    <img src={productDetails.imageCover} className='w-100' alt={productDetails.title} />

                </div>
                <div className="col -md-9">

                    <h2>{productDetails.title}</h2>
                    <p>{productDetails.description}</p>
                    <h5>Price: {productDetails.price}</h5>
                    <h5>Quantity: {productDetails.quantity}</h5>

                    <button onClick={function () { addMyProduct(productDetails.id) }} id='addBtn' className='btn btn-success w-100 '>Add product to cart +</button>
                    <button onClick={function () { removeMyProduct(productDetails.id) }} style={{ 'display': 'none' }} id='delBtn' className=' btn btn-danger w-100 '>Remove from cart -</button>


                    <div style={{ 'display': "none" }} className="alert alert-success text-center successMsg">Product added successfully to your cart </div>
                    <div style={{ 'display': "none" }} className="alert alert-danger text-center removeMsg">Product removed successfully from your cart </div>

                </div>

            </div>
        </div> : <Loadingscreen />}

    </>
}
