import * as actionTypes from "../../constants/action-types.constant";

const updateUser = data => ({
  type: actionTypes.UPDATE_USER,
  payload: data
});

const userActions = {
  updateUser
};

export default userActions;
