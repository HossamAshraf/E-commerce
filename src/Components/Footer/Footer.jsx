import React from 'react'

export default function Footer() {
    return <>

        <div className=' foot  p-4'>

            <h2>Get The Freshcart app</h2>
            <p>We will send you a link , open it on your phone to download the app</p>

            <div className="container mb-3 d-flex justify-content-between align-items-center">

                <input type="text" className='form-control w-75' placeholder='Email...' />

                <button className='btn btn-success btn-lg '>Share app link</button>

            </div>



            <div className='container d-flex justify-content-between align-items-center border-top border-bottom border-2 border-dark p-4'>
                <div className="left">
                    <ul className='list-unstyled d-flex'>
                        <li className='me-2 '>
                            <h6>Payment partners</h6>
                        </li>
                        <li className='me-2 text-primary'>
                            <i className="fa-brands fa-cc-amazon-pay"></i>
                        </li>
                        <li className='me-2 text-primary'>
                            <i className="fa-brands fa-cc-mastercard"></i>
                        </li>
                        <li className='me-2 text-primary'>
                            <i className="fa-brands fa-cc-paypal"></i>
                        </li>
                    </ul>
                </div>
                <div className="right d-flex align-items-center justify-content-center ">

                    <h6>Get deliveries with Freshcart</h6>

                    <button className='btn btn-dark btn-lg mx-3'> <i className="fa-brands fa-apple"></i>  <span>Available on the App Store </span></button>

                    <button className='btn btn-dark btn-lg'> <i className="fa-brands fa-google-play"></i> <span>Get on Google Play</span>   </button>


                </div>


            </div>
        </div>

    </>
}
