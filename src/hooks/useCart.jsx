import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useCart = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { refetch,data: carts = [] } = useQuery({
        queryKey: ['cart'],
        queryFn: async () => {
            const myCart = await axiosSecure.get(`/carts?email=${user?.email}`).then(res => res.data)
            // console.log(myCart)
            // return myCart
            return myCart

        }
    })
    // console.log(carts)
    return [carts,refetch]
};
export default useCart;


// //  const myCart = fetch('https://bistro-boss-server-dun-psi.vercel.app/carts').then    (res=> res.json()).then(data=>{
//     return data
// })
// console.log(myCart)


// using axios
// const myCart =await axiosSecure.get('/carts').then(res=> res.data)
// console.log(myCart)
// return myCart