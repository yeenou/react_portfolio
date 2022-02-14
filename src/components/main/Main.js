import Header from '../common/Header';
import Visual from './Visual';
import Intro from './Intro';
import News from './News';
import Info from './Info';
import Btns from './Btns';
import Anime from '../../class/anime.js';
import { useEffect, useRef } from 'react';

export default function Main(){
  //mainWrap을 참조할 main변수 추가
  const main = useRef(null);
  //세로 위치값을 참조할 pos변수 추가
  const pos = useRef([]);

  //참조된 mainWrap에서 .myScroll요소를 모두 찾은뒤 세로 위치값을 pos(ref)로 옮겨담을 함수 정의
  const getPos = () => {
    const secs = main.current.querySelectorAll('.myScroll');
    let arr = [];
    for(let sec of secs) arr.push(sec.offsetTop);
    pos.current = arr;
    console.log(pos.current);
  }

  //컴포넌트 생성시
  useEffect(()=>{
    //세로 위치값 구함
    getPos();

    //브라우저가 리사이즈 될때마다 세로위치값 구함
    window.addEventListener('resize', getPos);
    //해당 컴포넌트가 사라질때 window전역에 연결된 getPos함수 제거
    return ()=> window.removeEventListener('resize', getPos);
  },[]);

  return (
    <div id='mainWrap' ref={main}>
      <Header type={'main'} />
      <Visual />
      <Intro />
      <News />
      <Info />
      <Btns />
    </div>
  )
}