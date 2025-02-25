export function storeReducer(state, action) {
  switch (action.type) {
    case 'SET_USER_ID':
      return {
        ...state,
        user: { ...state.user, user_id: action.payload.user_id },
      };
    case 'SET_AUTH':
      return {
        ...state,
        user: {
          ...state.user,
          isAuthenticated: action.payload.isAuthenticated,
        },
      };
      
    case 'SET_CONTACTS':
      return {
        ...state,
        contacts: action.payload
      } 
      
      case 'SET_CONTACT':
        return {
          ...state,
          contact: action.payload
        } 

    default:
      return state;
  }
}