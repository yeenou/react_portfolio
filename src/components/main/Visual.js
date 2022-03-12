import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faKaaba } from '@fortawesome/free-solid-svg-icons'
//import { arrow-right-long } from '@fortawesome/free-solid-svg-icons'


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
          <div className='inner'>
            <h2>MODERN HOTEL IN LONDON</h2>
            <p>Modern Hotel is the architecture of a new generation, a building <br />
            that exists not only in the dimension of space. <br />
            but also in the dimension of time and communication.
            </p>
            <a>LOOK MORE
              <FontAwesomeIcon icon="fa-solid fa-arrow-right-long" />
            </a>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={path+ '/img/visual2.jpg'} alt="" />
          <div className='inner'>
            <h2>MODERN HOTEL IN LONDON</h2>
            <p>Modern Hotel is the architecture of a new generation, a building <br />
            that exists not only in the dimension of space. <br />
            but also in the dimension of time and communication.
            </p>
            <a>LOOK MORE
              <FontAwesomeIcon icon="fa-solid fa-arrow-right-long" />
            </a>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={path+ '/img/visual3.jpg'} alt="" />
          <div className='inner'>
            <h2>MODERN HOTEL IN LONDON</h2>
            <p>Modern Hotel is the architecture of a new generation, a building <br /> 
            that exists not only in the dimension of space. <br />
            but also in the dimension of time and communication.
            </p>
            <a>LOOK MORE
              <FontAwesomeIcon icon="fa-solid fa-arrow-right-long" />
            </a>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={path+ '/img/visual4.jpg'} alt="" />
          <div className='inner'>
            <h2>MODERN HOTEL IN LONDON</h2>
            <p>Modern Hotel is the architecture of a new generation, a building <br />
            that exists not only in the dimension of space. <br />
            but also in the dimension of time and communication.
            </p>
            <a>LOOK MORE
              <FontAwesomeIcon icon="fa-solid fa-arrow-right-long" />
            </a>
          </div>
        </SwiperSlide>   
      </Swiper>
    </figure>
  )
}