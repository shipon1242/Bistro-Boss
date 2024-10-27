import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from "react";
import { data } from "autoprefixer";
import { Rating } from '@smastrom/react-rating'
import commaImg from"../../../assets/home/inverted-comma1.png"

import '@smastrom/react-rating/style.css'
const Testimonials = () => {
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        fetch('https://bistro-boss-server-dun-psi.vercel.app/reviews')
            .then(res => res.json())
            .then(data => {
                setReviews(data)
            })
    }, [])


    return (
        <section className="py-8 md:py-16">
            <SectionTitle
                heading="TESTIMONIALS"
                subHeading="What Our Clients Say">
            </SectionTitle>

            <div className=" mx-8 md:mx-24">
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                    {
                        reviews.map(review => <SwiperSlide
                            key={review._id}
                        >
                            <div className="flex flex-col items-center gap-4 mt-10  mx-auto px-8 md:px-20">
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                                <img src={commaImg} className="w-20 rotate-180" alt="" />
                                <p className="text-center"> {review.details} </p>
                                <h3 className="text-xl md:text-2xl text-orange-300 text-center mt-2">{review.name} </h3>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </section>
    );
};

export default Testimonials;