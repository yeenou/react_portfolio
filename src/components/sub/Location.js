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
        imgSrc : path+'/img/marker.png', 
        imgSize : new kakao.maps.Size(99,99), 
        imgPos : {offset: new kakao.maps.Point(116, 99)},
    },
    // {
    //     title:"BRANCH OFFICE A", 
    //     latlng : new kakao.maps.LatLng(33.450701, 126.570667),
    //     imgSrc : path+'/img/marker.png', 
    //     imgSize : new kakao.maps.Size(99,99), 
    //     imgPos : {offset: new kakao.maps.Point(116, 99)},
    // },
    {
        title:"BRANCH OFFICE", 
        latlng : new kakao.maps.LatLng(37.557527,126.9222836),
        imgSrc : path+'/img/marker.png', 
        imgSize : new kakao.maps.Size(99,99), 
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
      <figure>
        <div className="inner">
          <h1> <span>C</span>ON <br /> 
            <span>__</span> TA <br />
            CT
          </h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum atque, molestias voluptas maiores deserunt ea! Deleniti molestiae obcaecati amet. Consequatur itaque dolores quos veritatis eaque, minus quisquam fugit corporis commodi rem architecto nisi, quia laboriosam obcaecati accusamus ea laudantium facere et, provident eligendi voluptatibus expedita nesciunt! Ab, quo rem?</p>
        </div>
      </figure>
      
      <div className="inner">
        <h1>GET <span>IN TOUCH</span></h1>
        <h2>Contact Us</h2>

        <div className="wrap">
          <article className="send">
            <p>feel free to contact us and we will get back to you as soon as we can.</p>

            <input type="text" placeholder='name' />
            <input type="text" placeholder='email address' />
            <input type="text" placeholder='tell us all about it' />
            <button>send</button>

          </article>

          <article className="oas">
            <article>
              <h3>opening hours</h3>
              <p>Monday - Friday</p>
              <p>9am - 5pm</p>
              <p>Weekend</p>
              <p>Closed</p>
            </article>
            <article>
              <h3>address</h3>
              <p>Jin, ipsum dolor sit, <br />
              amet co aipisicing <br />
              doifelit.</p>
            </article>
            <article>
              <h3>support</h3>
              <p>hello@gmail.com</p>
              <p>+82 10 1234 5678</p>
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

        <div className="mapBox"></div>

          {/* <nav className='traffic'>
            <button onClick={()=>{
              map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
            }}>교통정보 보기</button>
            
            <button onClick={()=>{
              map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
            }}>교통정보 끄기</button>
          </nav> */}
          
      </section>

      <div className="innerWorldMap">

        <h1>WE ARE <span>WORLDWIDE</span></h1>
        <div className="worldMap">
          <img src={path+'/img/worldMap.jpg'} alt="" />
          <div className="txtbox">
            <h2>NEW YORK</h2>
            <p>Lorem ipsum do, <br /> 
            sit amet elit. Facil is, iste!</p>
          </div>
        </div>
      </div>

    </main>
  )
}