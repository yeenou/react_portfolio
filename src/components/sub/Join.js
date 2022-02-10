import { useEffect, useRef, useState } from "react";

export default function Join(){
  let main = useRef(null);
  
  const initVal = {
    userid: '',
    email: ''
  }
  const [val, setVal] = useState(initVal);
  const [err, setErr] = useState({});

  const handleChange = e => {  
    const {name, value} = e.target; 
    setVal({...val, [name]: value});
  } 

  const handleSubmit = e => {
    e.preventDefault();  
    setErr(check(val));  
  }  

  //에러 객체를 반환하는 함수
  const check = val => {
    let errs = {}    
    if( val.userid.length<5 ){      
      errs.userid = '아이디를 5글자 이상 입력하세요';
    } 
    if( val.email.length<8 ){
      errs.email = '이메일 주소는 8글자 이상 입력하세요';
    }
    return errs;
  }

  useEffect(()=>{
    main.current.classList.add('on');
  },[]);

  //err state값이 변경될때마다 동작하는 함수
  useEffect(()=>{
    console.log(err);
    //err객체의 key값의 갯수를 반환
    const len = Object.keys(err).length;
    
    if(len === 0){
      console.log('모든 인풋요소 인증 통과');
    }else{
      console.error('인증 실패');
    }
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
                    <th>
                      <label htmlFor="email">E-MAIL</label>
                    </th>
                    <td>
                      <input 
                        type="text" 
                        id='email'
                        name='email'
                        placeholder='이메일 주소를 입력하세요'
                        value={val.email}
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