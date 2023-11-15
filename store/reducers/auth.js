import { SIGN_UP } from "../actions/auth"


const initialState={
 token:null,
  fetchedToken:null,
 expiresIn:null,
 expire:null,
 userId:null,
 fetchedUserId:null
}
export const AuthReducer=(state=initialState,action)=>{
switch(action.type){
 case SIGN_UP:
     return {...state,token:action.token,expiresIn:action.expiresIn,userId:action.userId}   
  case('LOG_IN'):
  return {...state,token:action.token,expiresIn:action.expiresIn,userId:action.userId}  
 case('GET_TOKEN'):return {...state,fetchedToken:action.token,expire:action.expire,fetchedUserId:action.userId}  
  case ('LOG_OUT'):
      return initialState
}
return state
}


