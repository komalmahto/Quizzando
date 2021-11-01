import { Link } from "react-router-dom"
import {
  Typography,
  TextField,
  Button,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  createTheme,
  ThemeProvider,
} from "@mui/material"
import GoogleLogin from "react-google-login"
import FacebookLogin from "react-facebook-login"
import { React, useState, useContext } from "react"
import { USER_SERVER } from "../../config"
import "./LogIn.css"
import { useHistory } from "react-router"
import axios from "axios"
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

function SignUp() {
  const { isFetching, dispatch } = useContext(AuthContext)
  const [field, setField] = useState({})
  const [social, setSocial] = useState()
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
    const response = await axios.post(`${USER_SERVER}/signup`, field)

    if (response.data.statusCode === 201) {
      loginCall(
        {
          username: field.username,
          password: field.password,
        },
        dispatch
      )
      if (!isFetching) {
        history.push("/playQuiz")
      } else {
        alert("error")
      }
    }

    //   dispatch(registerUser(field)).then((response) => {
    //     if (user.register && user.register.payload.user) {
    //       localStorage.setItem(
    //         "user",
    //         JSON.stringify(response.payload.payload.token)
    //       );
    //       console.log(user.register.payload.user);
    //     }

    //     console.log(user);
    //     if (response.payload.payload.token) {
    //       history.push("/playQuiz");
    //     } else {
    //       alert("error");
    //     }
    //   });
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
          <div className="heading_signup">
            <h2 className="header__title">
              <span style={{ fontFamily: "Paytone One" }}>
                Sign up to Quizando
              </span>
            </h2>
          </div>
        </div>

        <div className="SignupInput">
          <div>
            <Typography variant="h5">
              Already a Quizando player?{" "}
              <Link
                style={{ color: "var(--red)" }}
                className="anchor"
                to="/login"
              >
                Login
              </Link>{" "}
              to start playing!
            </Typography>
            <hr />
            <Typography variant="h5">
              Sign up to Quizando with your social media account or fill in the
              details below
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
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {[
              {
                displayName: "First Name",
                Name: "firstName",
              },
              {
                displayName: "Last Name",
                Name: "lastName",
              },
              {
                displayName: " Username",
                Name: "username",
              },
              {
                displayName: "Email",
                Name: "email",
              },
              {
                displayName: "Password",
                Name: "password",
              },
              {
                displayName: "Confirm Password",
                Name: "s",
              },
            ].map((item, val) => {
              return (
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label={item.displayName}
                    fullWidth
                    name={item.Name}
                    onChange={handleOnChange}
                    variant="outlined"
                    key={val}
                  />
                </Grid>
              )
            })}
          </Grid>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="gender"
              name="gender"
              onChange={handleOnChange}
              required
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
              <FormControlLabel
                value="nil"
                control={<Radio />}
                label="Preffer not to say"
              />
            </RadioGroup>
          </FormControl>
          <ThemeProvider theme={theme}>
            <Button
              className="signin__button"
              fullWidth
              variant="contained"
              color="button_color"
              onClick={handleSubmit}
            >
              SignUp
            </Button>
          </ThemeProvider>

          <Typography>
            By signing up, you agree to Quizando's <span>Privacy Policy</span> &{" "}
            <span>Terms & Conditions.</span>
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default SignUp
