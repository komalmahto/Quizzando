import React, { useState, useContext } from "react"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import { Link } from "react-router-dom"
import { useHistory } from "react-router"
import { AuthContext } from "../../Context/AuthContext"
import "./Navbar.css"
import { makeStyles } from "@material-ui/core/styles"
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"
import NotificationsIcon from "@mui/icons-material/Notifications"
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined"
import Badge from "@mui/material/Badge"
const useStyles = makeStyles((theme) => ({
  badge: {},
}))
export default function Navbar() {
  const classes = useStyles()
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
                  <h5 onClick={hide}>Login | </h5>
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

          {/* <div className="signup">
            <select className="dropdown">
              <option>EUR</option>
              <option>USD</option>
              <option>GBP</option>
            </select>
            <Link to="/profile">
              <AccountCircleIcon className="signup__icon" />
            </Link>
          </div> */}

          {user ? (
            <div class="header-user-in">
              <div class="header-flex">
                <div class="profile">
                  <img alt="" src="	https://www.quizando.com/assets/login.png" />
                  <Link className="profile__right__link" to="/myaccount">
                    {" "}
                    komalmahto2k19mc058
                  </Link>
                  <Link className="profile__right__link" to="/myaccount">
                    | My Account
                  </Link>
                  <Link className="profile__right__link" onClick={handleLogOut}>
                    | Log Out
                  </Link>
                  <Badge
                    badgeContent={1}
                    color="error"
                    classes={{ badge: classes.badge }}
                  >
                    <NotificationsIcon
                      style={{ color: "var(--yellow)", fontSize: "25px" }}
                      color="action"
                      fontSize="large"
                    />
                  </Badge>
                </div>
                <div class="balance player-balance">
                  <div class="text">
                    <MonetizationOnIcon
                      style={{
                        color: "var(--yellow",
                      }}
                    />
                    <span
                      style={{
                        color: "white",
                      }}
                    >
                      0
                    </span>
                    <AccountBalanceWalletOutlinedIcon
                      fontSize="large"
                      style={{ color: "var(--light)" }}
                    />

                    <span
                      style={{
                        color: "white",
                      }}
                    >
                      €0{" "}
                    </span>
                    <select
                      style={{
                        background: "transparent",
                        color: "var(--light)",
                        border: "none",
                      }}
                      class="currency-select ng-untouched ng-pristine ng-valid"
                    >
                      <option value="EUR">EUR</option>
                      <option value="USD">USD</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                  <button
                    class="btn btn-pink"
                    routerlink="/buy-tokens"
                    tabindex="0"
                    style={{
                      color: "white",
                      backgroundColor: "var(--red)",
                      margin: "2px",
                      fontSize: "1.4em",
                      fontfamily: "Titillium Web",
                    }}
                  >
                    Buy Tokens
                  </button>
                </div>
              </div>
              <div class="d-flex d-lg-none" id="mobile-user-in">
                <select class="currency-select --in ng-untouched ng-pristine ng-valid">
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                  <option value="GBP">GBP</option>
                </select>
                <a
                  class="profile mobile-in-item"
                  routerlink="/myaccount"
                  href="/myaccount"
                >
                  <img src="../../assets/login.png" />{" "}
                  <p>komalmahto2k19mc058</p>
                </a>
                <a class="mobile-in-item">
                  <img src="/assets/token-icon.png" /> <p>0</p>
                </a>
                <a class="mobile-in-item">
                  <img class="--white" src="/assets/wallet-icon.png" />{" "}
                  <p>€0 </p>
                </a>
                <a class="mobile-in-item --bell">
                  <span
                    class="bell"
                    routerlink="/myaccount/notifications"
                    tabindex="0"
                  >
                    <span class="bell-icon"></span>
                    <span class="bell-count">0</span>
                  </span>
                </a>
              </div>
            </div>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  style={{ textDecoration: `none`, color: "white" }}
                >
                  <h6 style={{ fontSize: "14px" }} onClick={hide}>
                    Login |{" "}
                  </h6>
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  to="/signup"
                  style={{ textDecoration: `none`, color: "white" }}
                >
                  <h6 style={{ fontSize: "14px" }} onClick={hide}>
                    Sign Up
                  </h6>
                </Link>
              </li>
            </>
          )}
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
