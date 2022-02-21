// const api_key = 'AIzaSyCLfKAY8NfxuZ2D0WVoKavyZ5nrbS2_atU';
// const play_list = 'PLZOQwZqfo4_dr7JigsGw_LEZ0i4ybTJv5';


import { useEffect, useRef, useState } from "react";
import { useSelector } from 'react-redux';

export default function Youtube(){
  let main = useRef(null); 
  const [isPop, setIsPop] = useState(false);
  const [index, setIndex] = useState(0);

  const vidData = useSelector(state=>state.youtubeReducer.youtube);

  useEffect(()=>{
    main.current.classList.add('on');
  },[]);
  
  return (
    <>
    <main className="content youtube" ref={main}>
      <figure>
        <div className="inner">
          <h1> <span>Y</span>OU <br /> 
            <span>__</span> TU <br />
            BE
          </h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum atque, molestias voluptas maiores deserunt ea! Deleniti molestiae obcaecati amet. Consequatur itaque dolores quos veritatis eaque, minus quisquam fugit corporis commodi rem architecto nisi, quia laboriosam obcaecati accusamus ea laudantium facere et, provident eligendi voluptatibus expedita nesciunt! Ab, quo rem?</p>
        </div>
      </figure>
      
      <div className="inner">
        <h1>Youtube</h1>
        <section>
          {vidData.map((item,idx)=>{
            let tit = item.snippet.title;
            let tit_len = tit.length;
            let desc = item.snippet.description;
            let desc_len = desc.length;

            return (
              <article key={idx}>
                <div className="inner">               
                  <div className="txt">
                    <h2>{tit_len>30 ? tit.substr(0,30)+'...' : tit}</h2>
                    <p>{desc_len>150 ? desc.substr(0,200)+'...' : desc}</p>
                  </div>
                  <div className="pic" onClick={()=>{
                    setIsPop(true);
                    setIndex(idx);
                  }}>
                    <img src={item.snippet.thumbnails.medium.url} />
                  </div> 
                </div>
              </article>
            )            
          })}

          <div className="saybox">
            <p>"And aboove all, watch with sit amet czur adipisicing elitsdawd. Eos minus consectetur voluptatem, odiovawr at et sit, neque. veniam suscipit necessitatibus."</p>
            <span>LOALD OAUL</span>
          </div>

        </section>
      </div>
    </main>

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