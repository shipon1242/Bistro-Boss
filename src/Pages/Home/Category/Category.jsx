import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/pagination';

import slide1 from "../../../assets/home/slide1.jpg"
import slide2 from "../../../assets/home/slide2.jpg"
import slide3 from "../../../assets/home/slide3.jpg"
import slide4 from "../../../assets/home/slide4.jpg"
import slide5 from "../../../assets/home/slide5.jpg"
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
const Category = () => {
    return (
        <section>
          <SectionTitle
          subHeading={"From 11.00am to 10.00pm"}
          heading={"ORDER ONLINE"}
          
          ></SectionTitle>
              <Swiper
        slidesPerView={4}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper mb-10 md:mb-20 mt-8"
      >
        <SwiperSlide><img src={slide1} alt="" />
         <h2 className='text-xl md:text-4xl text-center -mt-16 text-white'> SALAD</h2>
        </SwiperSlide>
        <SwiperSlide><img src={slide2} alt="" />
        <h2 className='text-xl md:text-4xl text-center -mt-16 uppercase text-white'> pizza</h2>
        </SwiperSlide>
        <SwiperSlide><img src={slide3} alt="" />
        <h2 className='text-xl md:text-4xl text-center -mt-16 uppercase text-white'> soup</h2>
        </SwiperSlide>
        <SwiperSlide><img src={slide4} alt="" />
        <h2 className='text-xl md:text-4xl text-center -mt-16 uppercase text-white'> desserts</h2>
        </SwiperSlide>
        <SwiperSlide><img src={slide5} alt="" />
        <h2 className='text-xl md:text-4xl text-center -mt-16 uppercase text-white'> salad</h2>
        </SwiperSlide>
         
      </Swiper>
        </section>
    );
};

export default Category;