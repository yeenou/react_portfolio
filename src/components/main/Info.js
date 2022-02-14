import { Navigation, Pagination, EffectCoverflow } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/effect-coverflow";

export default function Info(){
  return (
    <section id='info' className='myScroll'>
      <div className="inner">
        <h1>Information</h1>

        <div className="wrap">
          <Swiper
            modules={[Navigation, Pagination, EffectCoverflow]}
            spaceBetween={250}
            slidesPerView={'auto'}   
            loop  
            navigation 
            centeredSlides={true}
            grabcursor
            pagination={{clickable:true}}
            effect= {'coverflow'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 200,
              modifier: 1,
              slideShadows: true,
            }}
          >
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>    
          </Swiper>
        </div>  
      </div>
    </section>
  )
}