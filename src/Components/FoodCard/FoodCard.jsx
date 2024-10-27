
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";


const FoodCard = ({ item }) => {
    const { name, image, recipe, price,_id } = item
    const { user } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const axiosSecure =useAxiosSecure()
    const [,refetch]=useCart()

    const handleAddToCart = (food) => {
        if (user && user.email) {
            // to do: send cart item to the data base
            // console.log(user.email,food)
            const cartItem ={
                menuId:_id,
                email:user.email,
                name,
                image,
                price
            }
            axiosSecure.post('/carts',cartItem)
            .then(res=>{
                // console.log(res.data)
                if(res.data.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${name} added to the cart`,
                        showConfirmButton: false,
                        timer: 2000
                      });
                      refetch()
                }
            })
        }
        else {
            Swal.fire({
                title: "you are not logged In?",
                text: "Please login add to the cart?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    //  
                    navigate('/login', { state: { from: location } })
                }
            });
        }

    }
    return (
        <div className="card bg-slate-200  shadow-xl transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300 ...">
            <figure>
                <img className="w-full h-52"
                    src={image}
                    alt="Shoes" />
            </figure>
            <p className="bg-slate-800 text-white absolute right-8 md:right-3 top-3 p-1"> ${price} </p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title text-black">{name}</h2>
                <p> {recipe} </p>
                <div className="card-actions justify-center">
                    <button
                        onClick={() => handleAddToCart(item)}
                        className="btn btn-outline bg-slate-200  border-0 border-b-4 border-orange-400 text-orange-400 hover:bg-black hover:text-orange-400 hover:border-orange-400">Add TO CART</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;