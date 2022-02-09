import { useEffect, useRef, useState } from "react";

export default function Location(){
  let main = useRef(null);
  const {kakao} = window;
  const container = useRef(null);  
  const [map, setMap] = useState(null);
  const [index, setIndex] = useState(0);
  const path = process.env.PUBLIC_URL;  
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
  const [mapInfo] = useState(info);

  //처음 로딩시 한번만 실행
  useEffect(()=>{
    main.current.classList.add('on'); 
  },[]);
  
  //index state값이 변경될때마다 실행
  useEffect(()=>{ 
    //해당 훅함수가 재 호출될때마다 일단 #map안쪽을 비워둠 
    container.current.innerHTML = '';

    const options = {
      center: mapInfo[0].latlng,
      level: 3 
    }
    
    const map = new kakao.maps.Map(container.current, options);
    setMap(map);
    
    new kakao.maps.Marker({
      map: map,
      position: mapInfo[index].latlng,
      title: mapInfo[index].title,
      image: new kakao.maps.MarkerImage(mapInfo[index].imgSrc, mapInfo[index].imgSize, mapInfo[index].imgPos)
    }) 

    //순서 state값이 변경될때마다 맵의 중앙 위치를 다시 렌더링
    map.setCenter(mapInfo[index].latlng);

    const mapSet = () => map.setCenter(mapInfo[index].latlng);

    //브라우저 리사이즈시 마커 위치를 중앙배치
    window.addEventListener('resize', mapSet);

    //해당 컴포넌트가 재 랜더링 될때마다 기존 window객체에 등록된 함수를 다시 제거
    return ()=> window.removeEventListener('resize', mapSet);
  },[index]); 

  return (
    <main className="content location" ref={main}>
      <figure></figure>
      
      <div className="inner">
        <h1>Location</h1>
        <section>
          <div id="map" ref={container}></div>

          <nav className='traffic'>
            <button onClick={()=>{
              map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
            }}>교통정보 보기</button>
            
            <button onClick={()=>{
              map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
            }}>교통정보 끄기</button>
          </nav>

          <nav className="branch">
            {mapInfo.map((data, idx)=>{
              return <button key={idx} onClick={()=>setIndex(idx)}>{data.title}</button>
            })}
          </nav>
        </section>
      </div>
    </main>
  )
}