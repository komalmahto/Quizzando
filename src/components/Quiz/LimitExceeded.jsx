import React, { useEffect } from "react"

import { Button } from "@mui/material"
import { useParams, useHistory } from "react-router-dom"
import axios from "axios"
import ClearRoundedIcon from "@mui/icons-material/ClearRounded"
import WarningRoundedIcon from "@mui/icons-material/WarningRounded"
import { Link } from "react-router-dom"
import { useContext } from "react"

function LimitExceeded() {
  let history = useHistory()
  const goToPreviousPath = () => {
    history.goBack()
  }
  return (
    <div className="blurBackground">
      <div className="registerContainer">
        <div className="registerWrapper">
          <div className="cancleRegister" onClick={goToPreviousPath}>
            <ClearRoundedIcon fontSize="large" />
          </div>
          <div className="header">Maximum Limit Exceeded</div>
          <div className="body">
            <h4>You have exceeded your maximum limit.</h4>
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

            {/* <button className="continueButtonFinal">
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
            </button> */}
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

export default LimitExceeded
