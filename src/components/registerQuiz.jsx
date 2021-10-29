import React, { useEffect } from "react"
import "./registerQuiz.css"
import { USER_SERVER } from "../config"
import { Button } from "@mui/material"
import { useParams, useHistory } from "react-router-dom"
import axios from "axios"
import ClearRoundedIcon from "@mui/icons-material/ClearRounded"
import WarningRoundedIcon from "@mui/icons-material/WarningRounded"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"
function RegisterQuiz() {
  const { user } = useContext(AuthContext)
  console.log(user?.token)
  let { quizId } = useParams()
  let history = useHistory()

  const goToPreviousPath = () => {
    history.goBack()
  }
  useEffect(() => {
    const Fetch = async () => {
      const res = await fetch(
        `${USER_SERVER}/quiz/register?apiKey=93183bfbec25fe370ee6d69163ca9f1b5c1d57ed1352261007c35c63d32a8e43&quizId=${quizId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      const response = await res.json()
      console.log(response)
    }
    Fetch()
  }, [])

  return (
    <div className="blurBackground">
      <div className="registerContainer">
        <div className="registerWrapper">
          <div className="cancleRegister" onClick={goToPreviousPath}>
            <ClearRoundedIcon fontSize="large" />
          </div>
          <div className="header">Registration Successful</div>
          <div className="body">
            <h4>
              Thats's right, have a go on this quiz for free.It wont't cost you
              any tokens.But your score will still count on the leaderboard and
              you couldstill win a share of the cash prize!How cool is that!
            </h4>
            <br />
            <h4>
              By clicking Continueyou are aggering to the Quizando{" "}
              <a
                style={{
                  textDecoration: "none",
                }}
                href=""
              >
                Terms and Conditions
              </a>
            </h4>

            <button className="continueButtonFinal">
              <Link
                style={{
                  color: "var(--light)",
                  fontFamily: "Paytone One",
                  textDecoration: "none",
                }}
                to={`/playQuiz/classic/${quizId}`}
              >
                Continue
              </Link>
            </button>
          </div>

          <div className="registerfooter">
            <WarningRoundedIcon fontSize="medium" />
            <h4>
              <b>
                <span>WARNING!</span>{" "}
              </b>
              to ensure optimum performance of the quiz platform,{" "}
              <b>
                <span className="bold">DO NOT</span>{" "}
              </b>{" "}
              have any other window tabs or software runnung in background{" "}
            </h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterQuiz
