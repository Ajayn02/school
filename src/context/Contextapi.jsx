import React,{createContext,useState} from 'react'

export const addResponseContext=createContext()
export const editResponseContext=createContext()
export const logoutContext=createContext()

function Contextapi({children}) {
    const [dataGetResponse,setDataGetResponse]=useState('')
    const [editResponse,setEditResponse]=useState('')
    const [logoutResponse,setLogoutResponse]=useState(false)

  return (
    <addResponseContext.Provider value={{dataGetResponse,setDataGetResponse}}>
      <editResponseContext.Provider value={{editResponse,setEditResponse}}>
        <logoutContext.Provider value={{logoutResponse,setLogoutResponse}}>
        {children}
        </logoutContext.Provider>
        </editResponseContext.Provider>
    </addResponseContext.Provider>
  )
}

export default Contextapi