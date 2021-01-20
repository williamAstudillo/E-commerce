import authTypes from '../actions/authTypes';

const INITIAL_STATE = {
  user: ''
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case authTypes.LOG_IN:
      return {
        ...state,
        user: action.payload,
      };
    case authTypes.LOG_IN_GOOGLE:
      return {
        ...state,
        user: action.payload,
      };
    case authTypes.LOG_OUT:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
