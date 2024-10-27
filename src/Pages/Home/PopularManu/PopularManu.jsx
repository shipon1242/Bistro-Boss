
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import UseMenu from "../../../hooks/UseMenu";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import axios from "axios";
import useAxiosPublic from "../../../hooks/useAxiosPublic";


const PopularManu = () => {
    // const [menu, loading] = UseMenu()
    const axiosPublic = useAxiosPublic()
    const [popularData, setPopularData] = useState([])

    useEffect(() => {
        axiosPublic.get('/popular-section/popular')
            .then(res => {
                // console.log(res.data)
                setPopularData(res.data)
            })
    }, [])

    // const popular = menu.filter(item => item.category === "popular")
    // if (loading) {
    //     return <span className="loading loading-bars loading-md"></span>
    // }

    return (
        <section className="mb-6">
            <SectionTitle
                heading="FROM OUR MENU"
                subHeading="Check it out">

            </SectionTitle>
            {/* {loading && <span className="loading loading-bars loading-md"></span>} */}
            <div className="grid md:grid-cols-2 gap-8 mt-8 md:mt-10 px-4 md:px-10">
                {
                    popularData && Array.isArray(popularData) ? popularData.map(item => <MenuItem
                        key={item._id}
                        items={item}
                    ></MenuItem>) : null
                }
            </div>
            <Link to="/menu">
                <p className=" text-center mt-4"> <button className="btn btn-outline mt-4 border-0 border-b-4 text-black">View Full menu</button> </p>
            </Link>
        </section>
    );
};

export default PopularManu;