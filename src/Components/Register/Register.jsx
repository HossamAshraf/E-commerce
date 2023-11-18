import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import $ from 'jquery'
import { useNavigate } from 'react-router-dom'

export default function Register() {

  let user = {
    name: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
  }

let navigate = useNavigate()

  async function registerNewUser(obj) {

    try {

      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', obj)
      console.log(data);
      if (data.message === "success") {
        $('.successMsg').fadeIn(1000, function () {
         navigate("/login")

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
      registerNewUser(values)

    },
    validate: function (values) {

      let errors = {}

      if (values.name.length < 3 || values.name.length > 10) {
        errors.name = "Name must be more than 3 character and less than 10 character";
      }
      if (values.email.includes("@") === false || values.email.includes(".com") === false) {
        errors.email = "Emaile must be valid";
      }
      if (!values.phone.match(/^01[0125][0-9]{8}$/)) {
        errors.phone = "Phone must be egyption number";
      }
      if (values.password.length < 6 || values.password.length > 12) {
        errors.password = "Password must be from 6 character to 12 character";
      }
      if (values.password !== values.rePassword) {
        errors.rePassword = "Password and Repassword not matched";
      }
      return errors;
    }
  })

  return <>

    <div className="container">

      <h2>Registration Form ...</h2>

      <div style={{ 'display': 'none' }} className="errMsg alert alert-danger text-center">Account Already Exists</div>

      <div style={{ 'display': 'none' }} className="successMsg alert alert-success text-center">Congratulation</div>

      <form onSubmit={myFormik.handleSubmit} >

        <label className='mt-3' htmlFor="name">Name</label>
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.name} id='name' placeholder='Name' className='form-control' type="text" />
        {myFormik.errors.name && myFormik.touched.name ? <div className="alert alert-danger text-center">{myFormik.errors.name}</div> : ''}

        <label className='mt-3' htmlFor="email">Email</label>
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email} id='email' placeholder='Email' className='form-control' type="email" />
        {myFormik.errors.email && myFormik.touched.email ? <div className="alert alert-danger text-center">{myFormik.errors.email}</div> : ''}

        <label className='mt-3' htmlFor="phone">phone</label>
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.phone} id='phone' placeholder='Phone' className='form-control' type="text" />
        {myFormik.errors.phone && myFormik.touched.phone ? <div className="alert alert-danger text-center">{myFormik.errors.phone}</div> : ''}

        <label className='mt-3' htmlFor="password">Password</label>
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.password} id='password' placeholder='Password' className='form-control' type="password" />
        {myFormik.errors.password && myFormik.touched.password ? <div className="alert alert-danger text-center">{myFormik.errors.password}</div> : ''}

        <label className='mt-3' htmlFor="rePassword">RePassword</label>
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.rePassword} id='rePassword' placeholder='RePassword' className='form-control' type="password" />
        {myFormik.errors.rePassword && myFormik.touched.rePassword ? <div className="alert alert-danger text-center">{myFormik.errors.rePassword}</div> : ''}

        <button type='submit' className='btn btn-outline-primary my-3'>Register</button>

      </form>


    </div>

  </>
}
