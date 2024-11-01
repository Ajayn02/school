import React, { useState , useEffect , useContext} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import base_url from '../services/baseUrl';
import { editStudentApi } from '../services/allApis';
import toast from 'react-hot-toast';
import { editResponseContext } from '../context/Contextapi';

function Edit({data}) {
    const [show, setShow] = useState(false);
    const [details,setDetails]=useState({...data})
    const [preview,setPreview]=useState("")

    const{setEditResponse }=useContext(editResponseContext)
 
    useEffect(()=>{
        if(details.image.type){
            setPreview(URL.createObjectURL(details.image))
        }
        else{
            setPreview("")
        }
    },[details.image])


    const handleEdit=async()=>{
        // console.log(details);
        
        const {name,dob,image,phonenumber,batch}=details
        if(!name || !dob || !image || !phonenumber || !batch ){
            toast.error("Enter Valid Inputs")
        }else{
            if(image.type){
                const headers={
                    "Content-Type":"multipart/form-data",
                    "Authorization":`Token ${sessionStorage.getItem('token')}`
                }
                const fd=new FormData()
                fd.append('name',name)
                fd.append('dob',dob)
                fd.append('phonenumber',phonenumber)
                fd.append('image',image)
                fd.append('batch',batch)

                const res= await editStudentApi(details._id,headers,fd)
                // console.log(res);
                
                if(res.status==200){
                    toast.success("Update Success")
                    setEditResponse(res)
                    handleClose()
                    setDetails({...res.data})
                }else{
                    toast.error("Update Failed")
                    console.log(res);
                }
            }else{
                const headers={
                    "Content-Type":"application/json",
                    "Authorization":`Token ${sessionStorage.getItem('token')}`
                }
                const res= await editStudentApi(details._id,headers,details)
                // console.log(res);
                if(res.status==200){
                    toast.success("Update Success")
                    setEditResponse(res)
                    handleClose()
                    setDetails({...res.data})
                }else{
                    toast.error("Update Failed")
                    console.log(res);
                }
            }
          
        }
        
    }

    const handleClose = () =>{
        setPreview('')
        setShow(false);
    } 
    const handleShow = () => setShow(true);
    
    return (
        <>
            <button className='btn  ' onClick={handleShow}>
                <i className="fa-solid fa-pen-to-square fa-xl " style={{ color: "white", }} />
            </button>

             {/* modal */}
             <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} >
                <Modal.Header closeButton>
                    <Modal.Title>Add Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col className='d-flex justify-content-center align-items-center'>
                            <label >
                                <input type="file" style={{display:"none"}} onChange={(e)=>{setDetails({...details,image:e.target.files[0]})}} />
                                <img src={preview?preview:`${base_url}/uploads/${data.image}`} alt="" width={"100%"} style={{cursor:"pointer"}}/>
                            </label>
                        </Col>
                        <Col >

                            <FloatingLabel controlId="Name" label="Name" className='mb-3'>
                                <Form.Control type="text" defaultValue={data?.name} placeholder="" onChange={(e)=>{setDetails({...details,name:e.target.value})}} />
                            </FloatingLabel>
                            <FloatingLabel controlId="DOB" label="DOB" className='mb-3'>
                                <Form.Control type="date" defaultValue={data?.dob} placeholder="" onChange={(e)=>{setDetails({...details,dob:e.target.value})}}  />
                            </FloatingLabel>
                            <FloatingLabel controlId="Phone" label="Phone Number" className='mb-3'>
                                <Form.Control type="tel" name='phone' defaultValue={data?.phonenumber} placeholder="" onChange={(e)=>{setDetails({...details,phonenumber:e.target.value})}}  />
                            </FloatingLabel>
                            <FloatingLabel controlId="Class" label="Class Name" className='mb-3'>
                                <Form.Control type="text" placeholder="" defaultValue={data?.batch} onChange={(e)=>{setDetails({...details,batch:e.target.value})}}  />
                            </FloatingLabel>
                            


                        </Col>
                    </Row>                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleEdit}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Edit