import { LocationSearchingOutlined } from "@material-ui/icons"
import axios from "axios"
import { USER_SERVER } from "./config"
export const socialLogIn = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" })
  console.log(userCredential?.data.payload)
  try {
    dispatch({ type: "LOGIN_SUCCESS", payload: userCredential.data.payload })
  } catch (err) {
    console.log(err)
  }
}
export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" })
  console.log(userCredential)
  try {
    const res = await axios.post(`${USER_SERVER}/login`, userCredential)
    console.log(res.data.payload)
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data.payload })
  } catch (error) {
    alert("Login credentials doesn't match")
    dispatch({ type: "LOGIN_FAILURE", payload: error })
    console.log(error)
  }
}
