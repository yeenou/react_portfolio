import Main from './components/main/Main';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Department from './components/sub/Department';
import Community from './components/sub/Community';
import Gallery from './components/sub/Gallery';
import Youtube from './components/sub/Youtube';
import Location from './components/sub/Location';
import Join from './components/sub/Join';
import './scss/style.scss';
import { Route, Switch } from 'react-router-dom';

export default function App() {
  return (
    <div className="App">   
      <Switch>
        <Route exact path='/' component={Main}></Route>
        <Route path='/'>
          <Header type={'sub'} />
        </Route>  
      </Switch>

      <Route path='/department' component={Department}></Route>
      <Route path='/community' component={Community}></Route>
      <Route path='/gallery' component={Gallery}></Route>
      <Route path='/youtube' component={Youtube}></Route>
      <Route path='/location' component={Location}></Route>
      <Route path='/join' component={Join}></Route>     

      <Footer />
    </div>
  );
}

/*
  각 라우터를 Switch로 컴포넌트로 감싸놓으면
  중첩되는 경로가 있을때 상단에 있는 경로만 적용하고 그 이후는 무시
  Switch를 활용할때에는 중첩되는 url경로중 디테일한 요소를 보통 위쪽에 배치해서 route를 세분화
*/
