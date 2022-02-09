import { useEffect, useRef, useState } from "react";

export default function Location(){
  let main = useRef(null);
  const {kakao} = window;
  const container = useRef(null);  
  const [map, setMap] = useState(null);

  useEffect(()=>{
    main.current.classList.add('on');  

    const options = {
      center: new kakao.maps.LatLng(35.1529763,129.1245155),
      level: 3
    }
    //카카오 api를 통해 리턴한 인스턴스를 state map에 옮겨담음
    const map = new kakao.maps.Map(container.current, options);
    setMap(map);
  },[]);

  return (
    <main className="content location" ref={main}>
      <figure></figure>
      
      <div className="inner">
        <h1>Location</h1>
        <section>
          <div id="map" ref={container}></div>

          <button onClick={()=>{
            map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
          }}>교통정보 보기</button>

          <button onClick={()=>{
            map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
          }}>교통정보 끄기</button>
        </section>
      </div>
    </main>
  )
}