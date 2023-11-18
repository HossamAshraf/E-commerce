import React, { useEffect, useState } from 'react'
import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Notfound from './Components/Notfound/Notfound';
import Brands from './Components/Brands/Brands';
import ProDetails from './Components/ProDatails/ProDetails';
import BrandProducts from './Components/BrandProducts/BrandProducts';
import Profile from './Components/Profile/Profile';
import jwtDecode from 'jwt-decode';
import Cart from './Components/Cart/Cart';
import CartContextProvider from './Context/CartContextProvider';
import Payment from './Components/Payment/Payment';
import AllOrders from './Components/AllOrders/AllOrders';

export default function App() {

  function ProtectedRoute({ children }) {

    if (currentUser) {
      return <>
        {children}
      </>
    }
    else {
      return  <>
         <Navigate to='/login'/>
      </>
  
    }
  }



  useEffect(function () {

    if (localStorage.getItem('tkn') != null && currentUser == null) {
      getCurrentUser();

    }

  }, [])


  function clearUserData() {
    localStorage.removeItem("tkn")
    setcurrentUser(null)
  }

  const [currentUser, setcurrentUser] = useState(null)

  function getCurrentUser() {

    let currentUser = jwtDecode(localStorage.getItem("tkn"));
    console.log(currentUser)
    setcurrentUser(currentUser)
  }

  const router = createHashRouter([

    {
      path: '', element: <Layout clearUserData={clearUserData} currentUser={currentUser} />, children: [

        { path: '', element: <CartContextProvider><Home /></CartContextProvider> },
        { path: 'home', element: <CartContextProvider><Home /></CartContextProvider> },
        { path: 'cart', element: <ProtectedRoute> <CartContextProvider><Cart /></CartContextProvider> </ProtectedRoute> },
        { path: 'payment', element: <ProtectedRoute> <CartContextProvider><Payment /></CartContextProvider> </ProtectedRoute> },
        { path: 'brands', element: <Brands /> },
        { path: 'allOrders', element: <ProtectedRoute><AllOrders currentUser={currentUser} /></ProtectedRoute> },
        { path: 'profile', element: <ProtectedRoute> <Profile currentUser={currentUser} /></ProtectedRoute> },
        { path: 'brandproducts/:id', element: <BrandProducts /> },
        { path: 'prodatails/:id', element: <CartContextProvider><ProDetails /> </CartContextProvider>},
        { path: 'login', element: <Login getCurrentUser={getCurrentUser} /> },
        { path: 'register', element: <Register /> },
        { path: '*', element: <Notfound /> }


      ]
    }


  ])

  return <>


    <RouterProvider router={router} />

  </>
}
