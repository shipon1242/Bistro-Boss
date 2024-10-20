import { useQuery } from "@tanstack/react-query";

import { MdDelete } from "react-icons/md";
import { FaUser, FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure()
    const { data: users = [],refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => { 
            const res = await axiosSecure.get("/users")
            return res.data
        }
    })
const handleDelete=(user)=>{
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

            axiosSecure.delete(`/users/${user._id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        refetch()
                        Swal.fire({
                            title: "Deleted!",
                            text: `${user.name} has been deleted.`,
                            icon: "success"
                        });
                    }
                })


            

        }
    });

}
const handleMakeAdmin=(user)=>{
    Swal.fire({
        title: "Are you sure?",
        text: `${user.name} will be Admin!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, do it!"
      }).then((result) => {
        if (result.isConfirmed) {


            axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res=>{
            //    console.log(res.data)
               if(res.data.modifiedCount >0){
                   refetch()
                   Swal.fire({
                       position: "top-end",
                       icon: "success",
                       title: `${user.name} is admin now`,
                       showConfirmButton: false,
                       timer: 2000
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
        <div>
            <div className="flex justify-evenly">
                <h2 className="text-4xl">All Users</h2>
                <h2 className="text-4xl">Total Users:{users.length} </h2>
            </div>

            <div className="overflow-x-auto ">
                <table className="table w-full mt-8 ">
                    {/* head */}
                    <thead className="bg-amber-400 text-white border-4 text-lg  ">
                        <tr >
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map((user,index) =>
                                <tr key={user._id}>
                                    <th> {index+1} </th>
                                    <td> {user?.name} </td>
                                    <td> {user?.email}</td>
                                    <td>
                                        {user.role =='admin'?'Admin':<button onClick={() => handleMakeAdmin(user)} className="btn  btn-sm btn-warning btn-square "> <FaUsers className="w-5 h-5"></FaUsers> </button>}
                                        </td>
                                    <td>
                                    <button onClick={() => handleDelete(user)} className="btn btn-error btn-sm btn-square "> <MdDelete className="w-5 h-5" /> </button>
                                    </td>
                                </tr>
                            )
                        }


                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AllUsers;