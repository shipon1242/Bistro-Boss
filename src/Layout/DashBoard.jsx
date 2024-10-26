import { BsCart4 } from "react-icons/bs";
import { FaBook, FaHome, FaList, FaShoppingBag, FaUsers, FaUtensils } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { IoMenu, IoWalletSharp } from "react-icons/io5";
import { SiGooglemessages } from "react-icons/si";
import { TbCalendarShare, TbMessage2Star } from "react-icons/tb";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useCart from "../hooks/useCart";
import { useState } from "react";
import { BiFoodMenu } from "react-icons/bi";


const DashBoard = () => {
    // ToDo:get is admin value from the database
    const [isAdmin] = useAdmin();
    const [carts] = useCart()
    const [toggle,setToggle]=useState(false)
    const handleToggle =()=>{
        setToggle(!toggle)
        
    }


    return (
        <div className=" flex flex-col lg:flex-row w-full  ">
            <div className="lg:hidden p-6">
                <div className="dropdown dropdown-right   dropdown-hover">
                    <div tabIndex={0} role="button" className="btn m-1"><IoMenu onClick={handleToggle} className="text-2xl" /></div>
                   {toggle && <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52  shadow">
                    {
                        isAdmin ? <>
                            <li  > <NavLink to="/dashboard/adminHome"> <FaHome></FaHome> Admin Home</NavLink> </li>
                            <li > <NavLink to="/dashboard/addItems"> <FaUtensils />Add Items</NavLink> </li>

                            <li > <NavLink to="/dashboard/manageItems"> <FaList></FaList> Manage Items</NavLink> </li>
                            <li > <NavLink to="/dashboard/bookings"> <FaBook></FaBook> Manage Bookings</NavLink> </li>
                            <li > <NavLink to="/dashboard/allUsers"> <FaUsers></FaUsers> All Users</NavLink> </li>

                        </>
                            :
                            <>
                                <li  > <NavLink to="/dashboard/userHome"> <FaHome></FaHome> User Home</NavLink> </li>
                                

                                <li > <NavLink to="/dashboard/cart"> <BsCart4 className="w-4 h-4 " /> My Cart ({carts.length})  </NavLink> </li>

                                <li > <NavLink to="/dashboard/payment"> <IoWalletSharp /> Payment</NavLink> </li>
                               
                                <li > <NavLink to="/dashboard/paymentHistory"> <TbCalendarShare /> Payment History</NavLink> </li>
                                <li > <NavLink to="/dashboard/review"> <TbMessage2Star /> Add Review</NavLink> </li>
                            </>
                    }
                    {/* shared nav links */}

                    <div className="divider text-white  divider-neutral">  </div>
                    <li  > <NavLink to="/"> <FaHome></FaHome> Home</NavLink> </li>
                    <li  > <NavLink to="/menu"> <IoMenu /> Menu</NavLink> </li>
                    <li  > <NavLink to="/order/salad"> <BiFoodMenu /> Order</NavLink> </li>
                    <li  > <NavLink to="/contact"> <SiGooglemessages /> Contact</NavLink> </li>
                    </ul>}
                </div>
            </div>
            <div className="hidden lg:block w-1/5 min-h-screen  bg-black">
                <ul className="menu text-base font-medium text-white">
                    {
                        isAdmin ? <>
                            <li  > <NavLink to="/dashboard/adminHome"> <FaHome></FaHome> Admin Home</NavLink> </li>
                            <li > <NavLink to="/dashboard/addItems"> <FaUtensils />Add Items</NavLink> </li>

                            <li > <NavLink to="/dashboard/manageItems"> <FaList></FaList> Manage Items</NavLink> </li>
                            <li > <NavLink to="/dashboard/bookings"> <FaBook></FaBook> Manage Bookings</NavLink> </li>
                            <li > <NavLink to="/dashboard/allUsers"> <FaUsers></FaUsers> All Users</NavLink> </li>

                        </>
                            :
                            <>
                                <li  > <NavLink to="/dashboard/userHome"> <FaHome></FaHome> User Home</NavLink> </li>
                                {/* <li > <NavLink to="/dashboard/reservation"> <FaCalendarDays /> Reservation</NavLink> </li> */}

                                <li > <NavLink to="/dashboard/cart"> <BsCart4 className="w-4 h-4 " /> My Cart ({carts.length})  </NavLink> </li>

                                <li > <NavLink to="/dashboard/payment"> <IoWalletSharp /> Payment</NavLink> </li>
                                
                                <li > <NavLink to="/dashboard/paymentHistory"> <TbCalendarShare /> Payment History</NavLink> </li>
                                <li > <NavLink to="/dashboard/review"> <TbMessage2Star /> Add Review</NavLink> </li>
                            </>
                    }
                    {/* shared nav links */}

                    <div className="divider text-white  divider-neutral">  </div>
                    <li  > <NavLink to="/"> <FaHome></FaHome> Home</NavLink> </li>
                    <li  > <NavLink to="/menu"> <IoMenu /> Menu</NavLink> </li>
                    <li  > <NavLink to="/order/salad">  <BiFoodMenu /> Order</NavLink> </li>
                    <li  > <NavLink to="/contact"> <SiGooglemessages /> Contact</NavLink> </li>
                </ul>
            </div>
            <div className="flex-1 p-4 lg:p-6 bg-slate-100 w-full lg:w-4/5 ">
                <Outlet  ></Outlet>
            </div>

        </div >
    );
};

export default DashBoard;