import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loadingscreen from '../Loadingscreen/Loadingscreen'
import { map } from 'jquery'


export default function AllOrders({ currentUser }) {
    async function getAllOrders() {
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${currentUser.id}`,)
        setallOrders(data)
        console.log(allOrders)
    }
    const [allOrders, setallOrders] = useState(null)
    useEffect(function () {
        getAllOrders()
    }, [])
    return <>
        {allOrders ? <div className="container">
            <h2 className='text-center'>Hello User</h2>
            <div className="row">
                {allOrders.map(function (order, idx) {
                    return <div key={idx} className="col-md-4">
                        <div className="order bg-primary text-white">

                            <div className="container">

                                <div className="row">

                                    {order.cartItems.map(function (item, index) {
                                        return <div key={index} className="col-md-6">

                                            <div className="item ">

                                                <img src={item.product.imageCover} className='w-100' alt={item.product.title.slice(0, 10)} />
                                                <h4>{item.product.title.slice(0, 10)}</h4>
                                                <h5>Count :  {item.count}</h5>
                                                <h5>Price :  {item.price}</h5>

                                            </div>


                                        </div>
                                    })}



                                </div>

                            </div>


                            <h5> Total Order Price : {order.totalOrderPrice}</h5>
                            <h5>Order Type : {order.paymentMethodType}</h5>
                            <p>This Order Was Delivered To ({order.shippingAddress.details}) in ({order.shippingAddress.city})
                                with Phone Number : ({order.shippingAddress.phone})   </p>
                        </div>
                    </div>
                })}
            </div>
        </div>
            : <Loadingscreen />}

    </>
}
