import React, { useState,useEffect , useContext} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import { addStudentApi } from '../services/allApis';
import toast from 'react-hot-toast';
import { addResponseContext } from '../context/Contextapi';


function Add() {
    const [show, setShow] = useState(false);
    const [data,setData]=useState({
        name:"",phonenumber:"",email:"",image:"",dob:"",batch:""
    })
    const [preview,setPreview]=useState('')

    const {setDataGetResponse}=useContext(addResponseContext)

    useEffect(()=>{
        if(data.image){
            setPreview(URL.createObjectURL(data.image))
        }else{
            setPreview("")
        }
    },[data.image])


    const handleAddStudent=async()=>{
        // console.log(data);
        const {name,email,dob,phonenumber,image,batch}=data
        if(!name || !email || !dob || !phonenumber || !image || !batch){
            toast.error("Enter Valid Inputs")
        }else{

            const headers={
                "Content-Type":"multipart/form-data",
                "Authorization":`Token ${sessionStorage.getItem('token')}`
            }
            const fd=new FormData()
            fd.append('name',name)
            fd.append('email',email)
            fd.append('dob',dob)
            fd.append('phonenumber',phonenumber)
            fd.append('image',image)
            fd.append('batch',batch)

            const res=await addStudentApi(headers,fd)
            // console.log(res);
            if(res.status==200){
                toast.success("Added")
                setDataGetResponse(res)
                handleClose()
            }else{
                toast.error("Adding Failed")
            }
            
        }
        
    }

    const handleClose = () =>{
        setData({
            name:"",phonenumber:"",email:"",image:"",dob:"",batch:""
        })
        setShow(false);
    } 
    const handleShow = () => setShow(true);
    return (
        <>
            <button className='btn btn-success my-5' onClick={handleShow}>Add +</button>

            {/* modal */}
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} >
                <Modal.Header closeButton>
                    <Modal.Title>Add Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col className='d-flex justify-content-center align-items-center'>
                            <label >
                                <input type="file" style={{ display: "none" }}  onChange={(e)=>{setData({...data,image:e.target.files[0]})}}/>
                                <img src={preview?preview:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDAW3c4VeojGKTpXQCtoLQG0_VWjzJwVdAEQ&s"} alt="" width={"100%"} style={{ cursor: "pointer" }} />
                            </label>
                        </Col>
                        <Col >

                            <FloatingLabel controlId="Name" label="Name" className='mb-3'>
                                <Form.Control type="text" placeholder="" onChange={(e)=>{setData({...data,name:e.target.value})}} />
                            </FloatingLabel>
                            <FloatingLabel controlId="DOB" label="DOB" className='mb-3'>
                                <Form.Control type="date" placeholder=""  onChange={(e)=>{setData({...data,dob:e.target.value})}} />
                            </FloatingLabel>
                            <FloatingLabel controlId="Phone" label="Phone Number" className='mb-3'>
                                <Form.Control type="tel" name='phone' placeholder=""  onChange={(e)=>{setData({...data,phonenumber:e.target.value})}} />
                            </FloatingLabel>
                            <FloatingLabel controlId="Class" label="batch" className='mb-3'>
                                <Form.Control type="text" placeholder=""  onChange={(e)=>{setData({...data,batch:e.target.value})}} />
                            </FloatingLabel>
                            <FloatingLabel controlId="email" label="Email" className='mb-3'>
                                <Form.Control type="email" placeholder=""  onChange={(e)=>{setData({...data,email:e.target.value})}} />
                            </FloatingLabel>


                        </Col>
                    </Row>                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddStudent}>Add</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Add