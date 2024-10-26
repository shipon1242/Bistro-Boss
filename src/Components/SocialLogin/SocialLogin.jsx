import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const {googleLogin}=useAuth()
 const axiosPublic =useAxiosPublic()
 const navigate = useNavigate()
 const location =useLocation()
 
    const handleGoogleLogin=()=>{
        googleLogin()
        .then(result=>{
            // console.log(result.user)
            const userinfo={
                name:result.user?.displayName,
                email:result.user?.email
            }
            
            axiosPublic.post('/user',userinfo)
            .then(res=>{
                // console.log(res.data)
                navigate(location.state?.from?.pathname || "/")
            })
        })
    }
    return (
        <div className="mx-auto ">
            <div >
                <button onClick={handleGoogleLogin} className="btn text-black btn-sm text-lg mt-2 mb-4 bg-white hover:bg-gray-400 ">
                <FcGoogle className="w-6 h-6  " />Login with google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;