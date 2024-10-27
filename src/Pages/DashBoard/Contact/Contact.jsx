import Cover from "../../Shared/Cover/Cover";
import img from "../../../assets/contact/banner.jpg"
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FaPhoneVolume } from "react-icons/fa";
import { MdPhoneInTalk } from "react-icons/md";
import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
const Contact = () => {
    const { register, handleSubmit,reset } = useForm();
    const onSubmit=(data)=>{
        // console.log(data)
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Message send!",
            showConfirmButton: false,
            timer: 1500
          });
        reset()
        
    }
    return (
        <div className="w-full bg-white  ">
             <Helmet>
                <title>Bistro boss | Contact</title>
            </Helmet>
            <Cover className="w-full" img={img} title="contact us" subTitle="Would you like to try a dish?"></Cover>
            <SectionTitle heading="OUR LOCATION" subHeading="visit us"></SectionTitle>
            <div className="flex  px-4 md:px-20 gap-2 md:gap-4 mt-8">

                <div className="w-1/3 border  transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300 ...  ">
                    <h2 className="bg-amber-500 text-xl md:text-2xl text-white h-12 flex justify-center items-center"><MdPhoneInTalk /> </h2>

                    <p className=" h-28 text-center pt-3 md:pt-8 mx-2 md:mx-4 mb-2 md:mb-4 bg-slate-200 text-black text-lg md:text-xl font-medium">
                        PHONE <br />
                        <span className="text-xs md:text-base opacity-70 font-normal">
                            +8801737240461
                        </span>
                    </p>
                </div>
                {/* address */}
                <div className="w-1/3 border   transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300 ...  ">
                    <h2 className="bg-amber-500 text-2xl text-white h-12 flex justify-center items-center"><IoLocationOutline /> </h2>

                    <p className="h-28 text-center pt-3 md:pt-8 mx-2 md:mx-4 mb-2 md:mb-4 bg-slate-200 text-black text-lg md:text-xl font-medium">
                        ADDRESS <br />
                        <span className="text-xs md:text-base opacity-70 font-normal">
                            +5560,mirpur-10,dhaka
                        </span>
                    </p>
                </div>
                <div className="w-1/3 border   transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300 ...  ">
                    <h2 className="bg-amber-500 text-2xl text-white h-12 flex justify-center items-center"><IoTimeOutline /> </h2>

                    <p className="h-28 text-center pt-3 md:pt-8 mx-2 md:mx-4 mb-2 md:mb-4 bg-slate-200 text-black text-lg md:text-xl font-medium">
                        WORKING HOURS <br />
                        <span className="text-xs md:text-base opacity-70 font-normal">
                            Sun-Fri : 8.00 - 22.00
                        </span>
                    </p>
                </div>
            </div>
            <SectionTitle heading="CONTACT FORM" subHeading="send us message"></SectionTitle>
            <div className="mx-4 md:mx-20 px-10 bg-slate-200">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full  space-y-6 py-8" >
                    <div className="md:flex w-full gap-6 ">
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text text-lg font-medium text-black">Name*</span>

                            </div>
                            <input type="text" {...register("name")} required placeholder="your name" className="input input-bordered w-full bg-white text-black " />

                        </label>
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text text-lg font-medium text-black">Email*</span>

                            </div>
                            <input type="email" {...register("email")} required placeholder="Enter your email" className="input input-bordered w-full bg-white text-black" />

                        </label>
                    </div>
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text text-lg font-medium text-black">Phone*</span>

                        </div>
                        <input type="number" {...register("phone")} required placeholder="Enter your phone number" className="input input-bordered w-full bg-white text-black " />

                    </label>
                    <label className="form-control w-full h-56  ">
                        <div className="label">
                            <span className="label-text  text-lg font-medium text-black">Message*</span>

                        </div>
                        
                        <textarea {...register("message")}
                            placeholder="Write your message here" required
                            className="textarea textarea-bordered textarea-lg w-full h-60 bg-white text-black"></textarea>

                    </label>
                    <p className="flex justify-center "><button className="btn md:text-lg  btn-warning text-black"> send message </button></p>
                </form>
            </div>
        </div>
    );
};

export default Contact;