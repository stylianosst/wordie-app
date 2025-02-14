import createDataContext from "./createDataContext";

const keyboardReducer = (state, action) => {
  switch (action.type) {
    case "update_keyboard_data":
      return { ...state, keyboardData: state.keyboardData + action.payload };
    case "clear_keyboard_data":
      return { ...state, keyboardData: "" };
    default:
      return state;
  }
};

const clearKeyboardData = (dispatch) => () => {
  dispatch({ type: "clear_keyboard_data" });
};

const updateKeyboardData = (dispatch) => (data) => {
  dispatch({ type: "update_keyboard_data", payload: data });
};

export const { Context, Provider } = createDataContext(
  keyboardReducer,
  { clearKeyboardData, updateKeyboardData },
  { keyboardData: "" }
);
