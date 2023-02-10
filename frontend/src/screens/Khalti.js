
import KhaltiCheckout from "khalti-checkout-web";
import myKey from "./khaltiKey";
import axios from "axios";


import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { payOrder } from '../actions/orderActions'





function Khalti() {


  const { id } = useParams()
  const orderId = id;

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const orderDetails = useSelector(state => state.orderDetails)
  const { order, error, loading } = orderDetails

  const orderPay = useSelector(state => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin


  if (!loading && !error) {
      order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
  }


  useEffect(() => {

      if (!userInfo) {
          navigate('/login')
      }

  }, [dispatch, order, orderId, successPay])


  const khaltiSuccessPaymentHandler = (paymentResult) => {
      dispatch(payOrder(orderId, paymentResult))
  }


  let config = {

    publicKey: myKey.publicTestKey,
    productIdentity: "aat9101234",
    productName: "Aama Arts Test",
    productUrl: "http://localhost:3000",
    eventHandler: {
      onSuccess(payload) {
        // hit merchant api for initiating verfication
        console.log(payload);
        let data = {
          token: payload.token,
          amount: payload.amount,
        };

        axios
          .get(
            `https://meslaforum.herokuapp.com/khalti/${data.token}/${data.amount}/${myKey.secretTestKey}`
          )
          .then((response) => {

            khaltiSuccessPaymentHandler(response.data.data.idx)

          })
          .catch((error) => {
            console.log(error);
          });
      },
      // onError handler is optional
      onError(error) {
        // handle errors
        console.log(error);
      },
      onClose() {
        console.log("widget is closing");
      },
    },
    paymentPreference: [
      "KHALTI",
    ],
  };

  let buttonStyles = {
    width: "100%",
    backgroundColor: "purple",
    padding: "10px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    border: "1px solid white",
  };
  let checkout = new KhaltiCheckout(config);
  return (
    <div>
      <button onClick={() => checkout.show({ amount: (order.totalPrice * 100).toFixed(2) })} style={buttonStyles}>Pay via Khalti</button>
    </div>
  )
}

export default Khalti;