import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const cartContext = createContext()
export default function CartContextProvider({ children }) {

    const [numOfCartItems, setNumOfCartItems] = useState(0)
    const [totalCartPrice, settotalCartPrice] = useState(0)
    const [cartProducts, setcartProducts] = useState(null)
    const [cartId, setCartId] = useState(null)

 const navigate = useNavigate()
    async function addProductToCart(ProId) {
        try {
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", { "productId": ProId }, {
                headers: { "token": localStorage.getItem("tkn") }
            })
            console.log(data)
            if (data.status === 'success') {
                return true
            }
            else {
                return false
            }

        } catch (error) {
            console.log(error)
        }


    }

    async function removeCartItem(id) {

        try {

            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                headers: { 'token': localStorage.getItem('tkn') }
            })
            console.log(data)
            if (data.status === "success") {
                setNumOfCartItems(data.numOfCartItems)
                settotalCartPrice(data.data.totalCartPrice)
                setcartProducts(data.data.products)
                return true;
            }

        } catch (error) {
            console.log(error)
        }


    }


    async function getCartProducts() {

        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
                headers: { 'token': localStorage.getItem('tkn') }
            })
            console.log(data)
            if (data.status === 'success') {
                setNumOfCartItems(data.numOfCartItems)
                settotalCartPrice(data.data.totalCartPrice)
                setcartProducts(data.data.products)
                setCartId(data.data._id)

                return true

            }

        } catch (error) {
            console.log(error)
            if (error.response.status === 404){
                navigate('/home')
            }
        }

    }

    async function updateCount(id, count) {

        try {
            const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                'count': count
            }, { headers: { 'token': localStorage.getItem('tkn') } })

            console.log(data)
            if (data.status === "success") {
                setNumOfCartItems(data.numOfCartItems)
                settotalCartPrice(data.data.totalCartPrice)
                setcartProducts(data.data.products)
                return true;
            }
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(function () {
        getCartProducts()
    }, [])


    return <cartContext.Provider value={{ addProductToCart, numOfCartItems, totalCartPrice, cartProducts, cartId ,removeCartItem , updateCount }}>
        {children}
    </cartContext.Provider>
}
