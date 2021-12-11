import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import {useDispatch , useSelector} from 'react-redux'
import { placeOrder } from '../actions/orderActions'
import Loader from '../components/Loader'
import Error from '../components/Error'
import Success from '../components/Success'
export default function Checkout({amount}) {

    const dispatch = useDispatch()
    const orderstate = useSelector(state=>state.placeOrderReducer)

    const { loading , success , error } = orderstate
    function tokenHandler(token)
    {
         console.log(token);
         dispatch(placeOrder(token , amount))
    }

    function validate()
    {
        if(!localStorage.getItem('currentUser'))
        {
             window.location.href ='/login'
        }
    }

   

    return (
        <div>

            {loading && (<Loader/>)}
            {success && (<Success success='Your Order Placed Successfully'/>)}
            {error && (<Error error='Something Went wrong' />)}
            
            <StripeCheckout
            token={tokenHandler}
            amount={amount*100}
            shippingAddress
            currency='INR'
            locale='en'
            stripeKey='pk_test_51Jv0a6SBbLjr9YCNQArJKAJPLRKtirb7SHf77PQZjl7YOeYKDLpRTbRQ5fwzAG45NPejasKXVn6DLYQ1pAj3nWzC00f8NNU4y6'
            >

            <button className="btn" onClick={validate}>PAY NOW</button>

            </StripeCheckout>

        </div>
    )
}
