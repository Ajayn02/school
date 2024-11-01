import React, { useState, useEffect, useContext } from 'react'
import Header from '../components/Header'
import Table from 'react-bootstrap/Table';
import Add from '../components/Add';
import Edit from '../components/Edit';
import { getStudentsApi, deleteStudentApi } from '../services/allApis';
import { addResponseContext, editResponseContext ,logoutContext } from '../context/Contextapi';
import toast from 'react-hot-toast';



function Dashboard() {
    const [data, setData] = useState({})
    const [searchKey, setSearchKey] = useState('')

    const { dataGetResponse } = useContext(addResponseContext)
    const { editResponse } = useContext(editResponseContext)
    useEffect(() => {
        displayData()
    }, [dataGetResponse, editResponse,searchKey])


    const displayData = async () => {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Token ${sessionStorage.getItem('token')}`
        }
        const res = await getStudentsApi(headers,searchKey)
        // console.log(res);
        if (res.status == 200) {
            setData(res.data)
        } else {
            console.log(res);
        }

    }

    const handleDelete = async (id) => {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Token ${sessionStorage.getItem('token')}`
        }

        const res1 = await deleteStudentApi(id, headers)
        if (res1.status == 200) {
            toast.success("Deleted")
            displayData()
        } else {
            toast.error("Something Wend Wrong")
            console.log(res1);
        }

    }
    // console.log(searchKey);

   

    return (
        <>
            <Header />

            <div className='container'>
                
                <div className='d-flex justify-content-between align-items-center' >
                <Add />
                    <div >
                        <input type="text" className='form-control' placeholder='search' onChange={(e) => { setSearchKey(e.target.value) }} />
                    </div>
                </div>


                <div>
                    {
                        data?.length > 0 ?
                            <Table striped bordered hover className='text-center'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Class</th>
                                        <th>Phone</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item, index) => (
                                            <tr key={item._id}>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.batch} </td>
                                                <td>{item.phonenumber}</td>
                                                <td >
                                                    <Edit data={item} />
                                                </td>
                                                <td>
                                                    <button className='btn' onClick={() => { handleDelete(item._id) }}>
                                                        <i className="fa-solid fa-trash fa-xl" style={{ color: "#cd233c", }} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </Table>


                            :
                            <h3 className='text-center'>No Data Added Yet</h3>
                    }



                </div>
            </div>



        </>
    )
}

export default Dashboard