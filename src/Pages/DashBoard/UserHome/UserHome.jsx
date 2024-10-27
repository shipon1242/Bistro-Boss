import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdAccountBalanceWallet } from "react-icons/md";
import { IoFastFoodSharp } from "react-icons/io5";
import { GrDeliver } from "react-icons/gr";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { TbShoppingCart } from "react-icons/tb";
import { Helmet } from "react-helmet-async";


const UserHome = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: userData = [] } = useQuery({
        queryKey: [user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-summary/${user.email}`)
            return res.data
        }



    })

    const userDataSummary = userData[0]


    return (
        <div className=" w-full">
             <Helmet>
                <title>Bistro Boss | Dashboard | home</title>
            </Helmet>
            <h2 className="text-2xl lg:text-3xl text-green-500 font-bold uppercase">
                <span className="text-rose-500 ">Hi,Welcome </span>
                {
                    user?.displayName ? user.displayName : 'Back!'
                }
            </h2>
            <div className="stats shadow mt-10 w-full  rounded-xl  ">
                <div className="stat flex flex-row-reverse items-center bg-gradient-to-r from-violet-500 to-fuchsia-400 justify-center ">

                    <div className='text-white'>

                        <div className="stat-value text-3xl lg:text-5xl"> ${parseFloat(userDataSummary?.totalPrice).toFixed(2)} </div>
                        <div className="stat-title text-white lg:text-lg">Purchased Price</div>
                    </div>
                    <div className=" text-white text-4xl lg:text-5xl">
                        <MdAccountBalanceWallet />
                    </div>
                </div>

                <div className="stat flex flex-row-reverse items-center bg-gradient-to-r from-orange-500 to-amber-300 justify-center ">

                    <div className='text-white'>

                        <div className="stat-value text-3xl lg:text-5xl"> {userDataSummary?.purchased} </div>
                        <div className="stat-title text-white lg:text-lg">Purchased</div>
                    </div>
                    <div className=" text-white text-4xl lg:text-5xl">
                        {/* <FaUsers /> */}
                        <BiSolidPurchaseTag />
                    </div>
                </div>


            </div>

            <div className="flex flex-col lg:flex-row mt-6 lg:mt-10">
                <div className="lg:w-1/2 bg-orange-200 ">
                    <div className="flex flex-col h-80  justify-center  items-center">
                        <div className="avatar    ">
                            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                                <img src={user?.photoURL} />

                            </div>
                        </div>
                        <h2 className="text-center items-center mt-5 text-2xl font-bold uppercase text-black"> {user?.displayName}</h2>
                    </div>

                </div>

                <div className="lg:w-1/2 bg-lime-200 border h-80 flex flex-col justify-center px-16 ">
                    <h2 className="uppercase mb-6 text-xl lg:text-2xl  font-bold text-black">Your activities</h2>
                    <p className="flex items-center text-xl"> <TbShoppingCart className="text-sky-600" /> <span className="ml-2 font-semibold text-sky-600">orders: {userDataSummary?.order}</span > </p>
                    <p className="flex items-center text-xl"> <BiSolidPurchaseTag className="text-red-600" /> <span className="ml-2 font-semibold text-red-600">purchased: {userDataSummary?.purchased}</span> </p>
                    <p className="flex items-center text-xl"> <MdAccountBalanceWallet className="text-fuchsia-600 " /> <span className="ml-2 font-semibold text-fuchsia-600">payments: {userDataSummary?.payment}</span> </p>

                </div>



            </div>


        </div>
    );
};

export default UserHome;