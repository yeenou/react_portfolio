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
            let tit = item.snippet.title;
            let tit_len = tit.length;
            let desc = item.snippet.description;
            let desc_len = desc.length;

            return (
              <article key={idx}>
                <div className="inner">
                  <div className="pic">
                    <img src={item.snippet.thumbnails.standard.url} />
                    <h2>{tit_len>40 ? tit.substr(0,40)+'...' : tit}</h2>
                    <p>{desc_len>150 ? desc.substr(0,150)+'...' : desc}</p>
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