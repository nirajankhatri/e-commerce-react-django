import React, { useState, useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = () => {

    const navigate = useNavigate();

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState("")

    if (!shippingAddress.address) {
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal'
                            id='paypal'
                            name='paymentMethod'
                            value='PayPal'
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >

                        </Form.Check>
                    </Col>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='Khalti'
                            id='khalti'
                            name='paymentMethod'
                            value='Khalti'
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >

                        </Form.Check>
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary' className="mt-4">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
