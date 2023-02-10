import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from "react-bootstrap"
import { useLocation, useNavigate } from 'react-router-dom'
import Product from '../components/Product'
import ProductCarousel from "../components/ProductCarousel"
import { listProducts } from "../actions/productActions";
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'


const HomeScreen = () => {

  const dispatch = useDispatch()

  let location = useLocation()
  let keyword = location.search

  const productList = useSelector(state => state.productList)

  const { error, loading, products, page, pages } = productList

  const navigate = useNavigate()

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if(userInfo && userInfo.isAdmin){
      navigate('/admin')
    }
    dispatch(listProducts(keyword))
  }, [dispatch, keyword, userInfo])

  return (
    <div>
      {!keyword && <ProductCarousel />}
      
      <h1>Latest Products</h1>
      {loading ? <Loader />
        : error ? <Message variant='danger'>{error}</Message>
          :
          <div>
            <Row>
              {products.map((product) => {
                return (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                );
              })}
            </Row>
            <Paginate page={page} pages={pages} />
          </div>
      }

    </div>
  );
};

export default HomeScreen;
