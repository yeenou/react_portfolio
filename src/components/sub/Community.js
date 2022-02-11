import { useEffect, useRef, useState } from "react";

export default function Community(){
  const main = useRef(null);  
  const input = useRef(null);
  const textarea = useRef(null);
  const showBox = useRef(null);
  const [posts, setPosts] = useState([
    {title: 'Hello', content: 'Here comes description in detail.'},
    {title: 'Hello2', content: 'Here comes description in detail2.'},
  ]);

  const createPost=()=>{
    setPosts([
      ...posts,
      {
        title: input.current.value,
        content: textarea.current.value
      }
    ])

    input.current.value= '';
    textarea.current.value= '';
  }
  

  useEffect(()=>{    
    main.current.classList.add('on');    
  },[])
  
  return (
    <main className="content community" ref={main}>
      <figure></figure>
      
      <div className="inner">
        <h1>Community</h1>

        <section>
          <div className='inputBox'>
            <input 
              type="text" 
              placeholder='제목을 입력하세요'
              ref={input}
            /><br />
            <textarea 
              cols="30" 
              rows="10"
              placeholder='본문을 입력하세요'
              ref={textarea}
            >
            </textarea><br />
          
            <button onClick={()=>{
              input.current.value='';
              textarea.current.value='';
            }}>cancel</button>

            <button onClick={createPost}>create</button>
          </div>
          
          <div className="showList" ref={showBox}>
            {posts.map((post, idx) => {
              return (
                <article key={idx}>
                  <h2>{post.title}</h2>
                  <p>{post.content}</p>
                </article>
              )
            })}
          </div>
        </section>
      </div>
    </main>
  )
}