import React ,{useEffect ,useContext}from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { logoutContext } from '../context/Contextapi';

function Header() {

    const {setLogoutResponse}=useContext(logoutContext)

    const nav=useNavigate()
    const handleLogout=async()=>{
        sessionStorage.clear()
        setLogoutResponse(false)
        nav('/')

    }
    return (
        <>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home" style={{fontSize:"25px"}}>
                    <i className="fa-solid fa-school fa-lg me-2" style={{color: "#178bd3",}} />
                        
                        Student Management
                    </Navbar.Brand>
                    <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                </Container>
            </Navbar>
        </>
    )
}

export default Header