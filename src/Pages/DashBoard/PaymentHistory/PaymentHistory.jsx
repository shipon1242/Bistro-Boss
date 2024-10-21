import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";


const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: paymentHistory = [], refetch } = useQuery({
        queryKey: ['payment'],
        queryFn: async () => {
            const res = await axiosSecure(`/paymentHistory/${user.email}`)
            // console.log(res.data)
            return res.data
        }
    })

    return (
        <div>

            <SectionTitle heading="payment history" subHeading="At a Glance!"></SectionTitle>
            <div>
                <h2 className="text-3xl"> Total Payments : {paymentHistory.length} </h2>
                <table className="table mt-8 ">
                    {/* head */}
                    <thead className="text-lg text-white border-4 rounded-t-lg  bg-amber-400 ">
                        <tr className="rounded-lg ">
                            <th>
                                #
                            </th>
                            
                            <th>Email</th>
                            <th>Transaction Id</th>
                            <th>Price</th>
                            <th> Payment Date</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {/* row  */}
                        {
                            paymentHistory.map((item, index) => <tr key={item._id}>
                                <th>
                                    {index + 1}
                                </th>
                                
                                <td>
                                   {item.email}
                                </td>
                                <td>
                                    {item.transactionId}
                                </td>
                               
                                <td> ${parseFloat(item.price).toFixed(2)}</td>
                                <td> {item.date} </td>
                                
                               

                            </tr>)
                        }


                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;