import { useEffect, useRef, useState } from "react";

export default function Community(){
  let main = useRef(null);
  let [index, setIndex] = useState(0);

  useEffect(()=>{
    //해당 컴포넌트가 생성될때 실행
    console.log('Community 컴포넌트 생성');
    main.current.classList.add('on');

    //해당 컴포넌트가 소멸될때 실행
    return ()=>{
      console.log('Community 컴포넌트 소멸');    
    }
  },[])

  //index state값이 변경될때마사 실행
  useEffect(()=>{
    console.log('index값 변경됨');
  },[index])

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
/*
  useEffect : 해당 컴포넌트의 생성, 상태값변경, 소멸이라는 생명주기에 따라 특정 구문을 실행할수 있는 hook 
  -- useEffect 첫번째 인수로 콜백함수 등록
  -- useEffect 두번째 인수로는 의존성을 등록 (원하는 state를 등록 가능)
  -- useEffect 두번째 인수로 빈 배열을 의존성으로 등록 : 해당 컴포넌트 처음 생성될때 한번만 호출 가능
  -- useEffect 콜백함수 안쪽에서 다시 return으로 함수를 내보내면 해당 함수의 구문은 컴포넌트가 소멸될때 호출됨
*/