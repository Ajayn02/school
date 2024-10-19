import React,{useState} from 'react'
import { Row, Col } from 'react-bootstrap'
import img2 from '../images/img2.png'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useState } from 'react'

function Auth() {

    const [auth,setAuth]=useState(false)

    const handleAuth=()=>{
        setAuth(!auth)
    }



    return (
        <>
            <div className=' container-fluid d-flex justify-content-center align-items-center' style={{ minHeight: "100vh" }}>
                <div className='w-75 border'>
                    <Row>
                        <Col md={6} sm={12}>
                            <img src={img2} alt="" width={"90%"} />
                        </Col>
                        <Col md={6} sm={12} className='d-flex justify-content-center align-items-center' style={{ flexDirection: "column" }}>
                            <div className='container-fluid px-5'>
                                <h2 className='text-center mb-4'>Register</h2>
                                {
                                    auth ?
                                }
                                <FloatingLabel controlId="Username" label="Username" className='mb-3'>
                                    <Form.Control type="text" placeholder="" />
                                </FloatingLabel>
                                <FloatingLabel controlId="email" label="Email" className='mb-3'>
                                    <Form.Control type="email" placeholder="" />
                                </FloatingLabel>
                                <FloatingLabel controlId="Password" label="Password" className='mb-3'>
                                    <Form.Control type="password" placeholder="" />
                                </FloatingLabel>
                                <div className='d-flex justify-content-between'>
                                    <Link className="btn btn-link" onClick={handleAuth} >Already Have Account ?</Link>
                                    <button className='btn btn-warning'> Register</button>
                                </div>
                            </div>
                            
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default Auth