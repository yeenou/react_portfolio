import axios from 'axios';
import { Navigation, Pagination, EffectCoverflow } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector, useDispatch } from 'react-redux';
import { setYoutube } from '../../redux/actions';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/effect-coverflow";
import { useEffect } from 'react';

export default function Info(){
  //useSelector로 youtubeReducer에 있는 초기 빈배열을 가져옴
  const vidData = useSelector(state=>state.youtubeReducer.youtube);
  const dispatch = useDispatch();

  const api_key = 'AIzaSyDgamOPXenuhKr9LoqkU0RTq7dzP9aBZgw';
  const play_list = 'PLGOVj4gmzJyBMQSKPpBoycEvgXVFPMRZV';
  const num = 10;
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${api_key}&playlistId=${play_list}&maxResults=${num}`;

  //fetchYoutube함수가 호출되면 axios로 받아온 youte data를 dispatch로 reducer에 전달
  const fetchYoutube = async () => {
    await axios.get(url).then(json=>{
      console.log(json)
      dispatch(setYoutube(json.data.items));
    });
    
  }

  useEffect(()=>{
    fetchYoutube();
    console.log(vidData);
  },[]);


  return (
    <section id='info' className='myScroll'>
      <div className="inner">
        <h1>Information</h1>

        {/* {vidData.map((vid,idx)=><p key={idx}>{vid.snippet.title}</p>)} */}

        <div className="wrap">          
          <Swiper
            modules={[Navigation, Pagination, EffectCoverflow]}
            spaceBetween={250}
            slidesPerView={'auto'}   
            loop  
            navigation 
            centeredSlides={true}
            grabCursor={true}
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
            <SwiperSlide>
              {vidData[0].snippet.title}
            </SwiperSlide>
            <SwiperSlide>
              {vidData[1].snippet.title}
            </SwiperSlide>
            <SwiperSlide>
              {vidData[2].snippet.title}
            </SwiperSlide>
            <SwiperSlide>
              {vidData[3].snippet.title}
            </SwiperSlide>
            <SwiperSlide>
              {vidData[4].snippet.title}
            </SwiperSlide>
          </Swiper>
        </div>  
      </div>
    </section>
  )
}