import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const Checkout = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();
    const navigate = useNavigate();


    const { data, error: queryError, isLoading: queryLoading, refetch } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
          const res = await axiosSecure.get(`/users/${user?.email}`);
          return res.data;
        },
        enabled: !!user?.email && !loading,
        retry: false,
    });

    const totalPrice = parseInt(data?.package);

    let max_employee;

    if (totalPrice === 5) {
        max_employee = 5;
    } else if (totalPrice === 8) {
        max_employee = 10;
    } else if (totalPrice === 15) {
        max_employee = 20;
    } else {
        
        max_employee = 0;
    }

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log('Client Secret:', res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
                .catch(error => {
                    console.error('Error creating payment intent:', error);
                });
        }
    }, [axiosSecure, totalPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('Payment Error:', error);
            setError(error.message);
        } else {
            console.log('Payment Method:', paymentMethod);
            setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                },
            },
        });

        if (confirmError) {
            console.log('Confirm Error:', confirmError);
        } else {
            console.log('Payment Intent:', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('Transaction ID:', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    status: 'pending',
                };

                try {
                    const res = await axiosSecure.post('/payments', payment);
                    console.log('Payment Saved:', res.data);
                    if (res.data?.paymentResult?.insertedId) {
                        toast.success("Payment successful!");
                        navigate('/checkout/history');
                        const updateRes = await axiosSecure.put(`/payments/${res.data.paymentResult.insertedId}`, { status: 'success' });

                        const userUpdateResponse = await axiosSecure.put(`/users?email=${user?.email}`, {
                            paid: true,
                            enroll_expired_in: 30,
                            max_employee: max_employee
                        });

                    }
                } catch (error) {
                    console.error('Error saving payment:', error);
                }
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-96 p-6">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-center mb-4">Checkout</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Card Details</label>
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                            className="p-3 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <button
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                        type="submit"
                        disabled={!stripe || !clientSecret}
                    >
                        Pay ${totalPrice}
                    </button>
                    {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
                    {transactionId && <p className="text-green-600 mt-2 text-center">Your transaction ID: {transactionId}</p>}
                </form>
            </div>
        </div>
    );
};

export default Checkout;
