import axios from 'axios'
import React, { useContext } from 'react'
import { cartContext } from '../../Context/CartContextProvider'
import { useNavigate } from 'react-router-dom'

export default function Payment() {

    const navigate = useNavigate()

    const { cartId } = useContext(cartContext)
    console.log(cartId)

    async function confirmCashOrder() {

        try {
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
                {
                    "shippingAddress": {
                        "details": document.querySelector('#address').value,
                        "phone": document.querySelector('#Phone').value,
                        "city": document.querySelector('#City').value
                    }

                }, { headers: { 'token': localStorage.getItem('tkn') } })
            console.log(data)
            if (data.status === 'success') {

                navigate('/allOrders')


            }
        }
        catch (error) {
            console.log(error)
        }


    }

    async function confirmCreditOrder() {

        try {
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
                {
                    "shippingAddress": {
                        "details": document.querySelector('#address').value,
                        "phone": document.querySelector('#Phone').value,
                        "city": document.querySelector('#City').value
                    }
                },
                {
                    headers: {
                        'token': localStorage.getItem('tkn')
                    }, params: {
                        'url': `http://localhost:3000`
                    }
                }
            )
            console.log(data) 
            if(data.status === 'success'){
                window.open(data.session.url)
            }

        } catch (error) {
            console.log(error)
        }


    }


    return <>

        <div className="container text-center">
            <h2 className='text-center'> Hello User</h2>

            <div className="w-50 m-auto">

                <form >

                    <label className='m-3' htmlFor="address">Address Details</label>
                    <input type="text" className='form-control' placeholder='Address Details' id='address' />

                    <label className='m-3' htmlFor="Phone">Phone </label>
                    <input type="text" className='form-control' placeholder='Phone ' id='Phone' />

                    <label className='m-3' htmlFor="City">City </label>
                    <input type="text" className='form-control' placeholder='City' id='City' />
                    <div>
                        <button onClick={function () { confirmCashOrder() }} type='button' className='btn mt-3 btn-primary form-control'>Cash On Delivery</button>
                        <button onClick={function () { confirmCreditOrder() }} type='button' className='btn btn-primary mt-3 form-control'>Confirm Credit</button>

                    </div>
                </form>

            </div>
        </div>

    </>
}
