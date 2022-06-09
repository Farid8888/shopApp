export const SET_PRODUCTS ='SET_PRODUCTS'
export const UPDATE_PRODUCT = "UPDATE_PRODUCT"
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
import Product from "../../models/product"

export const setProducts = ()=>{
return async dispatch =>{
    try{
        const response =await fetch(`https://posts-a5fe8-default-rtdb.firebaseio.com/products.json`)
    const data = await response.json()
   console.log(data,'repdata')
    if(!response.ok){
        throw new Error('Something went wrong')
    }
    let loadedProducts = []
    for(let key in data){
        const products = new Product(
               key,
             data[key].ownerId,
             data[key].title,
             data[key].imageUrl,
             data[key].description,
             data[key].price
            )
        loadedProducts.push(products)
    }
   
    dispatch({type:SET_PRODUCTS,products:loadedProducts})
    }catch(error){
        throw error
    }
    
}

}


export const updateProducts =(id,title,imageUrl,description)=>{
    return async (dispatch,getState) =>{
        const tok = getState().auth.token
        let token
        if(tok){
          token = tok
        }else{
          token = getState().auth.fetchedToken
        }
        const response = await fetch(`https://posts-a5fe8-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,{
            method:'PATCH',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                title,
                imageUrl,
                description
            })
        })
        dispatch({type:UPDATE_PRODUCT,product:{
            title:title,
            imageUrl:imageUrl,
            description:description,
            id:id
        }})
    }
}

export const createProducts = (title,imageUrl,price,description)=>{
    return async (dispatch,getState)=>{
        const id = getState().auth.userId
        let token
        let userId
        if(id){
          userId =id
          token = getState().auth.token
        }else{
          userId = getState().auth.fetchedUserId
          token = getState().auth.fetchedToken
        }
       try{
        const response = await fetch (`https://posts-a5fe8-default-rtdb.firebaseio.com/products.json?auth=${token}`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
               ownerId:userId,
                title,
               imageUrl,
               description,
               price,
            })
        })
        const data = await response.json()
        console.log(data,'dataaaaaaaaaaaaaaaaaaaaa')
        const newProduct =new Product(
           data.name,
           userId,
            title,
           imageUrl,
           description,
           price,
           )

       return dispatch({type:CREATE_PRODUCT,product:newProduct})
       }catch(error){
           throw error
       }
         
    }
}

export const deleteProducts =(id)=>{
    return async (dispatch,getState)=>{
        const tok = getState().auth.token
        let token
        if(tok){
          token = tok
        }else{
          token = getState().auth.fetchedToken
        }
        const response = await fetch (`https://posts-a5fe8-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,{
            method:'DELETE'
        })

        return dispatch({type:DELETE_PRODUCT,id:id})
    }
}