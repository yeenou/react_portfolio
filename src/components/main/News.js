import { useState, useEffect } from 'react';

export default function News(){
  //초기 로딩시 사용자 컴퓨터에 localStorage에 데이터가 없을시 임의로 보여줄 초기 데이터
  const defaultData = [
    {title: 'Hello1', content: 'Here comes description in detail.'},
    {title: 'Hello2', content: 'Here comes description in detail.'},
    {title: 'Hello3', content: 'Here comes description in detail.'},
    {title: 'Hello4', content: 'Here comes description in detail.'},
    {title: 'Hello5', content: 'Here comes description in detail.'},
    {title: 'Hello6', content: 'Here comes description in detail.'}
  ]

  const getLocalItems = () => {
    let data = localStorage.getItem('posts');

    if(data){
      return JSON.parse(data);
    }else{
      return defaultData;
    }
  }

  const [posts] = useState(getLocalItems);

  //posts에 초기 데이터값이 담기자마자 localStorage에도 데이터 저장
  useEffect(()=>{
    localStorage.setItem('posts', JSON.stringify(posts));
  },[]);

  return (
    <section id='news' className='myScroll'>
      <div className="inner">
        <h1>Recent Post</h1>
        
        <div className="txt">
          <h2>WHY IPSUM DOLOR ?</h2>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem dolor doloremque veritatis iure sunt reprehenderit aperiam modi quis vero explicabo necessitatibus culpa totam debitis quasi molestias harum, at natus hic!</p>
          <a href="">ABOUT US</a>
        </div>

        <ul>
          {posts.map((post, idx)=>{
            if(idx < 3) {
              return (              
                <li key={idx}>
                  <h2> <span> + </span> {post.title}</h2>
                  <p>{post.content}</p>
                </li>
              )
            }
          })}
        </ul>
      </div>
    </section>
  )
}