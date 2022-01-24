import * as types from "../../constants/action-types.constant";

const initialState = {
  showLoaderOverlay: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.SHOW_LOADER_OVERLAY:
      return {
        ...state,
        showLoaderOverlay: true
      };
    case types.HIDE_LOADER_OVERLAY:
      return {
        ...state,
        showLoaderOverlay: false
      };
    default:
      return state;
  }
}
