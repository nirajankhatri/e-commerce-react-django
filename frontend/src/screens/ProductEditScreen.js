import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'


function ProductEditScreen() {

    const navigate = useNavigate()
    const { id } = useParams()
    const productId = id

    const initialFormValues = { name: "", price: "", image: "", category: "", countInStock: "", description: "" };
    const initialErrorValues = { name: "", price: "", image: "", category: "", countInStock: "", description: "" };
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState(initialErrorValues);

    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate


    useEffect(() => {
        if (!userInfo) {
            navigate("/login");
        } 
        else if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/admin/productlist')
        } else if (!product.name || product._id !== Number(productId)) {
            dispatch(listProductDetails(productId))
        } else if (product.name && product._id == Number(productId) && Object.keys(formErrors).length === 6) {
            setFormValues({
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category,
                countInStock: product.countInStock,
                description: product.description
            });
        }
        else if (Object.keys(formErrors).length === 0) {
            dispatch(updateProduct({
                _id: productId,
                name: formValues.name,
                price: formValues.price,
                image: formValues.image,
                category: formValues.category,
                countInStock: formValues.countInStock,
                description: formValues.description
            }))
        }

    }, [dispatch, userInfo, product, productId, successUpdate, formErrors])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const submitHandler = (e) => {
        e.preventDefault()
        setFormErrors(validate(formValues))
    }

    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = "Name is required!";
        }
        if (!values.price) {
            errors.price = "Price is required!";
        } else if (values.price < 0) {
            errors.price = "Price cannot be nagative!";
        }
        if (!values.image) {
            errors.image = "Image is required";
        }
        if (!values.category) {
            errors.category = "Category is required";
        }
        if (!values.countInStock) {
            errors.countInStock = "CountInStock is required";
        } else if (values.countInStock < 0) {
            errors.countInStock = "CountInStock cannot be nagative!";
        }
        if (!values.description) {
            errors.description = "Description is required";
        }
        return errors;
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', productId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('http://127.0.0.1:8000/api/products/upload/', formData, config)

            setFormValues({ ...formValues, ['image']: data });
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }

    return (
        <div>
            <Link to='/admin/productlist'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control

                                    type='name'
                                    name='name'
                                    placeholder='Enter name'
                                    value={formValues.name}
                                    onChange={handleChange}
                                >
                                </Form.Control>
                                <p className='text-danger'>{formErrors.name}</p>

                            </Form.Group>

                            <Form.Group controlId='price'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control

                                    type='number'
                                    name='price'
                                    placeholder='Enter price'
                                    value={formValues.price}
                                    onChange={handleChange}
                                >
                                </Form.Control>
                                <p className='text-danger'>{formErrors.price}</p>

                            </Form.Group>


                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control

                                    type='text'
                                    name='image'
                                    placeholder='Enter image'
                                    value={formValues.image}
                                    onChange={handleChange}
                                >
                                </Form.Control>

                                <Form.Control
                                    type='file'
                                    label='Choose File'
                                    custom
                                    onChange={uploadFileHandler}
                                >

                                </Form.Control>
                                {uploading && <Loader />}
                                <p className='text-danger'>{formErrors.image}</p>

                            </Form.Group>

                            <Form.Group controlId='countinstock'>
                                <Form.Label>Stock</Form.Label>
                                <Form.Control

                                    type='number'
                                    name='countInStock'
                                    placeholder='Enter stock'
                                    value={formValues.countInStock}
                                    onChange={handleChange}
                                >
                                </Form.Control>
                                <p className='text-danger'>{formErrors.countInStock}</p>

                            </Form.Group>

                            <Form.Group controlId='category'>
                                <Form.Label>Category</Form.Label>
                                <Form.Control

                                    type='text'
                                    name='category'
                                    placeholder='Enter category'
                                    value={formValues.category}
                                    onChange={handleChange}
                                >
                                </Form.Control>
                                <p className='text-danger'>{formErrors.category}</p>

                            </Form.Group>

                            <Form.Group controlId='description'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control

                                    type='text'
                                    name='description'
                                    placeholder='Enter description'
                                    value={formValues.description}
                                    onChange={handleChange}
                                >
                                </Form.Control>
                                <p className='text-danger'>{formErrors.description}</p>

                            </Form.Group>


                            <Button type='submit' variant='primary'>
                                Update
                            </Button>

                        </Form>
                    )}

            </FormContainer >
        </div>

    )
}

export default ProductEditScreen