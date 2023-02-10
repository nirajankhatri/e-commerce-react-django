import React, { useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Button, Card, Form } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'


const CartScreen = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const qty = Number(searchParams.get('qty'));

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty))
    }
  }, [dispatch, id, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    navigate('/shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shooping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant='info'>Your cart is empty <Link to='/'>Go Back</Link></Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row>

                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>

                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>

                  <Col md={2}>
                    Rs.{item.price}
                  </Col>

                  <Col md={3}>
                    <Form.Select 
                      value={item.qty}
                      onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                        {
                          [...Array(item.countInStock).keys()].map((x) => (
                            <option key={x+1} value={x+1}>
                              {x+1}
                            </option>
                          ))
                        }
                      </Form.Select>
                  </Col>

                  <Col md={1}>
                        <Button 
                          type='button' 
                          variant='light'
                          onClick={() => removeFromCartHandler(item.product)}  
                        >
                          <i className='fa fa-trash'></i>
                        </Button>
                  </Col>

                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
                        <ListGroup.Item>
                          <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                          {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
          </ListGroup>

          <ListGroup.Item>
            <Button 
              type='button' 
              className='btn-block'
              onClick={checkoutHandler} 
              disabled={cartItems.length === 0} 
              style={{ width: '-webkit-fill-available' }}
            >
              Proceed To Checkout
            </Button>
          </ListGroup.Item>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen