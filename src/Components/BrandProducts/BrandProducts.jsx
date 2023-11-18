import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loadingscreen from '../Loadingscreen/Loadingscreen'
import { Link, useParams } from 'react-router-dom'

export default function BrandProducts() {

    const { id } = useParams()

    async function getBrandProducts() {
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products", {
                params: { 'brand': id }
            })
            console.log(data.data)
            setallProducts(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const [allProducts, setallProducts] = useState(null)

    useEffect(function () {
        getBrandProducts();
    },[]) ;


    return <>

        {allProducts ? <div className="container">

            <div className="row">


                {allProducts.length == 0 ? <h2 className=' py-3 text-center fw-bold'>No products available right now ...</h2> : allProducts.map(function (pro, idx) {
                    return <div key={idx} className="col-md-3">


                        <Link to={`/prodatails/${pro.id}`}>

                            <div className="item text-white bg-primary rounded-3 position-relative">
                                <img src={pro.imageCover} className='w-100' alt={pro.title} />
                                <h5 className='text-center'>{pro.title.slice(0, pro.title.indexOf(' ', 20))}</h5>
                                <h6 className='fw-bold text-warning'>{pro.category.name}</h6>
                                <h6>price:  {pro.priceAfterDiscount ? <> <span className='text-danger me-3 text-decoration-line-through'> {pro.price} </span> <span>{pro.priceAfterDiscount} </span> </> : <span> {pro.price} </span>}</h6>
                                <div className='position-absolute bg-info p-1 end-0 top-0'> {pro.ratingsAverage}  </div>

                            </div>

                        </Link>


                    </div>
                })}


            </div>
        </div> : <Loadingscreen />}



    </>
}
