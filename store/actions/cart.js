
export const addOrder =(title,price)=>{
return{type:'ADD_ORDER',title:title,price:price}
}


export const removeOrder =(title,price)=>{
    return{type:'REMOVE_ORDER',title:title,price:price}
}


export const clearOrders = ()=>{
    return {type:'CLEAR'}
}