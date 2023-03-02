const cartReducer = (state,action) => {
  if (action.type==="ADD") {
    const item = action.payload
    return {
        ...state,
        table:[...state.table,item,]
        
    }
    
  }
  return state;
}

export default cartReducer