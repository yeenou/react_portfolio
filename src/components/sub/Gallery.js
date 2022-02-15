import axios from 'axios';
import { useEffect, useRef, useState } from "react";
import { useSelector } from 'react-redux';
import Masonry from 'react-masonry-component';

export default function Gallery(){ 
  const main = useRef(null);
  const frame = useRef(null);
  const input = useRef(null);
  //처름 서브 gallery 컴포넌트 호출시 이미 main에서 데이터가 적용된 flickrReducer데이터 가져오기
  const initPic = useSelector(state=>state.flickrReducer.flickr);

  const [items, setItems] = useState(initPic);
  const [isPop, setIsPop] = useState(false);
  const [index, setIndex] = useState(0); 
  const [loading, setLoading] = useState(true);
  const [enableClick, setEnableClick] = useState(true); 
  const [isInterest, setIsInterest] = useState(true);
  const path = process.env.PUBLIC_URL;
  console.log(items);

  const masonryOptions = {
    fitWidth: false,
    gutter: 0,
    itemSelector: '.item',
    transitionDuration: '0.5s'
  }

  const getFlickr = async opt =>{
    const api_key = '89aae050d1d8c006bdb5bf866029199d';
    const method1 = 'flickr.interestingness.getList';
    const method2 = 'flickr.photos.search'
    const num = opt.count;
    let url = '';

    if(opt.type === 'interest'){
      url = `https://www.flickr.com/services/rest/?method=${method1}&per_page=${num}&api_key=${api_key}&format=json&nojsoncallback=1`;
    }
    if(opt.type === 'search'){
      url = `https://www.flickr.com/services/rest/?method=${method2}&per_page=${num}&api_key=${api_key}&format=json&nojsoncallback=1&tags=${opt.tags}`;
    }  

    await axios.get(url).then(json=>{ 
      if(json.data.photos.photo.length === 0){
        alert('해당 검색어의 이미지가 없습니다.');
        return;
      }
      setItems(json.data.photos.photo);            
    })

    setTimeout(()=>{
      frame.current.classList.add('on');
      setLoading(false);
      setTimeout(()=>{
        setEnableClick(true);
      },1000)
    },1000)
  }

  const showInterest = () =>{  
    if(enableClick && !isInterest){
      setIsInterest(true);
      setEnableClick(false);
      setLoading(true);
      frame.current.classList.remove('on');

      getFlickr({
        type: 'interest',
        count: 500
      });
    }
  }

  const showSearchEnter = (e) => { 
    if(e.key !== 'Enter') return;   
    let result = input.current.value;
    input.current.value='';

    if(result === ''){
      alert('검색어를 입력하세요.');
      return;
    } 

    if(enableClick){
      setIsInterest(false);
      setEnableClick(false);
      setLoading(true);
      frame.current.classList.remove('on');

      getFlickr({
        type: 'search',
        count: 500,
        tags: result
      });
    }
  }

  const showSearch = () => {     
    let result = input.current.value;
    result = result.trim();
    input.current.value='';
    

    if(result === ''){
      alert('검색어를 입력하세요.');
      return;
    } 

    if(enableClick){
      setIsInterest(false);
      setEnableClick(false);
      setLoading(true);
      frame.current.classList.remove('on');

      getFlickr({
        type: 'search',
        count: 500,
        tags: result
      });
    }
  }
  
  //처음 컴포넌트 렌더링시
  useEffect(()=>{    
    main.current.classList.add('on');
    //isInterest값을 true로 변경하고
    setIsInterest(true);
    //로딩바 숨김처리
    setLoading(false);    
    //갤러리 프레임 보임
    frame.current.classList.add('on');
    
  },[]);

  return (
    <>
    <main className="content gallery" ref={main}>
      <figure></figure>
      
      <div className='innerWrap'>
        <div className="inner">     
          <h1 onClick={showInterest}>Gallery</h1>        
          
          <div className="searchBox">
            <input type="text" ref={input} onKeyUp={showSearchEnter} />
            <button onClick={showSearch}>search</button>
          </div>
          
          {loading ? <img className='loading' src={path+'/img/loading.gif'} /> : null}

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

