import { useEffect, useRef, useState } from "react";

export default function Join(){
  let main = useRef(null);
  const path = process.env.PUBLIC_URL;  
  
  const initVal = {
    userid: '',
    pwd1: '',
    pwd2: '',
    email: '',
    comments: '',
    gender: false,
    interests: false,
    edu: false
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
  
  const handleReset = () => {
    setVal(initVal);
    setErr({});
    setIsSubmit(false);
  }

  const handleRadio = e => {    
    const {name} = e.target;
    const isCheck = e.target.checked;   
    setVal({...val, [name]: isCheck});
  }

  const handleCheck = e => {
    let isChecked = false;
    const {name} = e.target;
    const inputs = e.target.parentElement.querySelectorAll('input');
    inputs.forEach(el=>{
      if(el.checked) isChecked=true;
    });         
    setVal({...val, [name]: isChecked});    
  }

  const  handleSelect = e => {
    const {name} = e.target;
    const isSelected = e.target.options[e.target.selectedIndex].value;
    setVal({...val, [name]: isSelected});
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
    if( !val.gender ){
      errs.gender= '성별을 선택하세요';
    }
    if( !val.interests ){
      errs.interests= '관심사를 하나이상 선택하세요';
    }
    if( !val.edu ){
      errs.edu= '학력을 선택해주세요';
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

      <img src={path+'/img/join1.jpg'} alt="" />
      
      <div className="inner">
        <h1>Join</h1>

        {/* <div className="wrap">
          <article>
            <h2>Lorem</h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum aliquam sint quibusdam deserunt non sunt vero, placeat quia!</p>
          </article>
          <article className="on">
            <h2>Lorem</h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum aliquam sint quibusdam deserunt non sunt vero, placeat quia!</p>
          </article>
          <article>
            <h2>Lorem</h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum aliquam sint quibusdam deserunt non sunt vero, placeat quia!</p>
          </article>
          <article>
            <h2>Lorem</h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum aliquam sint quibusdam deserunt non sunt vero, placeat quia!</p>
          </article>
        </div> */}

        <section>
          { success ? <div className='success'>회원가입을 축하합니다.</div> : null }
          <div className="pic">
            <img src={path+'/img/join1.jpg'} alt="" />
            <h2>Lorem</h2>
            <p>Lorem ipsum dolor sitant amet consectetur.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend className='h'>회원가입 폼 양식</legend> 

              <table>
                <caption className='h'>회원가입 입력</caption>
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
                    <th scope='row'>
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
                    <th scope='row'>
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
                    <th scope='row'>
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

                  {/* gender */}
                  <tr>
                    <th scope='row'>
                      GENDER
                    </th>
                    <td>
                      <label htmlFor="male">Male</label>
                      <input 
                        type="radio" 
                        id='male'
                        name='gender'
                        onChange={handleRadio}
                      />

                      <label htmlFor="female">Female</label>
                      <input 
                        type="radio"
                        id='female'
                        name='gender'
                        onChange={handleRadio} 
                      />

                      <span className="err">{err.gender}</span>
                    </td>
                  </tr>  
                  
                  {/* interests */}
                  <tr>
                    <th scope='row'>
                      INTERESTS
                    </th>
                    <td>
                      <label htmlFor="sports">Sports</label>
                      <input 
                        type="checkbox" 
                        name='interests'
                        id='sports'
                        onChange={handleCheck}
                      />

                      <label htmlFor="sports">Music</label>
                      <input 
                        type="checkbox" 
                        name='interests'
                        id='music'
                        onChange={handleCheck}
                      />

                      <label htmlFor="sports">Game</label>
                      <input 
                        type="checkbox" 
                        name='interests'
                        id='game'
                        onChange={handleCheck}
                      />
                      <span className="err">{err.interests}</span>
                    </td>
                  </tr>

                  {/* edu */}
                  <tr>
                    <th scope='row'>
                      <label htmlFor="edu">EDUCATION</label>
                    </th>
                    <td>
                      <select name="edu" id="edu" onChange={handleSelect}>
                        <option value="">학력을 선택하세요</option>
                        <option value="elementary-school">초등학교 졸업</option>
                        <option value="middle-school">중학교 졸업</option>
                        <option value="high-school">고등학교 졸업</option>
                        <option value="college">대학교 졸업</option>
                      </select>
                      <span className="err">{err.edu}</span>
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
                    <th colSpan='2' className='btnSet'>
                      <input type="reset" value='CANCEL' onClick={handleReset} />
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