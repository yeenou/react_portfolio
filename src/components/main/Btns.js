export default function Btns(props){
  return (
    <ul id='btns'>
      <li className='on' onClick={()=>props.getIndex(0)}></li>
      <li onClick={()=>props.getIndex(1)}></li>
      <li onClick={()=>props.getIndex(2)}></li>
      <li onClick={()=>props.getIndex(3)}></li>
    </ul>
  )
}

// props로 전달 받은 getIndex함수를 각각의 li에 이벤트연결
// 각 li를 클릭시 해당 순서값을 인수로 넣어서 getIndex를 호출
// 자식컴포넌트로 하여금 부모 컴포넌트의 index state값을 변경가능