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
      {
        title: input.current.value,
        content: textarea.current.value
      },
      ...posts
    ])
 
    input.current.value= '';
    textarea.current.value= '';
  }

  //순번으로 받은 게시글만 삭제하는 함수
  const deletePost = index => {
    setPosts(
      //기본 배열을 받아서 조건식을 통해 특정 조건이 성립하는 데이터만 필러팅해서 다시 새롭게 반환하는 함수
      posts.filter((_, idx) => idx !== index)
      //현재 반복돌고 있는 post의 순번이랑 인수로 받은 삭제포스트의 순번이 같은 것만 반환
    )
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

            {/* 초기화 버튼 클릭시 입력창 비움 */}
            <button onClick={()=>{
              input.current.value='';
              textarea.current.value='';
            }}>cancel</button>

            {/* 저장 버튼 클릭시 createPost함수호출 */}
            <button onClick={createPost}>create</button>
          </div>
          
          <div className="showList" ref={showBox}>
            {posts.map((post, idx) => {
              return (
                <article key={idx}>
                  <h2>{post.title}</h2>
                  <p>{post.content}</p>

                  <div className="btns">
                    {/* 삭제버튼 클릭시 현재 게시글의 순번을 인수로 전달 */}
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