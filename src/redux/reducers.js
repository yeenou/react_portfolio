import { combineReducers } from "redux";

const initMember = {
  members: [
    {
      "name": "Julia",
      "position": "CEO",
      "pic": "member1.jpg"
    },
    {
      "name": "Paul",
      "position": "Vice President",
      "pic": "member2.jpg"
    },
    {
      "name": "Peter",
      "position": "Engineer",
      "pic": "member3.jpg"
    }   
  ]
}

const departmentReducer = (state=initMember, action) => {
  switch (action.type) {  
    case 'SET_MEMBERS' : 
      return {...state, members: action.payload}

    default: 
      return state;
  }
}

const reducers = combineReducers({
  departmentReducer
})

export default reducers;