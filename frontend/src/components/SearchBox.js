import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'

function SearchBox() {
    const [keyword, setKeyword] = useState('')

    let navigate = useNavigate()
    let location = useLocation()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            navigate(`/?keyword=${keyword}&page=1`)
        } else {
            navigate(navigate(location.pathname))
        }
    }
    return (
        <Form className="d-flex" onSubmit={submitHandler} >
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5'
                placeholder='Search...'
            ></Form.Control>

            <Button
                type='submit'
                variant='outline-success'
                className='p-2'
            >
                Search
            </Button>
        </Form>
    )
}

export default SearchBox
