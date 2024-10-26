import { useContext, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import { BsCart4 } from "react-icons/bs";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";
import useAuth from "../../../hooks/useAuth";
import profile from "../../../assets/others/profile.png"
import "./Navbar.css"
const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const { category } = useParams()
 
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => { console.log(error) })
    }

    const [carts] = useCart()
    const [isAdmin] = useAdmin()
    const [toggle,setToggle]=useState(false)
    const handleToggle =()=>{
        setToggle(!toggle)
        
    }

    const navOptions = <>

        <li className=""> <NavLink to="/">Home</NavLink> </li>

        <li> <NavLink to="/menu">Our Menu</NavLink> </li>

        <li> <NavLink to={`/order/${category || "salad" }`}>Order Food</NavLink> </li>
        <li> <NavLink to="/contact">Contact</NavLink> </li>

        {user && isAdmin && <li> <NavLink to="/dashboard/adminHome">Dashboard</NavLink> </li>}

        {user && !isAdmin && <li> <NavLink to="/dashboard/userHome">Dashboard</NavLink> </li>}

        <li> <Link to="dashboard/cart">
            <button className="btn btn-sm  bg-none">
                 <BsCart4 className="w-4 h-6" />
            <div className="badge badge-secondary badge-sm">+{carts.length} </div>
            </button>
            
        </Link> </li>

        {
            user ? <><li > <Link onClick={handleLogOut}>Logout</Link> </li></> : <>
             <li> <NavLink  to="/login">Login</NavLink></li> </>
        }

    </>
    return (
        <>
            <div className="navbar max-w-screen-lg fixed z-10 bg-opacity-30 bg-black text-white">
                <div className="navbar-start">
                <div onClick={handleToggle} className="dropdown">
                         <div  tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                             <svg 
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                       {toggle && <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content  bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navOptions}
                        </ul>}
                    </div>
                    <ul className=" pb-2 ml-4 text-2xl md:text-3xl font-bold text-orange-400  w-40"> Bistro  <span className="text-white font-sans">Boss</span></ul>
                   
                </div>
                <div className="navbar-center hidden  lg:flex ml-8 pr-6  ">
                    <ul className="menu menu-horizontal px-1  ml-10 text-base font-semibold  ">
                        {
                            navOptions
                        }
                    </ul>
                    
                </div>
                {user && <div className="navbar-end mr-4 ">
                    <div className="avatar tooltip tooltip-bottom" data-tip={user?.displayName}>
                        <div className="ring-primary ring-offset-base-100 w-8  rounded-full ring ring-offset-2">
                            
                            <img src={user?.photoURL || profile} />
                        </div>
                    </div>
                </div>}
                
            </div>
        </>
    );
};

export default Navbar;