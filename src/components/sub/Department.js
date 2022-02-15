import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setMembers } from '../../redux/actions';

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
        <h1>Department</h1>

        <button onClick={()=>{
          dispatch(setMembers(newMember))
        }}>멤버변경</button>

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