import React from 'react'
import { Row,Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import img1 from '../images/img1.png'

function Landing() {
    return (
        <>
            <div className='container-fluid d-flex justify-content-center align-items-center' style={{minHeight:"87vh"}}>
                <div className='container  p-5'>
                    <Row>
                        <Col md={6} sm={12} className=' d-flex justify-content-center align-items-center' style={{flexDirection:"column"}}>
                        <h2 className='me-auto mb-3'>Elevate education, <br />
                        simplify management</h2>
                        <p style={{textAlign:"justify"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque sapiente optio illum quia molestiae pariatur consequatur provident delectus placeat dolor aliquid, eum, quo iure id fugiat vel. Repudiandae, dolor ea? Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis iste neque nisi porro non architecto tempore, corrupti assumenda voluptatibus placeat ab eveniet veniam voluptates sed perferendis nulla deserunt! Omnis, optio!</p>
                        <Link to={'/auth'} className='btn btn-info px-5 me-auto'>Let's Go</Link>
                        </Col>
                        <Col md={6} sm={12} className='d-flex justify-content-center align-items-center'>
                            <img src={img1} alt="" style={{width:"90%"}} />
                        </Col>
                    </Row>

                </div>
            </div>
        </>
    )
}

export default Landing