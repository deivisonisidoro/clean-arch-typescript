"use client";
import {axiosInstance} from "@/axios"
import { useEffect, useState } from "react"
import { AxiosResponse, AxiosError } from 'axios';
import { TextInput } from "@/components/Form/TextInput";
import { FormContainer } from "@/components/Form/FormContainer";

export default function RegisterUser() {
  const [data, setData] = useState({
    body: [],
    total: 0,
    page: 1,
    last_page: 1
  })
  const [message, setMessage] = useState("")

  const fetchData = async () =>{
    try{
      const { data }: AxiosResponse  = await axiosInstance.get("/users/?page=1")
      setData(data)
    }catch(error){
      if (error instanceof AxiosError){
        if (error.response) {
          setMessage(error.response.data.detail);
        }
      }
      
    }
  }
  useEffect(()=>{
    fetchData()
  },[])

  return  (
    <div className="w-full max-w-xs">
      <FormContainer>
        <div className="mb-4">
          <TextInput name="name" placeholder="Type your name here."/>
        </div>
      </FormContainer>
    </div>
  )
  
}
