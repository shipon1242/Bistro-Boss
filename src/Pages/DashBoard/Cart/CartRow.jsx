import { MdDelete } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useCart from "../../../hooks/useCart";


const CartRow = ({ item, index }) => {
    const axiosSecure = useAxiosSecure()
    const [, refetch] = useCart()
    const handleDelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: `${item.name} has been deleted.`,
                                icon: "success"
                            });
                        }
                    })


                //   Swal.fire({
                //     title: "Deleted!",
                //     text: "Your file has been deleted.",
                //     icon: "success"
                //   });

            }
        });



    }
    return (
        <tr>
            <th>
                {index + 1}
            </th>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-square h-12 w-12">
                            <img
                                src={item.image}
                                alt="Avatar " />
                        </div>
                    </div>

                </div>
            </td>
            <td>
                {item.name}
            </td>
            <td> ${item.price}</td>
            <th>
                <button onClick={() => handleDelete(item._id)} className="btn btn-error btn-sm btn-square "> <MdDelete className="w-5 h-5" /> </button>
            </th>
        </tr>
    );
};

export default CartRow;