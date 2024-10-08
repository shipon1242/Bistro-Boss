import useCart from "../../../hooks/useCart";
import CartRow from "./CartRow";


const Cart = () => {
    const [carts] = useCart()
    const totalPrice = carts.reduce((total, currentItem) => total + currentItem.price, 0)
    return (
        <div>
            <div className="flex justify-evenly">
                <h2 className="text-4xl font-semibold">Total Order:{carts.length} </h2>
                <h2 className="text-4xl font-semibold">Total Price:${totalPrice} </h2>
                <button className="btn btn-primary">Pay</button>
            </div>

            <div className="overflow-x-auto">
                <table className="table mt-8 ">
                    {/* head */}
                    <thead className="text-lg text-white border-4 rounded-t-lg  bg-amber-400 ">
                        <tr className="rounded-lg ">
                            <th>
                               #
                            </th>
                            <th> Item Image</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th> Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row  */}
                        {
                            carts.map((item,index)=> <CartRow index={index} item={item} key={item._id}></CartRow> )
                        }
                        
                       
                    </tbody>
                   
                </table>
            </div>
        </div>
    );
};

export default Cart;