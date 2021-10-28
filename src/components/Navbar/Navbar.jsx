import React, { useState, useContext } from "react"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import { Link } from "react-router-dom"
import { useHistory } from "react-router"
import { AuthContext } from "../../Context/AuthContext"
import "./Navbar.css"

export default function Navbar() {
  const [flag, setFlag] = useState(false)
  const { user } = useContext(AuthContext)
  const history = useHistory()
  function show() {
    setFlag(!flag)
  }
  function hide() {
    setFlag(false)
  }
  window.addEventListener("resize", function (event) {
    if (window.innerWidth > 993) {
      setFlag(false)
    }
  })
  const handleLogOut = () => {
    localStorage.removeItem("user")
    history.push("/login")
    window.location.reload()
  }
  return (
    <div className="navbar">
      <div className="navbar__login__separate__block">
        <div className="signup" id="separate__signup">
          <select className="dropdown" id="separate__dropdown">
            <option>EUR</option>
            <option>USD</option>
            <option>GBP</option>
          </select>
          <AccountCircleIcon className="separate__icon" />
          {user ? (
            <Link
              to="/logout"
              style={{ textDecoration: `none`, color: "white" }}
            >
              <div className="no">
                <h5 onClick={handleLogOut}>Logout</h5>
              </div>
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                style={{ textDecoration: `none`, color: "white" }}
              >
                <div className="no">
                  <h5 onClick={hide}>Login</h5>
                </div>
              </Link>
              <Link
                to="/signup"
                style={{ textDecoration: `none`, color: "white" }}
              >
                <h5 onClick={hide}>Sign Up</h5>
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="mobile-menu-icon" id="#mobile-menu" onClick={show}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="navbar__block">
        <div className="navbar__logo" onClick={hide}>
          <Link to="/">
            <img
              className="logo__image"
              src="https://www.quizando.com/assets/Quizando-Logo.png"
              alt="logo"
            />
          </Link>
        </div>
        <div className="navbar__right">
          <ul className="nav__menu">
            {[
              {
                link: "/quiz/fetch/live",
                title: "Live",
              },
              {
                link: "/quiz/fetch/classic",
                title: "Classics",
              },
              {
                link: "/quiz/fetch",
                title: "Free Games",
              },
            ].map((item, idx) => {
              return (
                <li>
                  <Link className="nav__links anchor" to={item.link}>
                    {item.title}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="signup">
            <select className="dropdown">
              <option>EUR</option>
              <option>USD</option>
              <option>GBP</option>
            </select>
            <Link to="/profile">
              <AccountCircleIcon className="signup__icon" />
            </Link>
            {user ? (
              <h6 onClick={handleLogOut}>Logout</h6>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{ textDecoration: `none`, color: "white" }}
                >
                  <h6 onClick={hide}>Login</h6>
                </Link>
                <Link
                  to="/signup"
                  style={{ textDecoration: `none`, color: "white" }}
                >
                  <h6 onClick={hide}>Sign Up</h6>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div
        style={{ display: flag ? "flex" : "none" }}
        className="vertical__navbar"
        id="vertical__navbar_block"
      >
        {user ? (
          ""
        ) : (
          <>
            {" "}
            <Link
              to="/login"
              style={{ textDecoration: `none`, color: "white" }}
            >
              <div className="vertical__login" onClick={hide}>
                <img
                  alt=""
                  src="https://www.quizando.com/assets/nav_login_mobile.png"
                />
                <h2>Login</h2>
              </div>
            </Link>
            <Link
              to="/signup"
              style={{ textDecoration: `none`, color: "white" }}
            >
              <div className="vertical__createaccount" onClick={hide}>
                <img
                  alt=""
                  src="https://www.quizando.com/assets/nav_reg_small.png"
                />
                <h2>Create Account</h2>
              </div>
            </Link>
          </>
        )}

        <div className="vertical__options">
          <ul className="vertical__nav__menu">
            <li className="menu__title">
              <Link href="#" style={{ color: "white" }}>
                Quizzes
              </Link>
            </li>
            <li>
              <img
                alt=""
                className="images__icons"
                src="https://www.quizando.com/assets/live_quiz.png"
              />{" "}
              <Link href="#">Live Quizzes</Link>
            </li>
            <li>
              <img
                alt=""
                className="images__icons"
                src="https://www.quizando.com/assets/classics_quiz.png"
              />
              <Link href="#">Classic Quizzes</Link>
            </li>
            <li>
              <img
                alt=""
                className="images__icons"
                src="https://www.quizando.com/assets/notokens_quiz.png"
              />{" "}
              <Link href="#">Free Games</Link>
            </li>

            <li>
              <img
                alt=""
                src="https://www.quizando.com/assets/how_to_play.png"
              />{" "}
              <Link href="#">How to Play?</Link>
            </li>

            <li>
              <img alt="" src="https://www.quizando.com/assets/about.png" />{" "}
              <Link href="#">About</Link>
            </li>
            <li>
              <img alt="" src="https://www.quizando.com/assets/t_and_c.png" />{" "}
              <Link href="#">Terms & Conditions</Link>
            </li>
            <li>
              <img
                alt=""
                src="https://www.quizando.com/assets/contact_us.png"
              />{" "}
              <Link href="#">Contact us</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
