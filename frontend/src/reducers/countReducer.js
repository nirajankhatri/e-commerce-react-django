import React from 'react'
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


export const productCountReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_COUNT_REQUEST:
      return { loading: true}

    case PRODUCT_COUNT_SUCCESS:
      return {
        loading: false,
        count: action.payload.productCount
      }

    case PRODUCT_COUNT_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const orderCountReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_COUNT_REQUEST:
      return { loading: true}

    case ORDER_COUNT_SUCCESS:
      return {
        loading: false,
        count: action.payload.orderCount
      }

    case ORDER_COUNT_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const userCountReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_COUNT_REQUEST:
      return { loading: true}

    case USER_COUNT_SUCCESS:
      return {
        loading: false,
        count: action.payload.userCount
      }

    case USER_COUNT_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}