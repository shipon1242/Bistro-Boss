  import { useContext, useEffect,  useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';
import useAuth from '../../hooks/useAuth';

const Login = () => {

    
//  const captchaRef =useRef(null)

 const [disable,setDisable]=useState(true)
const {signIn}=useContext(AuthContext)
const navigate =useNavigate()
const location =useLocation()
const from =location.state?.from?.pathname || "/"
// console.log(from)

    useEffect(()=>{
        loadCaptchaEnginge(6);

    },[])

    const handleLogin = e => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password)
        signIn(email,password)
        .then(result=>{
            const user =result.user
            // console.log(user)
            navigate(from ,{replace:true})
        })
    }
    const handleValidateCaptcha=(e)=>{
        const user_value = e.target.value;
        if(validateCaptcha(user_value)){
       setDisable(false)
        }
        else{
            setDisable(true)
        }
        
    }


    return (
        <>
        <Helmet>
            <title>Bistro boss | Login</title>
        </Helmet>
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center md:w-1/2 lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 md:w-1/2 max-w-sm  shadow-2xl card-body border">
                    <form onSubmit={handleLogin} className="">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control  ">
                            <label className="label ">
                            <LoadCanvasTemplate  reloadColor="orange" />
                            </label>
                            <input onBlur={handleValidateCaptcha} type="text"  placeholder="Type the captcha above" name="captcha" className="input input-bordered"  />
                            
                        </div>
                        <div className="form-control mt-6">
                            {/* Todo:apply disable for re captcha */}

                            <input disabled={false} className="btn btn-primary" type="submit" value="Login" />
                        </div>
                        <p className='text-center '><small>New Hare? <span className='text-red-400'><Link to="/signUp">Create a new account</Link></span> </small> </p>
                    </form>
                    <div className="divider divider-neutral">OR</div>
                    <SocialLogin ></SocialLogin>
                </div>
                
            </div>
        </div>
        </>
    );
};

export default Login;