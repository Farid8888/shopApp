export const SIGN_UP='SIGN_UP'
import AsyncStorage from '@react-native-async-storage/async-storage';


let timer
export const singUp =(email,password)=>{
return async dispatch=>{
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDg__PjsTYTlYuZMC9ckQeE-J_nzBbZ6Kg`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            email:email,
            password:password,
            returnSecureToken:true
        })
    })
    
    const data =await response.json()
    const currentDate = new Date().getTime()
    const expired =parseInt(data.expiresIn)*1000 + currentDate
   const expire = expired.toString()
    if(!response.ok){
    const errorId =data.error.message
    let errorMessage
    if(errorId === 'EMAIL_EXISTS'){
     errorMessage='This email already exists'
    }
    throw new Error(errorMessage)
    }else{
        
       await AsyncStorage.setItem('token', data.idToken)
       await AsyncStorage.setItem('expire',expire)
       await AsyncStorage.setItem('userId',data.localId)
    }
    return dispatch({type:SIGN_UP,token:data.idToken,expiresIn:expired,userId:data.localId})
}
}

export const logIn =(email,password)=>{
    return async dispatch=>{
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDg__PjsTYTlYuZMC9ckQeE-J_nzBbZ6Kg`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                email:email,
                password:password,
                returnSecureToken:true
            })
        })
        const data = await response.json()
        const currentDate = new Date().getTime()
         const expired =parseInt(data.expiresIn)*1000 + currentDate
        const expire = expired.toString()
        if(!response.ok){
            const errorId =data.error.message
            console.log(errorId)
            let errorMessage
            if(errorId === 'INVALID_PASSWORD'){
             errorMessage='Wrong password'
            }else if(errorId === 'EMAIL_NOT_FOUND'){
                errorMessage ='Email does not exist'
            }
            throw new Error(errorMessage)
            }else{
    
        await AsyncStorage.setItem('token', data.idToken)
        await AsyncStorage.setItem('expire',expire)
        await AsyncStorage.setItem('userId',data.localId)
            }
            return dispatch({type:'LOG_IN',token:data.idToken,expiresIn:expired,userId:data.localId})
        }      
    }

const cleanTimeout = ()=>{
    if(timer){
        clearTimeout(timer)
    }
}

export const logOut = ()=>{
    cleanTimeout()
    return async dispatch=>{
        try {
            await AsyncStorage.removeItem('token')
            await AsyncStorage.removeItem('expire')
            await AsyncStorage.removeItem('userId')
            return dispatch({type:'LOG_OUT'})
          } catch(e) {
            throw e
          }
    }
}


export const setLogOutTimer =(expirationTime)=>{
    return async dispatch=>{
        timer =setTimeout(()=>{
          dispatch(logOut())
        },expirationTime)
    }
}


export const getToken =()=>{
    return async dispatch=>{
        try {
            const value = await AsyncStorage.getItem('token')
            const expire =await AsyncStorage.getItem('expire')
            const userId = await AsyncStorage.getItem('userId')
            if(value !== null) {
                dispatch({type:'GET_TOKEN',token:value,expire:expire,userId:userId})
            }
          } catch(e) {
            throw e
          }
         
    }
}