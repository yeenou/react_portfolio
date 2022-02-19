import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setMembers } from '../../redux/actions';

/*
  redux작업 흐름
  1 - 전역으로 상태관리할 값을 카테고리별로 reducer생성
  2 - store에서 reducer값을 받은 다음에 App컴포넌트로 값 전달
  3 - stroe에 관리되는 값을 호출하고 싶은 componenet에서 useSelector로 호출

  4 - action에는 reducer에 값을 변경할 함수 정의
  5 - 자식컴포넌트에서 store의 reducer값을 변경시 action함수를 호출해서 dispatch로 reducer에 전달
  6 - store에 있는 reducer값이 변경되면서 해당 store data가 바인딩되는 모든 컴포넌트는 자동적으로 재 랜더링 
*/

export default function Department(){
  let main = useRef(null);  
  const members = useSelector(state=> state.departmentReducer.members);  
  const path = process.env.PUBLIC_URL;
  const dispatch = useDispatch();
  const newMember   = [
    {
      "name": "Emily",
      "position": "Designer",
      "pic": "member4.jpg"
    },
    {
      "name": "Michael",
      "position": "Front-End Developer",
      "pic": "member5.jpg"
    },
    {
      "name": "Chang",
      "position": "Back-End Developer",
      "pic": "member6.jpg"
    }
  ];
  

  useEffect(()=>{  
    main.current.classList.add('on'); 
  },[]);

  return (
    <main className="content department" ref={main}>
      <figure></figure>
      
      <div className="inner">
        <h1>Our Teams</h1>

        <button onClick={()=>{ dispatch(setMembers(newMember)) }}>멤버변경</button>

        <section>
          {members.map((member, idx)=>{
            return (
              <article key={idx}>
                <img src={`${path}/img/${member.pic}`} />
                <h2>{member.name}</h2>
                <p>{member.position}</p>
              </article>
            )            
          })}
        </section>
      </div>
    </main>
  )
}