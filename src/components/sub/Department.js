import { useEffect, useRef } from "react";

export default function Department(){
  let main = useRef(null);

  useEffect(()=>{  
    main.current.classList.add('on');
  },[]);

  return (
    <main className="content department" ref={main}>
      <figure></figure>
      
      <div className="inner">
        <h1>Department</h1>
        <section></section>
      </div>
    </main>
  )
}