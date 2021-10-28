import React, { useEffect } from "react"
import "./registerQuiz.css"
import { USER_SERVER } from "../config"
import { Button } from "@mui/material"
import { useParams, useHistory } from "react-router-dom"
import axios from "axios"
import ClearRoundedIcon from "@mui/icons-material/ClearRounded"
import WarningRoundedIcon from "@mui/icons-material/WarningRounded"
import { Link } from "react-router-dom"
function RegisterQuiz() {
  let { quizId } = useParams()
  let history = useHistory()

  const goToPreviousPath = () => {
    history.goBack()
  }
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.post(
        `${USER_SERVER}/quiz/register?apiKey=93183bfbec25fe370ee6d69163ca9f1b5c1d57ed1352261007c35c63d32a8e43&quizId=${quizId}`
      )
      console.log(res.data)
    }
    fetch()
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
