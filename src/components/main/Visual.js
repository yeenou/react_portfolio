import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Visual(){ 
  return (
    <figure className='myScroll'>
      <Swiper
      modules={[Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={'auto'}   
        loop  
        navigation 
        pagination={{clickable:true}}
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>   
      </Swiper>
    </figure>
  )
}