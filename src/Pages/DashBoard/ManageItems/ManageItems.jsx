import { MdDelete } from "react-icons/md";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

import useMenu from "../../../hooks/UseMenu"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
const ManageItems = () => {
    const [menu, ,refetch] = useMenu()
    const axiosSecure = useAxiosSecure()
    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then( async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`)
                console.log(res.data)
          if(res.data.deletedCount >0){
            refetch()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${item.name} has been deleted`,
                showConfirmButton: false,
                timer: 1500
              });
          }

                //   Swal.fire({
                //     title: "Deleted!",
                //     text: "Your file has been deleted.",
                //     icon: "success"
                //   });
            }
        });

    }

    return (
        <div>
            <SectionTitle heading="manage all items" subHeading="Hurry Up"></SectionTitle>
           
            <div className="overflow-x-auto mt-10">
            <h2 className="text-3xl font-semibold text-black">Total Items:{menu.length} </h2>
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
                            <th> Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row  */}
                        {
                            menu.map((item, index) => <tr key={item._id}>
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
                                    <Link to={`/dashboard/updateItem/${item._id}`}><button className="btn btn-warning btn-square btn-sm"> <FaEdit className="w-5 h-5"></FaEdit> </button></Link>
                                </th>
                                <th>
                                    <button onClick={() => handleDelete(item)} className="btn btn-error btn-sm btn-square  "> <MdDelete className="w-5 h-5" /> </button>
                                </th>

                            </tr>)
                        }


                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ManageItems;