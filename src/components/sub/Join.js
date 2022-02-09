import { useEffect, useRef, useState } from "react";

export default function Join(){
  let main = useRef(null);

  //state로 관리할 초기 value값들
  const initVal = {
    userid: ''
  }

  //useState로 초기 value값을 state에 담아서 관리 시작
  const [val, setVal] = useState(initVal);

  //input의 상태값이 변경될때마다 실행될 함수
  const handleChange = e => { 
    //input요소의 name값과 value값을 구조분해 할당으로 가져옴   
    const {name, value} = e.target;
    console.log(`name: ${name}, value: ${value}`);
    //onChange 발생시 기존 val state값을 현재 사용자가 입력하는 값으로 갱신
    setVal({...val, [name]: value});
    //결과적으로 현재 입력하고 있는 값이 input요소의 value속성에 의해서 출력됨
    console.log(val);
  }

  useEffect(()=>{
    main.current.classList.add('on');
  },[]);

  return (
    <main className="content join" ref={main}>
      <figure></figure>
      
      <div className="inner">
        <h1>Join</h1>
        <section>
          <form>
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
                        //실제 state값이 변경되어야지 input창에 값 출력
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