import axios from 'axios';
import { useEffect, useRef, useState } from "react";

export default function Gallery(){ 
  const main = useRef(null);
  const frame = useRef(null);
  const [items, setItems] = useState([]);
  const [isPop, setIsPop] = useState(false);
  const [index, setIndex] = useState(0);
  const api_key = '89aae050d1d8c006bdb5bf866029199d';
  const method1 = 'flickr.interestingness.getList';
  const num = 20;
  const url = `https://www.flickr.com/services/rest/?method=${method1}&per_page=${num}&api_key=${api_key}&format=json&nojsoncallback=1`;

  //promise객체를 리턴하는 함수를 wrapping함수로 감싸주고 앞쪽에  async를 붙임
  //그안쪽에 axios메서드 앞쪽에 await를 붙이면 그다음에 나오는 코드는 무조건 axios가 끝난 이후에 동기적으로 실행됨
  const getFlickr = async ()=>{
    await axios.get(url).then(json=>{   
      setItems(json.data.photos.photo);
    })
    frame.current.classList.add('on');
  }

  useEffect(()=>{
    main.current.classList.add('on');

    getFlickr();
  },[]);

  return (
    <>
    <main className="content gallery" ref={main}>
      <figure></figure>
      
      <div className="inner">
        <h1>Gallery</h1>
        <section ref={frame}>
          {items.map((item,idx)=>{
            return (
              <article key={idx}>
                <div className="inner">
                  <div className="pic" data={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} onClick={()=>{
                    setIsPop(true);
                    setIndex(idx);
                  }}>
                    <img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} />
                  </div>

                  <h2>{item.title}</h2>
                </div>
              </article>
            )            
          })}
        </section>
      </div>
    </main>

    { isPop ? <Popup /> : null }
    </>
  )

  function Popup(){
    useEffect(()=>{
      document.body.style.overflow = 'hidden';
      return ()=> document.body.style.overflow = 'auto';     
    },[])

    return (
      <aside className="popup">
        <h1>{items[index].title}</h1>
        <img src={`https://live.staticflickr.com/${items[index].server}/${items[index].id}_${items[index].secret}_b.jpg`} />        
        <span onClick={()=>{
          setIsPop(false);
        }}>close</span>
      </aside>
    )
  }
}

