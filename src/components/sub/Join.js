import { useEffect, useRef, useState } from "react";

export default function Join(){
  let main = useRef(null);
  
  const initVal = {
    userid: ''
  }

  const [val, setVal] = useState(initVal);
  //인풋의 인증 실패시 출력될 에러메세지를 담을 state생성
  const [err, setErr] = useState({});

  const handleChange = e => {  
    const {name, value} = e.target; 
    setVal({...val, [name]: value});
  }

  const handleSubmit = e => {
    e.preventDefault();
    
    //check함수에 인수로 기존 err state로 인수로 전달
    setErr(check(val));  
  }

  //에러 객체를 반환하는 함수
  const check = val => {
    let errs = {}
    //인수로 받은 value의 조건에 부합하면
    if( !val.userid || val.userid.length<5 ){
      //빈 err객체에 userid에 해당하는 에러객체를 추가
      errs.userid = '아이디를 5글자 이상 입력하세요';
    }   
    //추가된 객체내용을 내보냄
    return errs;
  }

  useEffect(()=>{
    main.current.classList.add('on');
  },[]);

  //err state값이 변경될때마다 동작하는 함수
  useEffect(()=>{
    console.log(err);
  },[err]);




  return (
    <main className="content join" ref={main}>
      <figure></figure>
      
      <div className="inner">
        <h1>Join</h1>
        <section>
          {/* submit이벤트 발생시 함수호출 */}
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>회원가입 폼 양식</legend>

              <table border='1'>
                <caption>회원가입 입력</caption>
                <tbody>
                  <tr>
                    <th scope='row'>
                      <label htmlFor="userid">USER ID</label>
                    </th>
                    <td>
                      <input 
                        type="text" 
                        id='userid'
                        name='userid'
                        placeholder='아이디를 입력하세요'                   
                        value={val.userid}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th colSpan='2'>
                      <input type="reset" value='CANCEL' />
                      <input type="submit" value='SEND' />
                    </th>
                  </tr>
                </tbody>
              </table>
            </fieldset>
          </form>
        </section>
      </div>
    </main>
  )
}