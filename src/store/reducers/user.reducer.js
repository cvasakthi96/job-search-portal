import * as types from "../../constants/action-types.constant";

const initialState = {
  user: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_USER:
      return {
        ...state,
        user: action.payload
      };
    case types.REMOVE_USER:
      return {
        ...state,
        user: ""
      };

    default:
      return state;
  }
}
