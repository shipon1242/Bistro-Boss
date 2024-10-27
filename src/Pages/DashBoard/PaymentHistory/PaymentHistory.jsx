import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";


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
        <div className=" ">
            <Helmet>
                <title>Bistro Boss | Dashboard | payment history</title>
            </Helmet>
            <SectionTitle heading="payment history" subHeading="At a Glance!"></SectionTitle>
            <div className="bg-white pt-4">
                <h2 className=" pl-4 text-xl lg:text-3xl mt-4 text-black"> Total Payments : {paymentHistory.length} </h2>
                <table className="table mt-8 ">
                    {/* head */}
                    <thead className="text-sm text-white border-4 rounded-t-lg  bg-amber-400 ">
                        <tr className="rounded-lg textarea-xs text-xs lg:text-base ">
                            {/* <th className="text-xs lg:text-base">
                                #
                            </th> */}

                            {/* <th className="text-xs lg:text-base">Email</th> */}
                            <th className="text-xs lg:text-base">Transaction Id</th>
                            <th className="text-xs lg:text-base">Price</th>
                            <th className="text-xs lg:text-base"> Payment Date</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* row  */}
                        {
                            paymentHistory.map((item, index) => <tr key={item._id}>
                                {/* <th className="text-xs lg:text-base">
                                    {index + 1}
                                </th> */}

                                {/* <td className="text-xs lg:text-base">
                                    {item.email}
                                </td> */}
                                <td className="text-xs lg:text-base">
                                    {item.transactionId}
                                </td>

                                <td className="text-xs lg:text-base"> ${parseFloat(item.price).toFixed(2)}</td>
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