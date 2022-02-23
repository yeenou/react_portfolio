import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setMembers } from '../../redux/actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKaaba } from '@fortawesome/free-solid-svg-icons'
import { faCity } from '@fortawesome/free-solid-svg-icons'
import { faGem } from '@fortawesome/free-solid-svg-icons'


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
      <figure>
        <div className="inner">
          <h1> <span>A</span>BO <br /> 
            <span>__</span> UT <br />
            US
          </h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum atque, molestias voluptas maiores deserunt ea! Deleniti molestiae obcaecati amet. Consequatur itaque dolores quos veritatis eaque, minus quisquam fugit corporis commodi rem architecto nisi, quia laboriosam obcaecati accusamus ea laudantium facere et, provident eligendi voluptatibus expedita nesciunt! Ab, quo rem?</p>
        </div>
      </figure>
      
      <div className="inner">

        <div className="introAbout">
          <h1>ABOUT <span>GO.ABCD</span></h1>
          <div className="wrap">
            <article>
              <h2>we turn ideas into works of art.</h2>
              <p>For each project we dolor sit amet consectetur adipisicing elit. Illo cum dolorem quam facere. Odit perspiciatis, adipisci fuga quisquam incidunt nulla quod omnis autem ex magni, aut voluptatem cumque ea modi odio libero quas excepturi ducimus. ipsum dolor sit amet consectetur adipisicing elit. Illo cum dolorem quam facere. Odit perspiciatis, fuga quisquam incidunt nulla fuga quisquam incidunt nulla quod omnis autem ex magni, ea modi odio libero quas quod omnis autem ex magni, aut voluptatem cumque ea modi odio libero quas provident, ducimus Id!</p>
            </article>
            <article>
              <h2>our <br /> specialization:</h2>
              <FontAwesomeIcon icon={faKaaba} />
              <h3>ARCHITECTURE</h3>
              <FontAwesomeIcon icon={faCity} />
              <h3>INTERIORS</h3>
              <FontAwesomeIcon icon={faGem} />
              <h3>PLANING</h3>
            </article>
            <article>
              <img src={path+ '/img/about.jpg'} alt="" />
              </article>
          </div>
        </div>

        <div className="ceoAbout">
          <div className="pic">
            <img src={path+ '/img/ceo.jpg'} alt="" />
          </div>
          <div className="txt">
            <h2>Lorem, ipsum.</h2>
            <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium quod sit unde repudiandae quis cumque officiis officia voluptatibus architecto similique eligendi eos voluptatum vel sequi aliquam assumenda, obcaecati optio eveniet vitae at voluptatem numquam distinctio placeat! Voluptates tempora quibusdam dolorum nam et doloremque. Quasi adipisci fugit, cupiditate omnis eligendi similique illo? Voluptas amet deleniti repudiandae? Odit enim molestiae ullam. Doloremque est modi ratione veniam neque earum et nostrum error ut, pariatur, omnis ipsam ullam quia  mollitia illo magni, dolores optio alias repellendus? Sed nihil iusto omnis accusamus alias. <br />
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium deleniti cum sit corporis vero nam quis! Voluptatibus ipsum, vero enim tempora, natus impedit est consequatur dolore accusamus hic perferendis repellat amet, commodi maxime aliquam iusto! Totam possimus ut eaque asperiores dolore, soluta praesentium, sequi officia incidunt veritatis vitae illo corporis impedit. Rerum sapiente sunt, illum et vero quas expedita numquam ullam! Sed unde in distinctio consectetur aperiam pariatur fugiat repellendus quidem molestias quos, architecto sint esse animi nulla hic veniam saepe? Mollitia itaque nostrum tenetur quos aperiam. Nihil, molestiae? Temporibus, laudantium veritatis consectetur deserunt iste magnam, blanditiis sunt quaerat officiis, odio tempore alias. Hic deserunt ab repellendus facilis, aspernatur, suscipit reprehenderit, maiores eum voluptatem quidem excepturi? Fugit voluptatum quas explicabo sint esse animi nulla hic veniam saepe.</p>
            <span>ceo.mm</span>
          </div>        
        </div>

        <div className="memberAbout">
          <h1>OUR <span>TEAMS</span></h1>
          
          
          {/* <button onClick={()=>{ dispatch(setMembers(newMember)) }}>멤버변경</button> */}
          


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
      </div>
    </main>
  )
}