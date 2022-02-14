import Header from '../common/Header';
import Visual from './Visual';
import Intro from './Intro';
import News from './News';
import Info from './Info';
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

  useEffect(()=>{   
    getPos();   
    window.addEventListener('resize', getPos);   
    return ()=> window.removeEventListener('resize', getPos);
  },[]);

  //index값이 변경될때마다 실행될 useEffect추가
  useEffect(()=>{
    console.log(index);
  },[index])

  return (
    <div id='mainWrap' ref={main}>
      <Header type={'main'} />
      <Visual />
      <Intro />
      <News />
      <Info />
      {/* Btns 자식 컴포넌트에 getIndex함수를 prop으로 전달 */}
      <Btns getIndex={getIndex} />
    </div>
  )
}