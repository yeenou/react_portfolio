import { useEffect, useRef, useState } from "react";

export default function Join(){
  let main = useRef(null);
  
  const initVal = {
    userid: '',
    pwd1: '',
    pwd2: '',
    email: '',
    comments: ''
  }
  const [val, setVal] = useState(initVal);
  const [err, setErr] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = e => {  
    const {name, value} = e.target; 
    setVal({...val, [name]: value});
  } 

  const handleSubmit = e => {
    e.preventDefault(); 
    setIsSubmit(true); 
    setErr(check(val));  
  }  

  //에러 객체를 반환하는 함수
  const check = val => {
    let errs = {}  
    const eng = /[a-zA-Z]/;
    const num = /[0-9]/;
    const spc = /[~!@#$%^&*()_+\]\[]/;    

    if( val.userid.length<5 ){      
      errs.userid = '아이디를 5글자 이상 입력하세요';
    } 
    if( val.pwd1<5 || !eng.test(val.pwd1) || !num.test(val.pwd1) || !spc.test(val.pwd1)){
      errs.pwd1= '비밀번호는 5글자 이상 문자,숫자,특수문자를 모두 포함하세요';
    }
    if( val.pwd1 !== val.pwd2 ){
      errs.pwd2= '두개의 비밀번호를 동일하게 입력하세요';
    }
    if( val.email.length<8 || !/@/.test(val.email) ){
      errs.email = '이메일 주소는 8글자 이상 @를 포함하세요';
    }
    if( val.comments.length<10 ){
      errs.comments = '남기는 말을 10글자 이상입력하세요';
    }
    return errs;
  }

  useEffect(()=>{
    main.current.classList.add('on');
  },[]);

  //err state값이 변경될때마다 동작하는 함수
  useEffect(()=>{   
    const len = Object.keys(err).length;
    
    if(len === 0 && isSubmit){     
      setSuccess(true);
    }else{
      setSuccess(false);
    }
  },[err]);

  return (
    <main className="content join" ref={main}>
      <figure></figure>
      
      <div className="inner">
        <h1>Join</h1>
        <section>
          { success ? <div>회원가입을 축하합니다.</div> : null }
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>회원가입 폼 양식</legend>

              <table border='1'>
                <caption>회원가입 입력</caption>
                <tbody>
                  {/* userid */}
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
                      <span className='err'>{err.userid}</span>
                    </td>
                  </tr>

                  {/* password */}
                  <tr>
                    <th>
                      <label htmlFor="pwd1">PASSWORD</label>
                    </th>
                    <td>
                      <input 
                        type="password"
                        id='pwd1'
                        name='pwd1'
                        placeholder='비밀번호를 입력하세요'
                        value={val.pwd1}
                        onChange={handleChange} 
                      />
                      <span className='err'>{err.pwd1}</span>
                    </td>
                  </tr>

                  {/* re password */}
                  <tr>
                    <th>
                      <label htmlFor="pwd2">RE-PASSWORD</label>
                    </th>
                    <td>
                      <input 
                        type="password"
                        id='pwd2'
                        name='pwd2'
                        placeholder='비밀번호를 재 입력하세요'
                        value={val.pwd2}
                        onChange={handleChange} 
                      />
                      <span className='err'>{err.pwd2}</span>
                    </td>
                  </tr>

                  {/* e-mail */}
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
                      <span className='err'>{err.email}</span>
                    </td>
                  </tr>

                  {/* comments */}
                  <tr>
                    <th>
                      <label htmlFor="comments">LEAVE COMMENTS</label>
                    </th>
                    <td>
                      <textarea 
                        name="comments" 
                        id="comments"
                        value={val.comments} 
                        onChange={handleChange}
                        cols="30" rows="10"
                      >
                      </textarea>
                      <span className="err">{err.comments}</span>
                    </td>
                  </tr>

                  {/* btns */}
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