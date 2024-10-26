import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckOutform = () => {
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const stripe = useStripe()
    const elements = useElements()
    const axiosSecure = useAxiosSecure()
    const navigate =useNavigate()
    const { user } = useAuth()
    const [carts, refetch] = useCart()
    const price = carts.reduce((total, item) => total + item.price, 0)
    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, price])


    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)
        if (card == null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('payment error', error)
            setError(error.message)
        }
        else {
            console.log('payment method', paymentMethod)
            setError('')
        }
        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            // console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                // console.log('transaction id', paymentIntent.id)
                setTransactionId(paymentIntent.id)

                // now save the payment in the database
                const date =new Date()
                const formattedDate = date.toLocaleDateString("en-BD")
                const formattedTime =date.toLocaleTimeString("en-BD",{
                    hour:"2-digit",
                   minute:"2-digit"
                })
                const dateTime =`${formattedDate} ${formattedTime}`
                const payment = {
                    email: user?.email,
                    price: price,
                    transactionId: paymentIntent.id,
                    date: dateTime, // utc date convert. use moment js to
                    cartIds: carts.map(item => item._id),
                    menuItemIds: carts.map(item => item.menuId),
                    status: 'pending'

                }
                const res = await axiosSecure.post('/payments', payment)
                console.log('payment save', res.data)
                refetch()
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thanks for the payment",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/paymentHistory')

                }
            }
        }


    }
    return (
        <form onSubmit={handleSubmit} className="border mt-2 bg-emerald-200">
            <CardElement className=" p-8    "
                options={{
                    style: {
                        base: {
                            fontSize: '20px',

                            color: '#424770',

                            '::placeholder': {
                                color: '#aab7c4',

                            },

                        },
                        invalid: {
                            color: '#9e2146',
                        }


                    },
                }}
            >
            </CardElement>
            <div className="mx-auto  text-center pb-6">
                <button className="btn btn-sm btn-warning   text-white my-4 btn-wide text-lg " type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </div>
            <p className="text-red-600 text-center pb-4"> {error}</p>
            {
                transactionId && <p className="text-green-600 text-center pb-4">
                    Your transactionId : {transactionId}
                </p>
            }
        </form>
    );
};

export default CheckOutform;