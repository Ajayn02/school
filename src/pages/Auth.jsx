import React, { useState,useContext } from 'react'
import { Row, Col } from 'react-bootstrap'
import img2 from '../images/img2.png'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { registerApi, loginApi } from '../services/allApis';
import toast from 'react-hot-toast';
import { logoutContext } from '../context/Contextapi';

function Auth() {
    const [auth, setAuth] = useState(false)
    const [user, setUser] = useState({
        username: "", password: "", email: ""
    })
    const {setLogoutResponse}=useContext(logoutContext)
    const nav = useNavigate()

    const handleAuth = () => {
        setAuth(!auth)
    }

    const handleRegister = async () => {
        // console.log(user);
        const { email, password, username } = user
        if (!username || !password || !email) {
            toast.error("Enter Valid Inputs")
        } else {
            const res = await registerApi(user)
            // console.log(res);
            if (res.status == 200) {
                setUser({
                    username: "", password: "", email: ""
                })
                toast.success("Register Success")
                handleAuth()
            }

        }
    }

    const handleLogin = async () => {
        const { email, password } = user
        if (!email || !password) {
            toast.error(`Enter Valid Inputs`)
        } else {
            const res1 = await loginApi(user)
            // console.log(res1);
            if (res1.status == 200) {
                toast.success("Login Success")
                sessionStorage.setItem("token", res1.data.token)
                sessionStorage.setItem("username", res1.data.username)
                setLogoutResponse(true)
                setUser({
                    email: "", password: ""
                })
                nav("/dash")
            }

        }
    }



    return (
        <>
            <div className=' container-fluid auth d-flex justify-content-center align-items-center' style={{ minHeight: "100vh" }}>
                <div className='w-75 '>
                    <Row>
                        <Col md={6} sm={12}>
                            <img src={img2} alt="" width={"90%"} />
                        </Col>
                        <Col md={6} sm={12} className='d-flex justify-content-center align-items-center' style={{ flexDirection: "column" }}>
                            <div className='container-fluid px-5'>
                                {
                                    auth ?
                                        <h2 className='text-center mb-4'>Register</h2>
                                        :
                                        <h2 className='text-center mb-4'>Login</h2>

                                }

                                {
                                    auth &&
                                    <FloatingLabel controlId="Username" label="Username" className='mb-3'>
                                        <Form.Control type="text" placeholder="" onChange={(e) => { setUser({ ...user, username: e.target.value }) }} />
                                    </FloatingLabel>
                                }

                                <FloatingLabel controlId="email" label="Email" className='mb-3'>
                                    <Form.Control type="email" placeholder="" value={user.email} onChange={(e) => { setUser({ ...user, email: e.target.value }) }} />
                                </FloatingLabel>
                                <FloatingLabel controlId="Password" label="Password" className='mb-3'>
                                    <Form.Control type="password" placeholder="" value={user.password} onChange={(e) => { setUser({ ...user, password: e.target.value }) }} />
                                </FloatingLabel>

                                <div className='d-flex justify-content-between'>

                                    {
                                        auth ?
                                            <Link className="btn btn-link" onClick={handleAuth} >Already Have Account ?</Link>
                                            :
                                            <Link className="btn btn-link" onClick={handleAuth} >New User ?</Link>
                                    }
                                    {
                                        auth ?
                                            <button className='btn btn-warning' onClick={handleRegister}> Register</button>
                                            :
                                            <button className='btn btn-warning' onClick={handleLogin}> Login</button>
                                    }
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