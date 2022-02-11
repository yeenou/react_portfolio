import { useEffect, useRef, useState } from "react";

export default function Community(){
  const main = useRef(null);  
  const input = useRef(null);
  const textarea = useRef(null);
  const showBox = useRef(null);
  const [posts, setPosts] = useState([
    {title: 'Hello1', content: 'Here comes description in detail.'},
    {title: 'Hello2', content: 'Here comes description in detail.'},
    {title: 'Hello3', content: 'Here comes description in detail.'},
    {title: 'Hello4', content: 'Here comes description in detail.'},
  ]);

  const createPost=()=>{   
    setPosts([      
      {
        title: input.current.value,
        content: textarea.current.value
      },
      ...posts
    ])
 
    input.current.value= '';
    textarea.current.value= '';
  }
 
  const deletePost = index => {
    setPosts(     
      posts.filter((_, idx) => idx !== index)
    )
  }

  //인수로 수정모드 변경할 포스트의 순서값 받아서 해당 순번의 state값만 수정가능한 형태로 정보값 변경
  const enableUpdate = index => {
    setPosts(
      posts.map((post, idx)=>{
        if(idx===index) post.enableUpdate=true;
        return post;
      })
    )
    console.log(posts);
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

                  <div className="btns"> 
                    {/* 수정버튼시 수정모드로 변경해주는 함수 호출 */}
                    <button onClick={()=>enableUpdate(idx)}>modify</button>
                    <button onClick={()=>deletePost(idx)}>delete</button>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      </div>
    </main>
  )
}