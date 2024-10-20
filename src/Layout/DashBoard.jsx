import { BsCart4 } from "react-icons/bs";
import { FaBook, FaHome, FaList, FaShoppingBag, FaUsers, FaUtensils } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { IoMenu, IoWalletSharp } from "react-icons/io5";
import { SiGooglemessages } from "react-icons/si";
import { TbCalendarShare, TbMessage2Star } from "react-icons/tb";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useCart from "../hooks/useCart";


const DashBoard = () => {
    // ToDo:get is admin value from the database
    const [isAdmin] =useAdmin();
    const [carts]=useCart()


    return (
        <div className="flex">
            <div className=" w-64 min-h-screen  bg-amber-500">
                <ul className="menu">
                   {
                    isAdmin?<>
                     <li  > <NavLink to="/dashboard/adminHome"> <FaHome></FaHome> Admin Home</NavLink> </li>
                    <li > <NavLink to="/dashboard/addItems"> <FaUtensils />Add Items</NavLink> </li>

                    <li > <NavLink to="/dashboard/manageItems"> <FaList></FaList> Manage Items</NavLink> </li>
                    <li > <NavLink to="/dashboard/bookings"> <FaBook></FaBook> Manage Bookings</NavLink> </li>
                    <li > <NavLink to="/dashboard/allUsers"> <FaUsers></FaUsers> All Users</NavLink> </li>
                    
                    </>
                    :
                    <>
                     <li  > <NavLink to="/dashboard/userHome"> <FaHome></FaHome> User Home</NavLink> </li>
                    <li > <NavLink to="/dashboard/reservation"> <FaCalendarDays /> Reservation</NavLink> </li>

                    <li > <NavLink to="/dashboard/cart"> <BsCart4 className="w-4 h-4 " /> My Cart ({carts.length})  </NavLink> </li>
                    <li > <NavLink to="/dashboard/payment"> <IoWalletSharp /> Payment</NavLink> </li>
                    <li > <NavLink to="/dashboard/review"> <TbMessage2Star /> Add Review</NavLink> </li>
                    <li > <NavLink to="/dashboard/paymentHistory"> <TbCalendarShare /> Payment History</NavLink> </li>
                    </>
                   }
            {/* shared nav links */}

                    <div className="divider  divider-neutral">  </div>  
                    <li  > <NavLink to="/"> <FaHome></FaHome> Home</NavLink> </li>
                    <li  > <NavLink to="/order/salad"> <IoMenu /> Menu</NavLink> </li>
                    <li  > <NavLink to="/dashboard/shop"> <FaShoppingBag /> Shop</NavLink> </li>
                    <li  > <NavLink to="/dashboard/contact"> <SiGooglemessages /> Contact</NavLink> </li>
                </ul>
            </div>
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default DashBoard;