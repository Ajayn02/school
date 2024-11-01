import commonApi from "./commonApi";
import base_url from "./baseUrl";

export const registerApi=async(data)=>{
    return await commonApi(`${base_url}/reg`,"POST","",data)
}

export const loginApi=async(data)=>{
    return await commonApi(`${base_url}/log`,"POST","",data)
}

export const addStudentApi=async(headers,data)=>{
    return await commonApi(`${base_url}/addstudent`,"POST",headers,data)
}

export const getStudentsApi=async(headers,searchKey)=>{
    return await commonApi(`${base_url}/addedstudents?searchKey=${searchKey}`,"GET",headers,"")
}

export const deleteStudentApi=async(id,headers)=>{
    return await commonApi(`${base_url}/deletestudent/${id}`,"DELETE",headers,{})
}

export const editStudentApi=async(id,header,data)=>{
    return await commonApi(`${base_url}/editstudent/${id}`,"PUT",header,data)
}