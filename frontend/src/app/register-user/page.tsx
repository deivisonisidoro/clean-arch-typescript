"use client";
import {axiosInstance} from "@/axios"
import { useEffect, useState } from "react"
import { AxiosResponse, AxiosError } from 'axios';
import { TextInput } from "@/components/Form/TextInput";
import { FormContainer } from "@/components/Form/FormContainer";
import { Label } from "@/components/Form/Label";
import { PasswordInput } from "@/components/Form/PasswordInput";

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
    <div className="flex items-center justify-center h-screen">
      <FormContainer>
        <div className="mb-4">
          <Label text="Name" nameField="name"/>
          <TextInput name="name" placeholder="Type your name here."/>
        </div>
        <div className="mb-6">
          <Label text="Password" nameField="password"/>
          <PasswordInput name="password" placeholder="Type your password here."/>
        </div>
      </FormContainer>
    </div>
  )
  
}
