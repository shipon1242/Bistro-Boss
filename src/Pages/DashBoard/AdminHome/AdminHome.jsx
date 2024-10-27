
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { MdAccountBalanceWallet } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa6';
import { IoFastFoodSharp } from 'react-icons/io5';
import { GrDeliver } from 'react-icons/gr';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Sector, ResponsiveContainer, Legend } from 'recharts';
import { Helmet } from 'react-helmet-async';
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
    // pi chart and color function 
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink',"blue","green"];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    const pieChatData = chartData.map(data => {
        return { name: data.category, value: data.revenue }
    })


    return (
        <div>
             <Helmet>
                <title> Dashboard | Admin | home</title>
            </Helmet>
            <h2 className="text-3xl text-black">
                <span>Hi,Welcome </span>
                {
                    user?.displayName ? user.displayName : 'Back!'
                }
            </h2>
            <div className=" mt-10 stats mb-6 mx-16 lg:mx-0  stats-vertical lg:stats-horizontal shadow bg-white ">
                <div className=" stat flex flex-row-reverse items-center bg-gradient-to-r from-violet-500 to-fuchsia-400 ">

                    <div className='text-white'>

                        <div className="stat-value "> {parseFloat(stats?.revenue).toFixed(2)} </div>
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
                <div className="stat flex  flex-row-reverse items-center bg-gradient-to-r from-rose-500 to-red-300   ">

                    <div className='text-white'>

                        <div className="stat-value"> {stats?.menuItems} </div>
                        <div className="stat-title text-white text-lg">Menu Items</div>
                    </div>
                    <div className=" text-white text-4xl">
                        <IoFastFoodSharp />
                    </div>
                </div>
                <div className="stat flex  flex-row-reverse items-center bg-gradient-to-r from-sky-500 to-cyan-300  ">

                    <div className='text-white'>

                        <div className="stat-value"> {stats?.orders} </div>
                        <div className="stat-title text-white text-lg">Orders</div>
                    </div>
                    <div className=" text-white text-4xl">
                        <GrDeliver />
                    </div>
                </div>
            </div>
            <div className='flex flex-col lg:flex-row'>
                <div className="w-full lg:w-1/2 ">
                    <BarChart className='w-full'
                        width={400}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 4,
                            right: 0,
                            left: 0,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar dataKey="totalQuantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 7]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
                <div className="lg:w-1/2">
                    <PieChart width={400} height={400}>

                        <Pie
                            data={pieChatData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChatData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend></Legend>
                    </PieChart>
                </div>

            </div>
        </div>
    );
};

export default AdminHome;