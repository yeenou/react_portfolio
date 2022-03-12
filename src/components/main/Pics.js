import axios from 'axios'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFlickr } from '../../redux/actions';

export default function Pics(){
  const picData = useSelector(state=> state.flickrReducer.flickr);
  const dispatch = useDispatch();

  const getFlickr = async () => {
    const api_key = 'd5ed279c6af8a6b280a6848dd230330d';
    const method1 = 'flickr.interestingness.getList';
    const num = 20;
    const url = `https://www.flickr.com/services/rest/?method=${method1}&per_page=${num}&api_key=${api_key}&format=json&nojsoncallback=1`;

    await axios.get(url).then(json=>{
      dispatch(setFlickr(json.data.photos.photo));
    })
  }

  useEffect(()=>{
    if(picData.length===0) getFlickr();    
  },[])  

  return (
    <section id="pics">
      <div className='inner'>
        <h1>Gallery</h1>

        <ul>
          {picData.map((pic,idx)=>{
            if(idx<3){
              return (
                <li key={idx}>
                  <div className="txt">
                    <h2>Lorem, ipsum.</h2>
                    <span>lorem</span>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, odio distinctio. Dolor nemo officia accusamus natus, tenetur nesciunt vitae quibusdam consequuntur nulla ab assumenda laborum voluptatum aspernatur quae, soluta magnam!</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere iure numquam doloribus quas nostrum ducimus enim, nobis magni. Repellat voluptatibus quasi error laborum animi magnam!</p>
                  </div>

                  <img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`} />
                  
                </li>
              )
            }          
          })}
        </ul>
      </div>
    </section>
  )
}