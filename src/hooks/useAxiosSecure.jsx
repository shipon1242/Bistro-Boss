import axios from "axios";
import {  useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure =axios.create({
    baseURL:'https://bistro-boss-server-dun-psi.vercel.app'
})

const useAxiosSecure = () => {
    const navigate =useNavigate()
    const {logOut}=useAuth()
    //request interceptor to add authorization header for every secure call to the api
   
    // new req
    axiosSecure.interceptors.request.use(function (config){
        const token =localStorage.getItem('access-token')
        // console.log('token after set',token)
         config.headers.authorization=`Bearer ${token}`
        // console.log('set token with bearer',config.headers.authorization)
        return config
    }, function (error) {
        // Do something with request error
        
        return Promise.reject(error);
      })
      axiosSecure.interceptors.response.use(function(response){
        return response
      },function (error){
         const status =error.response.status
         if(status === 401 || status === 403){
             logOut()
            navigate('/login')
           
            
         }
         return Promise.reject(error)
         
      })

    return axiosSecure
};

export default useAxiosSecure;