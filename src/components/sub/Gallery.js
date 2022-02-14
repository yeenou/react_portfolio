import axios from 'axios';
import { useEffect, useRef, useState } from "react";
import Masonry from 'react-masonry-component';

export default function Gallery(){ 
  const main = useRef(null);
  const frame = useRef(null);
  const [items, setItems] = useState([]);
  const [isPop, setIsPop] = useState(false);
  const [index, setIndex] = useState(0);
  const api_key = '89aae050d1d8c006bdb5bf866029199d';
  const method1 = 'flickr.interestingness.getList';
  const method2 = 'flickr.photos.search'
  const num = 20;
  const url1 = `https://www.flickr.com/services/rest/?method=${method1}&per_page=${num}&api_key=${api_key}&format=json&nojsoncallback=1`;
  const url2 = `https://www.flickr.com/services/rest/?method=${method2}&per_page=${num}&api_key=${api_key}&format=json&nojsoncallback=1&tags=ocean`;

  const masonryOptions = {
    fitWidth: false,
    gutter: 0,
    itemSelector: '.item',
    transitionDuration: '0.5s'
  }

  const getFlickr = async url =>{
    await axios.get(url).then(json=>{   
      setItems(json.data.photos.photo);
    })
    frame.current.classList.add('on');
  }
  
  useEffect(()=>{
    main.current.classList.add('on');
    getFlickr(url1);
  },[]);

  return (
    <>
    <main className="content gallery" ref={main}>
      <figure></figure>
      
      <div className="inner">     
        <h1 onClick={()=>{
          frame.current.classList.remove('on');
          getFlickr(url1);
        }}>Gallery</h1>

        <button onClick={()=>{
          frame.current.classList.remove('on');
          getFlickr(url2);
        }}>ocean 갤러리 보기</button>
        
        <section ref={frame}>
          <Masonry 
            elementType={'div'}
            options={masonryOptions}
          >
          {items.map((item,idx)=>{
            return (
              <article key={idx} className='item'>
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
          </Masonry>
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

