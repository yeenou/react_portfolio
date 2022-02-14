import Header from '../common/Header';
import Visual from './Visual';
import Intro from './Intro';
import News from './News';
import Info from './Info';
import Btns from './Btns';

export default function Main(){

  return (
    <>
      <Header type={'main'} />
      <Visual />
      <Intro />
      <News />
      <Info />
      <Btns />
    </>
  )
}