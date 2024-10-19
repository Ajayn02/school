import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
    return (
        <>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home" style={{fontSize:"25px"}}>
                    <i className="fa-solid fa-school fa-lg me-2" style={{color: "#178bd3",}} />
                        
                        Student Management
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
}

export default Header