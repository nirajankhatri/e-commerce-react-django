import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const RegisterScreen = () => {

  const initialValues = { name: "", email: "", password: "", confirmPassword: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);

  const [message, setMessage] = useState('');

  const dispatch = useDispatch()

  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/'

  const userRegister = useSelector(state => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const userLogin = useSelector(state => state.userLogin)

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };


  const submitHandler = (e) => {
    e.preventDefault()
    setFormErrors(validate(formValues))
  }

  useEffect(() => {
    if (userLogin.userInfo) {
      navigate(redirect)
    }
    else if (Object.keys(formErrors).length === 0) {
      dispatch(register(formValues.name, formValues.email, formValues.password))
    }
  }, [userInfo, navigate, redirect, dispatch, formErrors])


  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (values.password !== values.confirmPassword) {
      errors.password = "Passwords do not match";
    }
    return errors;
  };


  return (
    <FormContainer>
      <h1>Sign Up</h1>

      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {message && <Message variant='danger'>{message}</Message>}

      <Form onSubmit={submitHandler}>

        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            name='name'
            placeholder='Enter name'
            value={formValues.name}
            onChange={handleChange}
          >
          </Form.Control>
          <p className='text-danger'>{formErrors.name}</p>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='text'
            name='email'
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
            name='password'
            placeholder='Enter Password'
            value={formValues.password}
            onChange={handleChange}
          >
          </Form.Control>
          <p className='text-danger'>{formErrors.password}</p>
        </Form.Group>

        <Form.Group controlId='passwordConfirm'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            name='confirmPassword'
            placeholder='Confirm Password'
            value={formValues.confirmPassword}
            onChange={handleChange}
          >
          </Form.Control>
          <p className='text-danger'>{formErrors.confirmPassword}</p>
        </Form.Group>
        <Button className='mt-4' type='submit' variant='primary'>Register</Button>

      </Form>
      <Row className='mt-4'>
        <Col>
          Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Sign In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
