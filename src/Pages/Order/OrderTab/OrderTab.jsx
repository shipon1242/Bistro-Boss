import FoodCard from "../../../Components/FoodCard/FoodCard";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import "./pagination.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderTab = ({ items }) => {
    // const navigate =useNavigate()
    // navigate(`/order/${items.category}`)
    // const [index,setIndex]=useState(1)
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = Math.ceil(items.length / 6);

    const indexOfFirstItem = currentPage * 6;
    const indexOfLastItem = indexOfFirstItem + 6;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem)
    // console.log(currentItems)
    const arrayPage = Array.from({ length: totalPages }, (_, index) => index + 1)
    // console.log(arrayPage)
    const pagination = {
        clickable: true,
        renderBullet: (index, className) => {
            
            return '<span class="swiper-pagination-bullet swiper-pagination-bullet-active ' + className + '">' + (index + 1) + '</span>';
            
        },
        
        
    };

    return (
        <div  >


            <Swiper
                pagination={pagination}
                modules={[Pagination]}
                className="mySwiper "
                onSlideChange={(swiper)=> setCurrentPage(swiper.activeIndex)}
            >
                
                {
                    arrayPage.map(pageCount=>
                        <SwiperSlide  >
                    <div className="grid   md:grid-cols-3 gap-8 pb-10 ">
                        {
                            currentItems.map(item =>  <FoodCard  key={item._id} item={item}></FoodCard>)
                        }
                    </div>

                </SwiperSlide>
                    )
                }

            </Swiper>

        </div>




    );
};

export default OrderTab;