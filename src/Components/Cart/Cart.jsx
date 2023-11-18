import React, { useContext } from 'react'
import { cartContext } from '../../Context/CartContextProvider'
import Loadingscreen from '../Loadingscreen/Loadingscreen'
import { Link } from 'react-router-dom'

export default function Cart() {

    const { cartProducts, totalCartPrice, numOfCartItems, removeCartItem, updateCount } = useContext(cartContext)
    console.log(cartProducts)
    return <>

        {cartProducts ? <div className="container py-5">

            <h2 className='text-center'>Welcome User </h2>

            <div className='d-flex justify-content-between '>
                <h3>Total Price : <span className='text-primary'>{totalCartPrice}</span></h3>
                <Link to={'/payment'}>
                    <button className='btn btn-primary'>Confirm Order</button>
                </Link>
            </div>

            <div className="row">

                {cartProducts.map(function (pro, idx) {
                    return <div key={idx} className="col-md-2">

                        <div className="item bg-primary rounded-3  ">

                            <img src={pro.product.imageCover} className='w-100' alt={pro.product.title} />
                            <h3 className='fw-bold text-white'> {pro.product.title.slice(0, pro.product.title.indexOf(' ', 20))} </h3>
                            <h5 className='text-warning'>Count : {pro.count}</h5>
                            <h5 className='text-white'>Price : {pro.price}</h5>
                            <h5 className='text-white'>Total Price : {pro.price * pro.count}</h5>

                            <input className='form-control' min={1} onChange={function (e) { updateCount(pro.product.id, e.target.value) }} value={pro.count} placeholder='Count' type="number" />
                            <button onClick={function () { removeCartItem(pro.product.id) }} className='btn btn-danger form-control'>Remove</button>
                        </div>

                    </div>

                })}

            </div>


        </div> : <Loadingscreen />}

    </>
}
