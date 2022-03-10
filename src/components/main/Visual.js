import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Visual(){ 
  const path = process.env.PUBLIC_URL;

  return (
    <figure className='mainVisual myScroll'>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={'auto'}   
        loop  
        navigation 
        pagination={{clickable:true}}
      >
        <SwiperSlide>
          <img src={path+ '/img/visual1.jpg'} alt="" />
          <h2>LOREM</h2>
          </SwiperSlide>
        <SwiperSlide>
          <img src={path+ '/img/visual2.jpg'} alt="" />
          <h2>LOREM</h2>
          </SwiperSlide>
        <SwiperSlide>
          <img src={path+ '/img/visual3.jpg'} alt="" />
          <h2>LOREM</h2>
        </SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>   
      </Swiper>
    </figure>
  )
}