import axios from 'axios';
import { useEffect, useRef, useState } from "react";

export default function Youtube(){
  let main = useRef(null);
  const [items, setItems] = useState([]);

  const api_key = 'AIzaSyDgamOPXenuhKr9LoqkU0RTq7dzP9aBZgw';
  const play_list = 'PLYOPkdUKSFgX5CgKf68RJzJHec0XEdBNd';
  const num = 4;
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${api_key}&playlistId=${play_list}&maxResults=${num}`;

  useEffect(()=>{
    main.current.classList.add('on');

    axios.get(url).then(json=>{
      console.log(json.data.items);
      setItems(json.data.items);
    })
  },[]);
  
  return (
    <main className="content youtube" ref={main}>
      <figure></figure>
      
      <div className="inner">
        <h1>Youtube</h1>
        <section>
          {items.map((item,idx)=>{
            return (
              <article key={idx}>
                <div className="inner">
                  <div className="pic">
                    <img src={item.snippet.thumbnails.standard.url} />
                    <h2>{item.snippet.title}</h2>
                    <p>{item.snippet.description}</p>
                  </div>
                </div>
              </article>
            )            
          })}
        </section>
      </div>
    </main>
  )
}