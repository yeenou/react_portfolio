import axios from 'axios';
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Masonry from 'react-masonry-component';
import { setFlickr } from '../../redux/actions';

export default function Gallery(){ 
  const main = useRef(null);
  const frame = useRef(null);
  const input = useRef(null); // input값 참조
  const picData = useSelector(state=>state.flickrReducer.flickr); 
  const [isPop, setIsPop] = useState(false);
  const [index, setIndex] = useState(0); 
  const [loading, setLoading] = useState(true);
  const [enableClick, setEnableClick] = useState(true); 
  const [isInterest, setIsInterest] = useState(true);
  const path = process.env.PUBLIC_URL;  
  const dispatch = useDispatch();

  const masonryOptions = {
    fitWidth: false,
    gutter: 0,
    itemSelector: '.item',
    transitionDuration: '0.5s'
  }

   // flickr 
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
      dispatch(setFlickr(json.data.photos.photo));      
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
      setEnableClick(false); //재클릭 방지
      setLoading(true); //로딩 실행
      frame.current.classList.remove('on');

      getFlickr({
        type: 'interest',
        count: 50
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
        count: 50,
        tags: result
      });
    }
  }

  const showSearch = () => {     
    let result = input.current.value;
    result = result.trim(); // 빈칸 2 개 이상일 때 (입력값 없을 떄) 1개로 인식.
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
        count: 50,
        tags: result
      });
    }
  }  

  useEffect(()=>{    
    main.current.classList.add('on');
    setIsInterest(true); 
    setLoading(false); 
    frame.current.classList.add('on');
  },[]);

  return (
    <>
    <main className="content gallery" ref={main}>
      <figure>
        <div className="inner">
          <h1> <span>G</span>AL <br /> 
            <span>__</span> LE <br />
            RY
          </h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum atque, molestias voluptas maiores deserunt ea! Deleniti molestiae obcaecati amet. Consequatur itaque dolores quos veritatis eaque, minus quisquam fugit corporis commodi rem architecto nisi, quia laboriosam obcaecati accusamus ea laudantium facere et, provident eligendi voluptatibus expedita nesciunt! Ab, quo rem?</p>
        </div>
      </figure>
      
      <div className='innerWrap'>
        <div className="inner">     
          <h1 onClick={showInterest}>Gallery</h1> 
          
          <div className="searchBox">
            <input type="text" ref={input} onKeyUp={showSearchEnter} placeholder='검색어를 입력하세요' />
            <button onClick={showSearch}>
              {/* <i class="fal fa-search"></i> */}
              SEARCH
              </button>
          </div>
          
          {loading ? <img className='loading' src={path+'/img/loading.gif'} /> : null}

          <section ref={frame}>
            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, culpa. <br />
            Lorem ipsum dolor sit amet.
            </span>

            <Masonry 
              elementType={'div'}
              options={masonryOptions}
            >
            {picData.map((item,idx)=>{
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
        <h1>{picData[index].title}</h1>
        <img src={`https://live.staticflickr.com/${picData[index].server}/${picData[index].id}_${picData[index].secret}_b.jpg`} />        
        <span onClick={()=>{
          setIsPop(false);
        }}>close</span>
      </aside>
    )
  }
}

