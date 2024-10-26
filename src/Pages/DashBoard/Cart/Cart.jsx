import { Link } from "react-router-dom";
import useCart from "../../../hooks/useCart";
import CartRow from "./CartRow";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle"

const Cart = () => {
    const [carts] = useCart()
    const totalPrice = carts.reduce((total, currentItem) => total + currentItem.price, 0)
    return (
        <div>
            <SectionTitle subHeading="My cart" heading="wanna add more"></SectionTitle>
           <div className="bg-white   lg:px-6  lg:mx-10 pt-3 lg:py-6 my-4 lg:my-8">
           <div className="flex justify-between w-full   text-black">
                
                <h2 className=" text-xl lg:text-3xl font-semibold">Total Order:{carts.length} </h2>
                <h2 className="text-xl lg:text-3xl font-semibold">Total Price: ${parseFloat(totalPrice).toFixed(2) } </h2>
               {carts.length? <Link to="/dashboard/payment">  <button  className="btn btn-warning btn-sm  lg:btn-md lg:text-lg">Pay</button> </Link>
               :<button disabled className="btn btn-warning btn-sm lg:btn-md lg:text-lg ">Pay</button>}
               
            </div>

            <div className="overflow-x-auto bg-white ">
                <table className="table mt-8 ">
                    {/* head */}
                    <thead className="text-lg text-white  border-4 rounded-t-lg  bg-amber-400 ">
                        <tr className="rounded-lg ">
                            <th className="text-xs lg:text-lg">
                                #
                            </th>
                            <th className="text-xs lg:text-base"> Item Image</th>
                            <th className="text-xs lg:text-base">Item Name</th>
                            <th className="text-xs lg:text-base">Price</th>
                            <th className="text-xs lg:text-base"> Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row  */}
                        {
                            carts.map((item, index) => <CartRow index={index} item={item} key={item._id}></CartRow>)
                        }


                    </tbody>

                </table>
            </div>
           </div>
        </div>
    );
};

export default Cart;