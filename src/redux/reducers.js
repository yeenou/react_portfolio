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

const youtubeReducer = (state={youtube: []}, action) => {
  switch (action.type) {
    case 'SET_YOUTUBE' :
      return {...state, youtube: action.payload}
    default : 
      return state;
  }
}

const flickrReducer = (state={flickr: []}, action) => {
  switch (action.type) {
    case 'SET_FLICKR' :
      return {...state, flickr: action.payload}
    default : 
      return state;
  }
}

const reducers = combineReducers({
  departmentReducer, youtubeReducer, flickrReducer
})

export default reducers;