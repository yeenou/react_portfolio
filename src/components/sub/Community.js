import { useEffect, useRef, useState } from "react";

export default function Community(){
  const main = useRef(null);  
  const input = useRef(null);
  const textarea = useRef(null);
  const showBox = useRef(null);
  const updateInput = useRef(null);
  const updateTextarea = useRef(null);
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
  
  const enableUpdate = index => {
    setPosts( 
      posts.map((post, idx)=>{        
        if(idx===index) post.enableUpdate=true;
        return post;
      })
    )
    console.log(posts);
  }

  const disableUpdate = index => {
    setPosts( 
      posts.map((post, idx)=>{        
        if(idx===index) post.enableUpdate=false;
        return post;
      })
    )
    console.log(posts);
  }

  //실제 post 업데이트 함수
  const updatePost = index => {
    setPosts(
      posts.map((post, idx)=>{
        if(idx===index){      
          post.title = updateInput.current.value;
          post.content = updateTextarea.current.value;
          post.enableUpdate = false;
        }
        return post;
      })
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
                  {
                    post.enableUpdate
                    ?
                    // 수정모드 일때 리턴될 JSX
                    <>
                      <div className="post">
                        <input 
                          type="text" 
                          defaultValue={post.title} 
                          ref={updateInput}
                        /><br />
                        <textarea 
                          defaultValue={post.content}
                          ref={updateTextarea}
                        >
                          </textarea><br />
                      </div>                  
                      
                      <div className="btns">                    
                        <button onClick={()=>updatePost(idx)}>update</button>
                        <button onClick={()=>disableUpdate(idx)}>cancel</button>
                      </div>
                    </>
                    :
                    // 출력모드 일때 리턴될 JSX
                    <>
                      <div className="post">
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                      </div>                  
                      
                      <div className="btns">                    
                        <button onClick={()=>enableUpdate(idx)}>modify</button>
                        <button onClick={()=>deletePost(idx)}>delete</button>
                      </div>
                    </>
                  }

                  
                </article>
              )
            })}
          </div>
        </section>
      </div>
    </main>
  )
}