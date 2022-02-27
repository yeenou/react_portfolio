import Header from '../common/Header';
import Visual from './Visual';
import Intro from './Intro';
import News from './News';
import Info from './Info';
import Pics from './Pics';
import Btns from './Btns';
import Anime from '../../class/anime.js';
import { useEffect, useRef, useState } from 'react';

export default function Main(){ 
  const main = useRef(null);  
  const pos = useRef([]);
  const [index, setIndex] = useState(0);

  //자식 컴포넌트에 순서값을 변경하는 함수를 wrappging함수로 정의
  const getIndex = index => {
    setIndex(index);
  }

  const getPos = () => {
    const secs = main.current.querySelectorAll('.myScroll');
    let arr = [];
    for(let sec of secs) arr.push(sec.offsetTop);
    pos.current = arr; 
  }

  const activation = () => {
    const base = -200;
    let scroll = window.scrollY;  
    const btns = main.current.querySelectorAll('#btns li');

    pos.current.map((pos, idx)=>{
      if(scroll >= pos+base ){
        for(const btn of btns) btn.classList.remove('on');
        btns[idx].classList.add('on');
      }
    })
  }

  useEffect(()=>{   
    getPos();   
    window.addEventListener('resize', getPos);  
    window.addEventListener('scroll', activation);

    return ()=> {
      window.removeEventListener('resize', getPos);
      window.removeEventListener('scroll', activation);
    } 
  },[]);

  //index값이 변경될때마다 실행될 useEffect추가
  useEffect(()=>{

    //index값이 변경될때하마 해당 순번의 위치로 스크롤 이동
    new Anime(window, {
      prop: 'scroll',
      value: pos.current[index],
      duration: 500
    })

  },[index])

  return (
    <div id='mainWrap' ref={main}>
      <Header type={'main'} />
      <Visual />
      <Intro />
      <Pics />
      <News />
      <Info /> 
      <Btns getIndex={getIndex} />
    </div>
  )
}