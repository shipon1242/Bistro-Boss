import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import useAxiosPublic from "./useAxiosPublic"

const UseMenu =()=>{
    // const [menu,setMenu]=useState([])
    // const [loading,setLoading]=useState(true)
    const axiosPublic =useAxiosPublic()

    


    // useEffect(()=>{
       
    //     // fetch('https://bistro-boss-server-dun-psi.vercel.app/menu')
    //     // .then(res=>res.json())
    //     // .then(data=>{
    //     //     // console.log(data)
            
    //     //     setMenu(data)
    //     //     setLoading(false)
        
    //     // })
    // },[])

    const {data:menu=[],isPending:loading,refetch}=useQuery({
        queryKey:['menu'],
        queryFn: async() => {
           const res = await axiosPublic.get('/menu');
           return res.data
        }
    })

    return [menu,loading,refetch]



    
}
export default UseMenu