import axios from 'axios';
import { Navigation, Pagination, EffectCoverflow, Virtual } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector, useDispatch } from 'react-redux';
import { setYoutube } from '../../redux/actions';
import 'swiper/css';
import 'swiper/css/virtual';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/effect-coverflow"; 
import { useEffect } from 'react';

export default function Info(){
  const vidData = useSelector(state=>state.youtubeReducer.youtube);
  const dispatch = useDispatch();

  const api_key = 'AIzaSyDgamOPXenuhKr9LoqkU0RTq7dzP9aBZgw';
  const play_list = 'PLGOVj4gmzJyBMQSKPpBoycEvgXVFPMRZV';
  const num = 10;
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${api_key}&playlistId=${play_list}&maxResults=${num}`;

  const fetchYoutube = async () => {
    await axios.get(url).then(json=>{
      console.log(json.data.items);
      dispatch(setYoutube(json.data.items));     
    });    
  }

  useEffect(()=>{
    fetchYoutube();   
  },[]);

  return (
    <section id='info'>
      <div className='inner'>
        <h1>Information</h1>

        <Swiper 
          modules={[Virtual, EffectCoverflow, Pagination, Navigation]} 
          spaceBetween={50} 
          slidesPerView={3} //동적인 슬라이드 호출할때 'auto'로 하면 오류 
          loop={false}    // 동적인 슬라이드 호출할때 'loop'적용안됨       
          grabCursor={true}
          centeredSlides={true}
          pagination={{clickable: true}}
          navigation={true}
          virtual
          effect={'coverflow'}
          coverflowEffect={{
            rotate: 50, stretch: 0, depth: 100, modifier: 1, slidesShadow: true
          }}
        >
          {vidData.map((vid, index) => {
            if(index < 5) {
              return (
                <SwiperSlide key={index} virtualIndex={index}>
                <img src={vid.snippet.thumbnails.medium.url} />
                <h2>{vid.snippet.title}</h2>
              </SwiperSlide>
              )              
            }            
          })}
        </Swiper>

      </div>
    </section>
  )
}