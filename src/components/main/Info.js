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
import { useEffect, useState } from 'react';

export default function Info(){
  const vidData = useSelector(state=>state.youtubeReducer.youtube);
  const dispatch = useDispatch();
  const [isPop, setIsPop] = useState(false);
  const [index, setIndex] = useState(0);

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
    <>
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
            let tit = vid.snippet.title;
            let tit_len = tit.length;

            if(index < 5) {
              return (
                <SwiperSlide key={index} virtualIndex={index}>
                <img src={vid.snippet.thumbnails.medium.url} onClick={()=>{
                  setIsPop(true);
                  setIndex(index);
                }} />
                <h2>{tit_len>30 ? tit.substr(0,30)+'...' : tit}</h2>
              </SwiperSlide>
              )              
            }            
          })}
        </Swiper>

      </div>
    </section>

    {isPop ? <Popup /> : null}
    </>
  )

  function Popup(){
    useEffect(()=>{
      document.body.style.overflow = 'hidden';
      return ()=> document.body.style.overflow = 'auto';
    },[]);
    
    return (
      <aside className="popup">
        <iframe 
          src={"https://www.youtube.com/embed/"+vidData[index].snippet.resourceId.videoId}  
          width='100%' 
          height='100%' 
          allowFullScreen
        ></iframe>
        <span onClick={()=>setIsPop(false)}>close</span>
      </aside>
    )
  }
}