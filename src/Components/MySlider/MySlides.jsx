import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


export default function MySlides() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
        
    };

    return <>

        <div>
            <Slider {...settings}>


                <div>
                    <img style={{ "height": "300px" }} src={require("../../Images/slider-2.jpeg")} className=' w-100' alt="" />
                </div>
                <div>
                    <img style={{ "height": "300px" }} src={require("../../Images/grocery-banner-2.jpeg")} className=' w-100' alt="" />
                </div>
                <div>
                    <img style={{ "height": "300px" }} src={require("../../Images/banner-4.jpeg")} className=' w-100' alt="" />
                </div>
                <div>
                    <img style={{ "height": "300px" }} src={require("../../Images/blog-img-1.jpeg")} className=' w-100' alt="" />
                </div>
                <div>
                    <img style={{ "height": "300px" }} src={require("../../Images/blog-img-2.jpeg")} className=' w-100' alt="" />
                </div>
                <div>
                    <img style={{ "height": "300px" }} src={require("../../Images/grocery-banner.png")} className=' w-100' alt="" />
                </div>

            </Slider>
        </div>



    </>
}
