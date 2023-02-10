import axios from 'axios'
import {
  PRODUCT_COUNT_REQUEST,
  PRODUCT_COUNT_SUCCESS,
  PRODUCT_COUNT_FAIL,
  ORDER_COUNT_REQUEST,
  ORDER_COUNT_SUCCESS,
  ORDER_COUNT_FAIL,
  USER_COUNT_REQUEST,
  USER_COUNT_SUCCESS,
  USER_COUNT_FAIL,
} from '../constants/countConstants'


export const countProduct = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_COUNT_REQUEST })

    const { data } = await axios.get('http://127.0.0.1:8000/api/products/countproduct')

    dispatch({ type: PRODUCT_COUNT_SUCCESS, payload: data })

  } catch (error) {
    dispatch({
      type: PRODUCT_COUNT_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail : error.message
    })
  }
}


export const countOrder = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_COUNT_REQUEST })

    const { data } = await axios.get('http://127.0.0.1:8000/api/orders/countorder')

    dispatch({ type: ORDER_COUNT_SUCCESS, payload: data })

  } catch (error) {
    dispatch({
      type: ORDER_COUNT_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail : error.message
    })
  }
}


export const countUser = () => async (dispatch) => {
  try {
    dispatch({ type: USER_COUNT_REQUEST })

    const { data } = await axios.get('http://127.0.0.1:8000/api/users/countuser')

    dispatch({ type: USER_COUNT_SUCCESS, payload: data })

  } catch (error) {
    dispatch({
      type: USER_COUNT_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail : error.message
    })
  }
}
