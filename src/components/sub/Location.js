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
        title:"HEAD OFFICE", 
        latlng : new kakao.maps.LatLng(37.50711796614849,126.7564159502457),
        imgSrc : path+'/img/marker1.png', 
        imgSize : new kakao.maps.Size(232,99), 
        imgPos : {offset: new kakao.maps.Point(116, 99)},
    },
    {
        title:"BRANCH OFFICE1", 
        latlng : new kakao.maps.LatLng(33.450701, 126.570667),
        imgSrc : path+'/img/marker2.png', 
        imgSize : new kakao.maps.Size(232,99), 
        imgPos : {offset: new kakao.maps.Point(116, 99)},
    },
    {
        title:"BRANCH OFFICE12", 
        latlng : new kakao.maps.LatLng(37.557527,126.9222836),
        imgSrc : path+'/img/marker3.png', 
        imgSize : new kakao.maps.Size(232,99), 
        imgPos : {offset: new kakao.maps.Point(116, 99)}, 
    }
  ]; 
  const [mapInfo] = useState(info);
 
  useEffect(()=>{
    main.current.classList.add('on'); 
  },[]);  

  useEffect(()=>{    
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

    map.setCenter(mapInfo[index].latlng);
    const mapSet = () => map.setCenter(mapInfo[index].latlng);
    window.addEventListener('resize', mapSet);

    //지도 타입변경 컨트롤러 표시
    const mapType = new kakao.maps.MapTypeControl();
    map.addControl(mapType, kakao.maps.ControlPosition.TOPRIGHT);

    //휠로 줌기술 활성화 유무
    map.setZoomable(true);

    //마우스 드래그기능 활성화 유무
    map.setDraggable(true);

    return ()=> window.removeEventListener('resize', mapSet);
  },[index]); 

  return (
    <main className="content location" ref={main}>
      <figure></figure>
      
      <div className="inner">
        <h1>Contact Us</h1>

        <div className="wrap">
          <article className="send">
            <p>feel free to contact us and we will get back to you as soon as we can.</p>


          </article>

          <article className="oas">
            <article>
              <h2>opening hours</h2>
              <p>Lorem ipsum sit.</p>
              <p>Lorem ipsum sit.</p>
              <p>Lorem ipsum sit.</p>
              <p>Lorem ipsum sit.</p>
            </article>
            <article>
              <h2>address</h2>
              <p>Lorem ipsum dolor sit, <br />
              amet consectur adipisicing <br />
              doifelit.</p>
            </article>
            <article>
              <h2>support</h2>
              <p>Lorem ipsum dolor sit.</p>
              <p>Lorem ipsum dolor sit.</p>
            </article>
          </article>
        </div>
      </div>

      <section>
        <nav className="branch">
          {mapInfo.map((data, idx)=>{
            return <button key={idx} onClick={()=>setIndex(idx)}>{data.title}</button>
          })}
        </nav>

        <div id="map" ref={container}></div>

          {/* <nav className='traffic'>
            <button onClick={()=>{
              map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
            }}>교통정보 보기</button>
            
            <button onClick={()=>{
              map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
            }}>교통정보 끄기</button>
          </nav> */}
          
        </section>

    </main>
  )
}