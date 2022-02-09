import { useEffect, useRef, useState } from "react";

export default function Location(){
  let main = useRef(null);
  const {kakao} = window;
  const container = useRef(null);  
  const [map, setMap] = useState(null);
  const path = process.env.PUBLIC_URL;
  //마커 이미지정보 및 위치정보 값
  const info = [
    {
        title:"본점", 
        latlng : new kakao.maps.LatLng(37.50711796614849,126.7564159502457),
        imgSrc : path+'/img/marker1.png', 
        imgSize : new kakao.maps.Size(232,99), 
        imgPos : {offset: new kakao.maps.Point(116, 99)},
    },
    {
        title:"지점1", 
        latlng : new kakao.maps.LatLng(33.450701, 126.570667),
        imgSrc : path+'/img/marker2.png', 
        imgSize : new kakao.maps.Size(232,99), 
        imgPos : {offset: new kakao.maps.Point(116, 99)},
    },
    {
        title:"지점2", 
        latlng : new kakao.maps.LatLng(37.557527,126.9222836),
        imgSrc : path+'/img/marker3.png', 
        imgSize : new kakao.maps.Size(232,99), 
        imgPos : {offset: new kakao.maps.Point(116, 99)}, 
    }
  ]; 
  const [mapInfo, setMapInfo] = useState(info);

  useEffect(()=>{
    main.current.classList.add('on');  

    const options = {
      center: new kakao.maps.LatLng(37.50711796614849,126.7564159502457),
      level: 3 
    }
    
    const map = new kakao.maps.Map(container.current, options);
    setMap(map);

    //마커출력 인스턴스 생성시 미리 state에 저장해놓은 mapInfo배열의 정보값을 옵션으로 전달
    new kakao.maps.Marker({
      map: map,
      position: mapInfo[0].latlng,
      title: mapInfo[0].title,
      image: new kakao.maps.MarkerImage(mapInfo[0].imgSrc, mapInfo[0].imgSize, mapInfo[0].imgPos)
    })
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