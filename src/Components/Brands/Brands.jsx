import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loadingscreen from '../Loadingscreen/Loadingscreen'
import { Link } from 'react-router-dom'

export default function Brands() {

    const [allBrands, setallBrands] = useState(null)
    async function getAllBrands() {

        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
            console.log(data.data)
            setallBrands(data.data)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(function () {

        getAllBrands()

    }, [])

    return <>

        {allBrands ? <div className="container">
            <div className="row align-items-center">
                <div className="col-md-3">
                    <div className="title ">
                        <h3 className='text-primary fw-bolder'>Our Brands</h3>
                        <p> You can see our brands and each brand includes products in it</p>
                    </div>
                </div>
                {allBrands.map(function (brand, idx) {
                    return <div key={idx} className="col-md-3 ">
             
                    <Link to={`/brandproducts/${brand._id}`}>
                    
                    <div className="item text-center ">
                            <img src={brand.image} alt="" />
                            <h4>{brand.name}</h4>

                        </div>
                    
                    </Link>
                     
                    </div>
                })}
            </div>
        </div> : <Loadingscreen />}
    </>
}
