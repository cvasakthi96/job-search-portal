import * as actionTypes from "../../constants/action-types.constant";

const showLoaderOverlay = () => ({
  type: actionTypes.SHOW_LOADER_OVERLAY
});

const hideLoaderOverlay = () => ({
  type: actionTypes.HIDE_LOADER_OVERLAY
});

const commonActions = { showLoaderOverlay, hideLoaderOverlay };

export default commonActions;
