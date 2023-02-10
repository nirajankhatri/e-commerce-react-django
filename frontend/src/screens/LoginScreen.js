import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const LoginScreen = () => {

  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({email: "", password: ""});


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const dispatch = useDispatch()

  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/'

  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const navigate = useNavigate()




  const submitHandler = (e) => {
    e.preventDefault()
    setFormErrors(validate(formValues))

  }

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
    if (Object.keys(formErrors).length === 0) {
      dispatch(login(formValues.email, formValues.password))
    }
  }, [userInfo, navigate, redirect, dispatch, formErrors])

  
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>

      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='text'
            name="email"
            placeholder='Enter Email'
            value={formValues.email}
            onChange={handleChange}
          >
          </Form.Control>
          <p className='text-danger'>{formErrors.email}</p>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name="password"
            placeholder='Enter Password'
            value={formValues.password}
            onChange={handleChange}
          >
          </Form.Control>
          <p className='text-danger'>{formErrors.password}</p>
        </Form.Group>

        <Button className='mt-4' type='submit' variant='primary'>Sign In</Button>
      </Form>

      <Row className='mt-4'>
        <Col>
          New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen