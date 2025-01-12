import { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from '../../Provider/AuthProvider'
import { updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form"
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";


const SignUp = () => {
    const { createUser, auth } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        const email = data.email;
        const password = data.password;
        const photo = data.photo;
        createUser(email, password)
            .then(result => {
             const user = result.user
                                      
                updateProfile(auth.currentUser, {
                    displayName: data.name, photoURL: photo
                })
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/user', userInfo)
                            .then((res) => {
                                if (res.data.insertedId) {
                                    console.log('user information added in database')
                                    reset()
                                    Swal.fire({
                                        title: "Good job!",
                                        text: "User created successfully!",
                                        icon: "success"
                                    });

                                    navigate('/')

                                }


                            })



                    })

            })


    }






    return (
        <>
            <Helmet>
                <title>Bistro boss | sign up</title>
            </Helmet>
            <div className="hero  min-h-screen bg-[url('../../../src/assets/others/authentication.png')]">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center md:w-1/2 lg:text-left">
                        {/* <h1 className="text-5xl font-bold">Sign Up Now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p> */}
                        <img src="../../../src/assets/others/authentication2.png" alt="" />
                    </div>
                    <div className="card md:w-1/2   max-w-sm  shadow-2xl bg-[url('../../../src/assets/others/authentication.png')]">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black text-lg font-medium">Name*</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} style={{backgroundColor:"white",color:'black'}} name="name" placeholder="name" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black text-lg font-medium">Photo Url</span>
                                </label>
                                <input type="text" {...register("photo", { required: false })} style={{backgroundColor:"white",color:'black'}} placeholder="photo url" className="input input-bordered" />
                                {errors.photo && <span className="text-red-600">Photo url is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black text-lg font-medium">Email*</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} style={{backgroundColor:"white",color:'black'}} name="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black text-lg font-medium">Password*</span>
                                </label>
                                <input type="password"{...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!#$%&?]/

                                })} style={{backgroundColor:"white",color:'black'}} placeholder="password" name="password" className="input input-bordered" />
                                {errors.password?.type === "required" && (
                                    <p className="text-red-600" role="alert">password is required</p>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <p className="text-red-600" role="alert">password must be 6 character</p>
                                )}
                                {errors.password?.type === "maxLength" && (
                                    <p className="text-red-600" role="alert">password be max 20 character</p>
                                )}
                                {errors.password?.type === "pattern" && (
                                    <p className="text-red-600" role="alert">password must have one digit,one upper and lowercase and one special character</p>
                                )}
                            </div>
                            <div className="form-control mt-6">

                                <input className="btn btn-warning text-lg text-white " type="submit" value="Sign Up" />
                            </div>
                            <p className="text-center text-black"> <small> Already have an account? <span className="text-orange-500 text-lg font-medium"> <Link to="/login"> Please Login</Link> </span> </small> </p>
                        </form>

                        <div className="divider divider-neutral text-black text-lg">OR</div>
                        <p className="mx-auto mb-4"><SocialLogin ></SocialLogin></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;