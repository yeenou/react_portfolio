import { useEffect, useRef, useState } from "react";

export default function Community(){
  let main = useRef(null);
  let [index, setIndex] = useState(0);

  useEffect(()=>{    
    main.current.classList.add('on');    
  },[])
  
  return (
    <main className="content community" ref={main}>
      <figure></figure>
      
      <div className="inner">
        <h1>Community</h1>

        <section>
          <button onClick={()=>setIndex(--index)}>-</button>
          <button onClick={()=>setIndex(++index)}>+</button>
          <h2>{index}</h2>
        </section>
      </div>
    </main>
  )
}