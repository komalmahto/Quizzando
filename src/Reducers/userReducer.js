import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
} from "../Actions/types";

export default function foo(state = {}, action) {
  console.log("9", action.payload);
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, register: action.payload };

    case LOGIN_USER:
      return { ...state, loginData: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case LOGOUT_USER:
      return { ...state };
    default:
      return state;
  }
}
