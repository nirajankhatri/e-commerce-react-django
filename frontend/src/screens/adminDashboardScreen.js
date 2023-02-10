import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import ShowCount from "../components/ShowCount";
import { countProduct, countOrder, countUser } from "../actions/countActions";


const AdminDashboardScreen = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productCount = useSelector(state => state.productCount.count);
  const orderCount = useSelector(state => state.orderCount.count);
  const userCount = useSelector(state => state.userCount.count);



  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    dispatch(countProduct())
    dispatch(countUser())
    dispatch(countOrder())
  }, [userInfo, navigate])



  return (
    <div className="ShowCountContainer">
      <ShowCount title="Total Products" count={productCount}/>
      <ShowCount title=" Unfulfilled Orders" count={orderCount}/>
      <ShowCount title="Total Users" count={userCount}/>
    </div>
  );
}

export default AdminDashboardScreen;
