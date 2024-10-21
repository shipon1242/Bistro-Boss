
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { MdAccountBalanceWallet } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa6';
import { IoFastFoodSharp } from 'react-icons/io5';
import { GrDeliver } from 'react-icons/gr';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
const AdminHome = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats')
            // console.log(res.data)
            return res.data

        }
    })
    // chart data
    const { data: chartData = [] } = useQuery({
        queryKey: ["category-summary"],
        queryFn: async () => {
            const res = await axiosSecure.get('/category-summary')
            return res.data
        }
    })
    // console.log(chartData)
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };
    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };




    return (
        <div>
            <h2 className="text-3xl">
                <span>Hi,Welcome </span>
                {
                    user?.displayName ? user.displayName : 'Back!'
                }
            </h2>
            <div className="stats shadow mt-10 ">
                <div className="stat flex flex-row-reverse items-center bg-gradient-to-r from-violet-500 to-fuchsia-400 ">

                    <div className='text-white'>

                        <div className="stat-value"> {parseFloat(stats?.revenue).toFixed(2)} </div>
                        <div className="stat-title text-white text-lg">Revenue</div>
                    </div>
                    <div className=" text-white text-4xl">
                        <MdAccountBalanceWallet />
                    </div>
                </div>

                <div className="stat flex flex-row-reverse items-center bg-gradient-to-r from-orange-500 to-amber-300 ">

                    <div className='text-white'>

                        <div className="stat-value"> {stats?.users} </div>
                        <div className="stat-title text-white text-lg">Customers</div>
                    </div>
                    <div className=" text-white text-4xl">
                        <FaUsers />
                    </div>
                </div>

                <div className="stat flex flex-row-reverse items-center bg-gradient-to-r from-rose-500 to-red-300   ">

                    <div className='text-white'>

                        <div className="stat-value"> {stats?.menuItems} </div>
                        <div className="stat-title text-white text-lg">Menu Items</div>
                    </div>
                    <div className=" text-white text-4xl">
                        <IoFastFoodSharp />
                    </div>
                </div>
                <div className="stat flex flex-row-reverse items-center bg-gradient-to-r from-sky-500 to-cyan-300  ">

                    <div className='text-white'>

                        <div className="stat-value"> {stats?.orders} </div>
                        <div className="stat-title text-white text-lg">Orders</div>
                    </div>
                    <div className=" text-white text-4xl">
                        <GrDeliver />
                    </div>
                </div>
            </div>
            <div className='flex'>
                <div className="w-1/2">
                    <BarChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar dataKey="totalQuantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
                <div className="w-1/2"></div>

            </div>
        </div>
    );
};

export default AdminHome;