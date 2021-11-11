import { Link } from "react-router-dom"
import {
  Typography,
  TextField,
  Button,
  createTheme,
  ThemeProvider,
  Stack,
} from "@mui/material"
import "./LogIn.css"
import { USER_SERVER } from "../../config"
import axios from "axios"
import GoogleLogin from "react-google-login"
import FacebookLogin from "react-facebook-login"
import { React, useState, useContext } from "react"
import { useHistory } from "react-router"
import { AuthContext } from "../../Context/AuthContext"
import { socialLogIn, loginCall } from "../../apiCalls"

const theme = createTheme({
  palette: {
    facebook: {
      main: "var(--darkblue)",
    },
    google: {
      main: "var(--light)",
    },
    twitter: {
      main: "var(--sblue)",
    },
    ASKGAMBLERS: {
      main: "var(--sred)",
    },
    button_color: {
      main: "var(--ored)",
    },
  },
})

function Login({ user }) {
  const { isFetching, dispatch } = useContext(AuthContext)
  const [social, setSocial] = useState()
  const [field, setField] = useState({})
  const history = useHistory()

  const responseGoogle = async (response) => {
    const res = await axios.post(
      `${USER_SERVER}/auth?access_token=${response?.accessToken}&authProvider=google`
    )
    setSocial(res)

    console.log(response?.accessToken)
    handleSocial()
  }
  const responseFacebook = async (response) => {
    const res = await axios.post(
      `${USER_SERVER}/auth?access_token=${response?.accessToken}&authProvider=facebook`
    )
    setSocial(res)
    console.log(social, "social")
    console.log(response?.accessToken)
    handleSocial()
  }

  const handleSocial = async (e) => {
    socialLogIn(social, dispatch)
    if (!isFetching) {
      history.push("/")
    } else {
      alert("error")
    }
  }
  const handleSubmit = async (e) => {
    console.log(field)
    loginCall(
      {
        username: field.username,
        password: field.password,
        email: field.email,
      },
      dispatch
    )
    if (!isFetching) {
      history.push("/")
    } else {
      alert("error")
    }
  }
  const handleOnChange = (e) => {
    const name = e.target.name
    setField((prev) => ({
      ...prev,
      [name]: e.target.value,
    }))
  }

  return (
    <div className="signupContainer">
      <div className="signupWrapper">
        <div className="header__wrapper">
          <div className="heading_login">
            <h2 className="header__title">
              <div className="quiz__icon">
                <img
                  style={{ maxWidth: "50px" }}
                  src="https://s3.eu-west-2.amazonaws.com/quizando-dev-images/question_images/977ce665-17c6-477d-9e24-8e919db7f468.jpeg"
                  alt=""
                />
              </div>
              <span style={{ fontFamily: "Paytone One" }}>Login</span>
            </h2>
          </div>
        </div>

        <div className="SignupInput">
          <div>
            <Typography variant="h5">
              Login with your social media account or email address
              <br />
            </Typography>
          </div>
          <div className="outbuttonContainer">
            <GoogleLogin
              clientId="898050232496-r9ar5u3iv276pkj5umqjgfr1b789apvg.apps.googleusercontent.com"
              buttonText="Login"
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="my-google-button-class"
                >
                  <i class="fa fa-google"></i>
                  Login in with Google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              cssClass="my-google-button-class"
            />
            <FacebookLogin
              appId="418496103198279"
              autoLoad={true}
              callback={responseFacebook}
              // onClick={componentClicked}
              // render={(renderProps) => (
              //   <button onClick={renderProps.onClick}>
              //     This is my custom FB button
              //   </button>
              // )}
              cssClass="my-facebook-button-class"
              icon="fa-facebook"
            />
            {/* <Button
                  className="signupButton facebook"
                  color="facebook"
                  fullWidth
                  variant="contained"
                >
                  <i class="fa fa-facebook-f"></i>
                  <h5 className="h5__title">Sign in with Facebook</h5>
                </Button>
                <Button
                  className="signupButton "
                  fullWidth
                  color="google"
                  variant="contained"
                >
                  <i className="fa fa-google"></i>{" "}
                  <h5 className="h5__title">Sign in with Google</h5>
                </Button>
                <Button
                  className="signupButton facebook"
                  fullWidth
                  color="twitter"
                  variant="contained"
                >
                  <i className="fa fa-twitter"></i>{" "}
                  <h5 className="h5__title">Sign in with Twitter</h5>
                </Button>
                <Button
                  className="signupButton facebook"
                  fullWidth
                  color="ASKGAMBLERS"
                  variant="contained"
                >
                  <Typography variant="h5">Sign in with ASKGAMBLERS</Typography>
                </Button> */}
          </div>
          <div style={{ width: "100%" }}>
            <Stack direction="column" spacing={2}>
              {[
                {
                  displayName: " Username",
                  Name: "username",
                },
                {
                  displayName: "Password",
                  Name: "password",
                },
              ].map((item, val) => {
                return (
                  <TextField
                    id="outlined-basic"
                    label={item.displayName}
                    fullWidth
                    name={item.Name}
                    onChange={handleOnChange}
                    variant="outlined"
                    key={val}
                  />
                )
              })}
            </Stack>
          </div>
          <p style={{ margin: "1em 0 0 0", fontSize: "1.6em" }}>
            New ? Click here to{" "}
            <span style={{ color: "var(--cyan)" }}>
              <Link className="anchor" to="/signup">
                Sign up.
              </Link>
            </span>
          </p>
          <ThemeProvider theme={theme}>
            <Button
              className="signin__button"
              fullWidth
              variant="contained"
              color="button_color"
              onClick={handleSubmit}
            >
              Login
            </Button>
          </ThemeProvider>

          <Typography>
            By signing in, you agree to Website's <span>Privacy Policy</span> &{" "}
            <span>Terms & Conditions.</span>
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default Login
