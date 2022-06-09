import { Order } from "../../models/order"
import moment from "moment"

const initialState={
    orders:[]
}


const OrderReducer = (state = initialState,action)=>{
 switch(action.type){
     case('ORDER'):
     const newDate = moment(action.date).format('MMMM Do YYYY, LT')
     console.log(newDate)
     const newOrders = state.orders.concat({totalAmount:action.totalAmount,items:action.items,id:action.id,date:newDate})
     return{orders:newOrders}
     case('FETCH'):
     const orders = action.products
     return{orders:orders}
 }
 
 return state
}


export default OrderReducer