"use client";
import {axiosInstance} from "@/axios"
import { useEffect, useState } from "react"
import { AxiosResponse, AxiosError } from 'axios';
import { TextInput } from "@/components/Form/TextInput";

export default function Home() {
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
    <TextInput name="name" placeholder="Type your name." key={"name"}/>
  )
  
}
