import Main from './components/main/Main';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Department from './components/sub/Department';
import Community from './components/sub/Community';
import Gallery from './components/sub/Gallery';
import Youtube from './components/sub/Youtube';
import Location from './components/sub/Location';
import Join from './components/sub/Join';
import { Route, Switch } from 'react-router-dom';
import './scss/style.scss';

export default function App() {
  return (
    <div className="App">   
      <Switch>
        <Route exact path='/' component={Main}></Route>       
        <Route path='/' component={()=> <Header type={'sub'} />}></Route>
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
