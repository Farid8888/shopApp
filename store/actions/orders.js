import { Order } from "../../models/order";

export const orderFunction = (items, totalAmount, date) => {
  return async (dispatch,getState) => {
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
    
    const response = await fetch(
      `https://posts-a5fe8-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "apllication/json" },
        body: JSON.stringify({
          items: items,
          totalAmount: totalAmount,
          date: date,
        }),
      }
    );
    const data =await response.json()
    return dispatch({
      type: "ORDER",
      items: items,
      totalAmount: totalAmount,
      id: data.name,
      date: date,
    });
  };
};

export const fetchOrders = () => {
    return async (dispatch,getState) => {
      const id = getState().auth.userId
      let userId
      if(id){
        userId =id
      }else{
        userId = getState().auth.fetchedUserId
      }
      console.log(userId,'kkkkkkkkkkkkk')
      try{
        const response = await fetch(
          `https://posts-a5fe8-default-rtdb.firebaseio.com/orders/${userId}.json`
        );
        const loadedProducts =[]
        if(!response.ok){
          throw new Error('Smt wrong')
        }
        const data =await response.json()
        for(const key in data){
            loadedProducts.push(new Order(
              data[key].items,
              data[key].totalAmount,
              key,
              data[key].date
            ))
        }
        return dispatch({
          type: "FETCH",
          products:loadedProducts
        });
      }catch(error){
        throw new Error('Something went wrong')
      }

    };
  };
