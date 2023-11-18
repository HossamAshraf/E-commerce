import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import $ from 'jquery'
import { useNavigate } from 'react-router-dom'

export default function Register({ getCurrentUser }) {


  let user = {
    email: "",
    password: ""
  }

  let navigate = useNavigate()

  async function LoginUser(obj) {

    try {

      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', obj)
      console.log(data);
      if (data.message === "success") {

        localStorage.setItem('tkn', data.token)
        getCurrentUser()
        $('.successMsg').fadeIn(1000, function () {
          navigate("/Home")
        })
      }
    } catch (error) {
      console.log(error.response.data.message);
      $('.errMsg').fadeIn(1000, function () {
        setTimeout(() => {
          $('.errMsg').fadeOut(1000)
        }, 3000);

      })
    }

  }

  let myFormik = useFormik({
    initialValues: user,
    onSubmit: function (values) {
      LoginUser(values)

    },
    validate: function (values) {

      let errors = {}


      if (values.email.includes("@") === false || values.email.includes(".com") === false) {
        errors.email = "Emaile must be valid";
      }

      if (values.password.length < 6 || values.password.length > 12) {
        errors.password = "Password must be from 6 character to 12 character";
      }
      return errors;
    }
  })

  return <>

    <div className="container">

      <h2>Login Form ...</h2>

      <div style={{ 'display': 'none' }} className="errMsg alert alert-danger text-center">Email or password uncorrect</div>

      <div style={{ 'display': 'none' }} className="successMsg alert alert-success text-center">Welcome Back</div>

      <form onSubmit={myFormik.handleSubmit} >


        <label className='mt-3' htmlFor="email">Email</label>
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email} id='email' placeholder='Email' className='form-control' type="email" />
        {myFormik.errors.email && myFormik.touched.email ? <div className="alert alert-danger text-center">{myFormik.errors.email}</div> : ''}

        <label className='mt-3' htmlFor="password">Password</label>
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.password} id='password' placeholder='Password' className='form-control' type="password" />
        {myFormik.errors.password && myFormik.touched.password ? <div className="alert alert-danger text-center">{myFormik.errors.password}</div> : ''}


        <button type='submit' className='btn btn-outline-primary my-3'>Login</button>

      </form>


    </div>

  </>
}
